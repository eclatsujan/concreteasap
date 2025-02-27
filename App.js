import * as Font from 'expo-font';
import React,{Component} from "react";

import {Platform,UIManager} from "react-native";

import {StyleProvider, Root, Toast} from "native-base";
import mitt from 'mitt'

import getTheme from "./native-base-theme/components";
import variables from "./native-base-theme/variables/commonColor";
import MainRoute from './app/mainRoute.js';

import {Provider} from 'react-redux';

import {createStore} from './app/store'

//Custom components
import AppLoading from './app/components/App/AppLoading';

import NavigationService from './app/helpers/navigationHelper';

import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from './assets/fonts/selection.json';
import OneSignal from "react-native-onesignal";

const emitter = mitt();

export default class SetupScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isReady: false
        };
    }

    componentDidMount() {
        this.loadFonts().then(() => {
            this.setState({isReady: true});
        });
    }

    async loadFonts() {
        return Font.loadAsync({
            "Hancock": require("./assets/fonts/HancockParkLaser.otf"),
            "ConcreteASAP": require('./assets/fonts/concrete-asap.ttf'),
            "Ionicons": require('native-base/Fonts/Ionicons.ttf'),
            "Entypo": require("native-base/Fonts/Entypo.ttf"),
            "FontAwesome": require("native-base/Fonts/FontAwesome.ttf"),
            "FontAwesome5_Brands": require("native-base/Fonts/FontAwesome5_Brands.ttf"),
            "FontAwesome5_Solid": require("native-base/Fonts/FontAwesome5_Solid.ttf"),
            "FontAwesome5_Regular": require("native-base/Fonts/FontAwesome5_Regular.ttf"),
            "Octicons": require("native-base/Fonts/Octicons.ttf"),
        });
    }

    render() {
        let appTheme = getTheme(variables);
        if (!this.state.isReady) {
            return (
                <AppLoading/>
            );
        }
        return (
            <StyleProvider style={appTheme}>
                <Root>
                    <Provider store={createStore}>
                        <MainRoute ref={navigatorRef => {
                            NavigationService.setTopLevelNavigator(navigatorRef);
                        }}/>
                    </Provider>
                </Root>
            </StyleProvider>
        );
    }
}
