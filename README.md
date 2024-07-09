##How to setup Firebase food order app


###System requirements
 `npm` version from 5.7.1 and `node` from 8.10.0
Run these command to check your version:
```
npm -v
node -v
```
The easiest way to update is to install the [latest version of Node.js](https://nodejs.org/en/).
You can also update `npm` by following [these instructions](https://docs.npmjs.com/getting-started/installing-node#updating-npm). 


`ionic` version from 3.12.0. Run this command to check your version:
```
ionic -v
```
Update your ionic by run these comands:
```
npm uninstall -g ionic
npm install -g ionic
```


###Setting up the apps
Please follow these step

1. Download .zip file from Gumroad or Sellfy and unzip.

2. Go to customer folder  

3. Run ```npm install``` to install libraries

4. Run ```ionic serve```, your browser will automatically open the customer app

5. Go to admin folder  

6. Run ```npm install``` to install libraries

7. Run ```ionic serve```, your browser will automatically open the admin app

If you want to run both of these apps at the same time, please specific the port like this:
```ionic serve --port=9000```

###Demo account
You should use register screen on both admin and customer app

###Social login setup
1. Go to Firebase authentication methods https://console.firebase.google.com/project/your-project/authentication/providers
2. Enable Social provider. Eg: Facebook, Google
3. Enter App key and App secret and save
4. Now you can login with social accounts

###Changing the style
Color `variables` are defined at line 25 of `src/theme/variables.scss`

You can modify this file to change app's color. 

Common styles are defined at `src/app/app.scss`. Modify this file to change common style of the app.

To change each page's style. Please write your style into `src/pages/{page_name}/{page_name}.scss`

### Config Firestore DB 
To use your own Firestore DB, change Firebase config on src/app.module.ts

```
export const firebaseConfig = {
  apiKey: "AIzaSyArG0ImxDKqivsiOnnCWEDA-Q7kvQBpFj8",
  authDomain: "ionic-restaurant.firebaseapp.com",
  databaseURL: "https://ionic-restaurant.firebaseio.com",
  projectId: "ionic-restaurant",
  storageBucket: "ionic-restaurant.appspot.com",
  messagingSenderId: "341080880076"
};
```
### Setup firebase index

> Cloud Firestore requires an index for every query, to ensure the best performance. All document fields are automatically indexed, so queries that only use equality clauses don't need additional indexes. If you attempt a compound query with a range clause that doesn't map to an existing index, you receive an error. The error message includes a direct link to create the missing index in the Firebase console.
1. Go to database page on Firebase dashboard
![enter image description here](https://i.imgur.com/CSUabvt.png)

2. Choose cloud Firestore
![enter image description here](https://i.imgur.com/BCRwpv9.png)

3. On the Indexs tab, add these indexs
![enter image description here](https://i.imgur.com/ov6ltC5.png)

For more details: [enter link description here](https://firebase.google.com/docs/firestore/query-data/indexing)

### Setup firebase functions
[Cloud Functions](https://firebase.google.com/docs/functions/) for Firebase lets you automatically run backend code in response to events triggered by Firebase features and HTTPS requests. Your code is stored in Google’s cloud and runs in a managed environment. There's no need to manage and scale your own servers.
Go to tool/functions directory and run
```
npm install
```

Change DB name in tools/.firebaserc

```
{
  "projects": {
    "default": "your-db-name"
  }
}

```

Login to your firebase

```
firebase login
```

Deploy your changes
```
firebase deploy --only functions
```

###Adding a new page

To create a page you can use the following command:
```
# ionic g page <PageName>
ionic g page myPage

√ Create app/pages/my-page/my-page.html
√ Create app/pages/my-page/my-page.ts
√ Create app/pages/my-page/my-page.scss
```
Read more about ionic generate [here](https://ionicframework.com/docs/v2/cli/generate/).

### Build APK file
Make sure that you installed Android SDK first.
Run this command to build .apk file
```
ionic cordova build android
```
Or run it in your device with:
```
ionic cordova run android
```


###About me
My name is Dao Duy Thanh. I'm a full stack developer (PHP + frontend).

View my apps at: [http://market.ionic.io/user/231798](http://market.ionic.io/user/231798)

View my Youtube channel at: [https://www.youtube.com/channel/UCgqx9-AWwoj5Z3i6U3slQ_w](https://www.youtube.com/channel/UCgqx9-AWwoj5Z3i6U3slQ_w)

Contact me by email: **successdt@hotmail.com**

###References

 - [Ionic 2 documentation](https://ionicframework.com/docs/v2/)
 - [Angular 2 guide](https://angular.io/docs/ts/latest/guide/)
 - [Nodejs instructions](https://docs.npmjs.com/getting-started/installing-node#updating-npm)
 - [Firebase docs](https://firebase.google.com/docs/web/setup)