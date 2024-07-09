The Smart Canteen System is an innovative web and mobile application designed to streamline canteen operations and enhance the customer experience. 
Built with TypeScript, HTML, SCSS, JavaScript, Ionic and Firebase, the system offers a comprehensive suite of features for both stall owners and customers.

**For Stall Owners:**
**CRUD Menu:** Easily create, read, update, and delete menu items.
**Sales Analysis: **Access detailed sales analytics to make informed business decisions.
**Order Management: **Receive and manage orders efficiently.
**Report Generation:** Generate comprehensive reports to track performance.

**For Customers:**
**Order Food:** Browse and order food from various categories with ease.
**Customize Orders:** Personalize orders to suit individual preferences.
**Chat with Stalls:** Communicate directly with stall owners for any queries or special requests.

--------------------------------------------------------------------------------------------------------
##How to setup Smart Canteen System

###System requirements
 `npm` version from 5.7.1 , `node` from 8.10.0` , ionic` version from 3.12.0.
 
Update your ionic by run these comands:
```
npm uninstall -g ionic
npm install -g ionic
```

###Setting up the apps
Please follow these step

1. Download .zip file and unzip.
2. Go to customer folder  
3. Run ```npm install``` to install libraries
4. Run ```ionic serve```, your browser will automatically open the customer app
5. Go to admin folder  
6. Run ```npm install``` to install libraries
7. Run ```ionic serve```, your browser will automatically open the admin app

If you want to run both of these apps at the same time, please specific the port like this:
```ionic serve --port=9000```

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

###References

 - [Ionic 2 documentation](https://ionicframework.com/docs/v2/)
 - [Angular 2 guide](https://angular.io/docs/ts/latest/guide/)
 - [Nodejs instructions](https://docs.npmjs.com/getting-started/installing-node#updating-npm)
 - [Firebase docs](https://firebase.google.com/docs/web/setup)
