import * as Expo from "expo";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import React, { Component } from "react";
import { StyleProvider,Root } from "native-base";

import getTheme from "./theme/components";
import variables from "./theme/variables/commonColor";

import MainRoute from './app/mainRoute.js';

import { Provider } from 'react-redux';

import { createStore } from './app/store'

import NavigationService from './app/helpers/navigationHelper';

import { Notifications } from 'expo';

import * as Permissions from 'expo-permissions';

import Constants from 'expo-constants';

const store = createStore()

export default class SetupScreen extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }
  componentWillMount() {
    this.loadFonts();
    this.registerForPushNotificationsAsync();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = (notification) => {
    this.setState({NotificationData: notification});
  };

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
          Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
            Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  };

  async loadFonts() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require('native-base/Fonts/Ionicons.ttf'),
      Entypo: require("native-base/Fonts/Entypo.ttf"),
      Feather: require("native-base/Fonts/Feather.ttf"),
      FontAwesome: require("native-base/Fonts/FontAwesome.ttf"),
      Octicons: require("native-base/Fonts/Octicons.ttf"),
    });
    await Font.loadAsync({})
    this.setState({ isReady: true });
  }
  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
        <StyleProvider style={getTheme(variables)}>
          <Root>
            <Provider store={ store }>
              <MainRoute ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}/>
            </Provider>
          </Root>
        </StyleProvider>
    );
  }
}