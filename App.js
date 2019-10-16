import * as Expo from "expo";
import * as Font from 'expo-font';
import React, { Component } from "react";
import {Dimensions, ImageBackground} from "react-native";

import { StyleProvider,Root,Platform } from "native-base";

import getTheme from "./native-base-theme/components";
import variables from "./native-base-theme/variables/commonColor";
import platform from "./native-base-theme/variables/platform";
import MainRoute from './app/mainRoute.js';

import { Provider } from 'react-redux';

import { createStore } from './app/store'

//Custom components
import AppLoading from './app/components/AppLoading';
import AppBackground from './app/components/AppBackground';

import NavigationService from './app/helpers/navigationHelper';

// import {PUSHER_BEAMS_INSTANCE_ID} from "react-native-dotenv";
import OneSignal from 'react-native-onesignal';

const store = createStore();

export default class SetupScreen extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

  componentWillMount() {
    this.loadFonts();
  }

  componentWillUnmount() {
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  async loadFonts() {
    await Font.loadAsync({
      Hancock:require("./assets/fonts/HancockParkLaser.otf"),
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require('native-base/Fonts/Ionicons.ttf'),
      Entypo: require("native-base/Fonts/Entypo.ttf"),
      Feather: require("native-base/Fonts/Feather.ttf"),
      FontAwesome: require("native-base/Fonts/FontAwesome.ttf"),
      FontAwesome5_Brands:require("native-base/Fonts/FontAwesome5_Brands.ttf"),
      FontAwesome5_Solid:require("native-base/Fonts/FontAwesome5_Solid.ttf"),
      FontAwesome5_Regular:require("native-base/Fonts/FontAwesome5_Regular.ttf"),
      Octicons: require("native-base/Fonts/Octicons.ttf"),
    });
    this.setState({ isReady: true });
  }
  render() {
    if (!this.state.isReady) {
      return (
          <AppLoading/>
      );
    }
    let appTheme=getTheme(variables);
    return (
        <StyleProvider style={appTheme}>
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
