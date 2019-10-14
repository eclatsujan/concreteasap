import * as React from 'react';
import {TextInput, StyleSheet, Label, ImageBackground, Dimensions,Platform,StatusBar} from 'react-native';
import { View,Container, Button, Text,Header,Content,Right,Body,Left,Icon,Footer,FooterTab,Title } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import {styles} from './styles.js';
import {appStyles} from "../assets/app_styles";

import AppHeader from "../../components/AppHeader";



export default class RepHomeScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        let { height, width } = Dimensions.get('window');
        return (
            <ImageBackground source={require("../../../assets/concrete-background.png")} style={{width,height,paddingTop:StatusBar.currentHeight}}>
                <AppHeader/>
                <Container style={[appStyles.bgTransparent]}>

                </Container>
            </ImageBackground>
        );
    }
}
