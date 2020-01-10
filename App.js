import React, { Component } from 'react';
import { View } from "react-native"
import OneSignal from 'react-native-onesignal';
import NotificationPopup from 'react-native-push-notification-popup';

export default class App extends Component {

  constructor(properties) {
    super(properties);
    OneSignal.init("82e9d42d-1281-42e2-95e8-a1fad8067f12");

    OneSignal.addEventListener('received', this.onReceived.bind(this));
    OneSignal.addEventListener('opened', this.onOpened.bind(this));
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
    this.popup.show({
      onPress: function () { console.log('Pressed') },
      appIconSource: require('./assests/icon.png'),
      appTitle: 'RN Notifications',
      timeText: 'Now',
      title: 'Hello World',
      body: 'This is a sample message.\ nTesting emoji 😀',
      slideOutTime: 5000
    });
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  render() {
    return (
      <View>
        <NotificationPopup ref={ref => this.popup = ref} />
      </View>
    )
  }
}