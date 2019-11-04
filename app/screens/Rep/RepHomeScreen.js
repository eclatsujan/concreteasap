import * as React from 'react';
// import {TextInput, StyleSheet, Label} from 'react-native';
import { View,Container,Header,Content,Icon,Title } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import {styles} from './styles.js';
import {appStyles} from "../assets/app_styles";

import AppHeader from "../../components/AppHeader";
import AppBackground from "../../components/AppBackground";
import HomeButton from "../../components/HomeButton";


export default class RepHomeScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <AppBackground>
                <AppHeader/>
                <Content style={[appStyles.bgTransparent]}>
                  <HomeButton onPress={()=>this.props.navigation.navigate("Open Orders")}
                      text="View Order" iconName="clipboard" />
                  <HomeButton onPress={()=>this.props.navigation.navigate("Pending Rep Orders")}
                          text="Pending Order" iconName="hourglass" />
                  <HomeButton onPress={()=>this.props.navigation.navigate("Current Orders")}
                      text="Current Orders" iconName="running" />
                  <HomeButton onPress={()=>this.props.navigation.navigate("Past Orders")}
                      text="Past Orders" iconName="folder" />
                  <HomeButton onPress={()=>this.props.navigation.navigate("Rep Notifications")}
                          text="Notifications" iconName="bell" />
                </Content>
            </AppBackground>
        );
    }
}
