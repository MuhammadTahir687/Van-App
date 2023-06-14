/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import OneSignal from 'react-native-onesignal';
import { ONESIGNAL_APP_ID } from "@env"
import { PermissionsAndroid, Platform } from 'react-native';
import { PERMISSIONS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
const RequestLocationPermission = async () => {
    try {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Geolocation Permission',
                    message: 'Can we access your location?',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            console.log('Permission', granted);
            if (granted === 'granted') {
                console.log('You can use Geolocation');
                return true;
            } else {
                console.log('You cannot use Geolocation');
                return false;
            }
        }
        else {
            Geolocation.requestAuthorization("whenInUse");

        }
    }

    catch (err) {
        return false;
    }
};
RequestLocationPermission()
PERMISSIONS.ANDROID.CAMERA;

// REMOTE NOTIFICATIONS SETUP START //
OneSignal.setLogLevel(6, 0);
OneSignal.setAppId(ONESIGNAL_APP_ID);
//Prompt for push on iOS
OneSignal.promptForPushNotificationsWithUserResponse((response) => {
    console.log("Prompt response #334: ", response);
})
//Method for handling notifications recieved while app in foreground
OneSignal.setNotificationWillShowInForegroundHandler((notificationReceivedEvent) => {
    console.log("One Signal: notiication will show in foreground: ", notificationReceivedEvent);
    let notification = notificationReceivedEvent.getNotification();
    console.log("notification: ", notification);
    const data = notification.additionalData
    console.log("additionalData: ", data);
    //Complete with null means don't show a notification
    notificationReceivedEvent.complete(notification);
});
//Method for handling notifications opened
OneSignal.setNotificationOpenedHandler((notification) => {
    console.log("OneSignal: notification opened: ", notification);
})
// REMOTE NOTIFICATIONS SETUP END //

AppRegistry.registerComponent(appName, () => App);
