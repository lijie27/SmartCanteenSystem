/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for t`he specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const functions = require('firebase-functions');
const mkdirp = require('mkdirp-promise');
// Include a Service Account Key to use a Signed URL
const gcs = require('@google-cloud/storage')({keyFilename: 'service-account-credentials.json'});
const admin = require('firebase-admin');
admin.initializeApp();
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');

// Thumbnail size
const THUMB_MAX_HEIGHT = 256; // Max height and width of the thumbnail in pixels.
const THUMB_MAX_WIDTH = 512;
const THUMB_PREFIX = 'thumb_'; // Thumbnail prefix added to file names.

// Order status
const STATUS_PENDING = 'pending';
const STATUS_COMPLETE = 'complete';

/**
 * When an image is uploaded in the Storage bucket We generate a thumbnail automatically using
 * ImageMagick.
 * After the thumbnail has been generated and uploaded to Cloud Storage,
 * we write the public URL to the Firebase Realtime Database.
 */
exports.generateThumbnail = functions.storage.object().onFinalize((object, context) => {
  // File and directory paths.
  const filePath = object.name;
  const contentType = object.contentType; // This is the image Mimme type
  const fileDir = path.dirname(filePath);
  const fileName = path.basename(filePath);
  const thumbFilePath = path.normalize(path.join(fileDir, `${THUMB_PREFIX}${fileName}`));
  const tempLocalFile = path.join(os.tmpdir(), filePath);
  const tempLocalDir = path.dirname(tempLocalFile);
  const tempLocalThumbFile = path.join(os.tmpdir(), thumbFilePath);

  // Exit if this is triggered on a file that is not an image.
  if (!contentType.startsWith('image/')) {
    console.log('This is not an image.');
    return null;
  }

  // Exit if the image is already a thumbnail.
  if (fileName.startsWith(THUMB_PREFIX)) {
    console.log('Already a Thumbnail.');
    return null;
  }

  // Cloud Storage files.
  const bucket = gcs.bucket(object.bucket);
  const file = bucket.file(filePath);
  const thumbFile = bucket.file(thumbFilePath);
  const metadata = {contentType: contentType};

  // Create the temp directory where the storage file will be downloaded.
  return mkdirp(tempLocalDir).then(() => {
    // Download file from bucket.
    return file.download({destination: tempLocalFile});
  }).then(() => {
    console.log('The file has been downloaded to', tempLocalFile);
    // Generate a thumbnail using ImageMagick.
    return spawn('convert', [
        tempLocalFile,
        '-thumbnail',
        `${THUMB_MAX_WIDTH}x${THUMB_MAX_HEIGHT}^`,
        '-gravity',
        'center',
        '-crop',
        `${THUMB_MAX_WIDTH}x${THUMB_MAX_HEIGHT}+0+0`,
        tempLocalThumbFile
      ], {capture: ['stdout', 'stderr']}
    );

  }).then(() => {
    console.log('Thumbnail created at', tempLocalThumbFile);
    // Uploading the Thumbnail.
    return bucket.upload(tempLocalThumbFile, {destination: thumbFilePath, metadata: metadata});
  }).then(() => {
    console.log('Thumbnail uploaded to Storage at', thumbFilePath);
    // Once the image has been uploaded delete the local files to free up disk space.
    fs.unlinkSync(tempLocalFile);
    fs.unlinkSync(tempLocalThumbFile);
    // Get the Signed URLs for the thumbnail and original image.
    const config = {
      action: 'read',
      expires: '03-01-2500'
    };
    return Promise.all([
      thumbFile.getSignedUrl(config),
      file.getSignedUrl(config)
    ]);
  }).then(results => {
    console.log('Got Signed URLs.');
    const thumbResult = results[0];
    const originalResult = results[1];
    const thumbFileUrl = thumbResult[0];
    const fileUrl = originalResult[0];
    // Add the URLs to the Database
    return admin.database().ref('images').push({path: fileUrl, thumbnail: thumbFileUrl});
  }).then(() => console.log('Thumbnail URLs saved to database.'));
});

// listen for new order created then calculate order value
exports.calOrder = functions.firestore.document('orders/{orderId}').onCreate(function (snap, context) {
  // Grab the current value of what was written to the Realtime Database
  const original = snap.data();

  // log record detail
  console.log('Received order', context.params.orderId);
  console.log('Order data', original);

  // set status to pending
  snap.ref.set({status: STATUS_PENDING}, {merge: true});

  // set order number
  var orderSettingDocRef = admin.firestore().collection('settings').doc('order');
  orderSettingDocRef.get().then(doc => {
    let val = 2018000001;
    if (doc.exists) {
      val = doc.data().orderNumber + 1;
      orderSettingDocRef.update({orderNumber: val});
    } else {
      orderSettingDocRef.set({orderNumber: val});
    }
    snap.ref.set({orderNumber: val}, {merge: true});
  });

  // set createdAt & updatedAt
  snap.ref.set({
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }, {merge: true});

  // calculate order data
  let total = 0;
  let itemDocRef;
  let soldCount = 0;

  original.items.map(item => {
    total += item.subTotal;

    // update item report
    itemDocRef = admin.firestore().collection('items').doc(item.id);
    itemDocRef.get().then(function (snapshot) {
      if (snapshot.exists) {
        soldCount = snapshot.data().soldCount ? snapshot.data().soldCount + item.quantity : item.quantity;
        itemDocRef.update({soldCount: soldCount});
      }
    });
  });

  // send notifications to store
  admin.firestore().collection('notifications').doc(original.store.id).collection('orders').add({
    orderId: context.params.orderId
  });

  // write total to firebase
  // should convert total to float
  return snap.ref.set({total: total.toFixed(2) / 1}, {merge: true});
});

// listen to order update
exports.calReport = functions.firestore.document('orders/{orderId}').onUpdate(function (change, context) {
  // Grab the current value of what was written to the Realtime Database
  const newValue = change.after.data();
  // Grab previous value for comparison
  const previousValue = change.before.data();
  // order total value
  const orderTotal = parseFloat(newValue.total);
  const date = new Date();

  console.log('status', newValue.status, previousValue.status);

  // send notification if order's status has changed
  if (newValue.status !== previousValue.status) {

    // notify to user if order has changed status
    if (previousValue.status) {
      admin.firestore().collection('notifications').doc(newValue.userId).collection('orders').add({
        orderId: context.params.orderId
      });
    }

    // build report data
    const reportDocRef = admin.firestore().collection('reports').doc(newValue.store.id);
    var reportData;

    reportDocRef.get().then(function (doc) {
      // set initial data
      if (doc.exists) {
        reportData = doc.data();

        if (reportData.order) {
          if (reportData.order[newValue.status]) {
            reportData.order[newValue.status]++;
          } else {
            reportData.order[newValue.status] = 1;
          }

          if (reportData.order[previousValue.status] && (reportData.order[previousValue.status] > 1)) {
            reportData.order[previousValue.status]--;
          } else {
            reportData.order[previousValue.status] = 0;
          }
        } else {
          reportData.order = {};
          reportData.order[newValue.status] = 1;
        }
      } else {
        reportData = {order: {}, sale: {}};
        reportData.order[newValue.status] = 1;
      }

      if (newValue.status == STATUS_COMPLETE) {
        if (reportData.sale.total) {
          reportData.sale.total += orderTotal;
        } else {
          reportData.sale.total = orderTotal;
        }

        const year = date.getFullYear();
        if (reportData.sale[year]) {
          reportData.sale[year].total += orderTotal;
        } else {
          reportData.sale[year] = {
            total: orderTotal
          };
        }

        const month = date.getMonth() + 1;
        if (reportData.sale[year][month]) {
          reportData.sale[year][month].total += orderTotal;
        } else {
          reportData.sale[year][month] = {
            total: orderTotal
          };
        }

        const today = date.getDate();
        if (reportData.sale[year][month][today]) {
          reportData.sale[year][month][today].total += orderTotal;
        } else {
          reportData.sale[year][month][today] = {
            total: orderTotal
          };
        }
      }

      console.log('report', reportData);
      return reportDocRef.set(reportData);
    });
  }
});

// listen to item created
exports.itemOnCreate = functions.firestore.document('items/{itemId}').onCreate(function (snap, context) {
  // Grab the current value of what was written to the Realtime Database
  const original = snap.data();
  console.log('item created: ', original);

  updateCatItemCount(original.categoryId);
  return updateItemCount(original.storeId);
});

// listen to item deleted
exports.itemOnDelete = functions.firestore.document('items/{itemId}').onDelete(function (snap, context) {
  // Grab the previous value of what was written to the Realtime Database
  const original = snap.data();

  updateCatItemCount(original.categoryId);
  return updateItemCount(original.storeId);
});

// listen for item review then update item & store rating
exports.calRate = functions.firestore.document('items/{itemId}/reviews/{reviewId}').onCreate(function (snap, context) {
  // Grab the current value of what was written to the Realtime Database
  const original = snap.data();
  var itemDocRef = admin.firestore().collection('items').doc(context.params.itemId);

  // calculate avg rating for item
  itemDocRef.get().then(function (doc) {
    var item = doc.data();
    var storeDocRef = admin.firestore().collection('stores').doc(item.storeId);

    if (item.rateCount) {
      item.rating = (item.rating * item.rateCount + original.rating) / (item.rateCount + 1);
      item.rateCount++;
    } else { // on first time
      item.rating = original.rating;
      item.rateCount = 1;
    }

    itemDocRef.update({
      rating: item.rating.toFixed(2),
      rateCount: item.rateCount
    });

    storeDocRef.get().then(function (storeDoc) {
      var store = storeDoc.data();

      if (store.rateCount) {
        store.rating = (store.rating * store.rateCount + original.rating) / (store.rateCount + 1);
        store.rateCount++;
      } else { // on first time
        store.rating = original.rating;
        store.rateCount = 1;
      }

      storeDocRef.update({
        rating: store.rating.toFixed(2),
        rateCount: store.rateCount
      });
    });
  });

  return true;
});

// update store's itemCount
var updateItemCount = function (storeId) {
  var itemCount = 0;
  var storeDocRef = admin.firestore().collection('stores').doc(storeId);

  return admin.firestore().collection('items').where('storeId', '==', storeId).get().then(function (docs) {
    itemCount = docs.size;
    return storeDocRef.update({itemCount: itemCount});
  });
};

// update category item count
var updateCatItemCount = function (catId) {
  var itemCount = 0;
  var storeDocRef = admin.firestore().collection('categories').doc(catId);

  return admin.firestore().collection('items').where('categoryId', '==', catId).get().then(function (docs) {
    itemCount = docs.size;
    return storeDocRef.update({itemCount: itemCount});
  });
};
