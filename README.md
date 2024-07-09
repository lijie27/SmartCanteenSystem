The Smart Canteen System is an innovative web and mobile application designed to streamline canteen operations and enhance the customer experience. 

Built with TypeScript, HTML, SCSS, JavaScript, the Ionic framework for cross-platform mobile app development, and Firebase for database management.

**For Stall Owners:**        
  • **CRUD Menu:** Easily create, read, update, and delete menu items.    
  • **Sales Analysis:** Access detailed sales analytics to make informed business decisions.         
  • **Order Management:** Receive and manage orders efficiently.  
  • **Report Generation:** Generate comprehensive reports to track performance.

**For Customers:**     
  • **View Menus:** Browse menus from all stalls in one place.
  • **Order Food:** Browse and order food from various categories with ease.      
  • **Customize Orders:** Personalize orders to suit individual preferences.     
  • **Chat with Stalls:** Communicate directly with stall owners for any queries or special requests.      

--------------------------------------------------------------------------------------------------------
##How to setup Smart Canteen System

###System requirements
 `npm` version from 5.7.1 , `node` from 8.10.0 , `ionic` version from 3.12.0.
 
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
Make sure that Android SDK is installed first.
Run this command to build .apk file
```
ionic cordova build android
```
Or run it in your device with:
```
ionic cordova run android
```
