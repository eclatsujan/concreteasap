import React from "react";
import {Image, Platform, StatusBar,TouchableHighlight} from "react-native";
import {Button, Icon, Left, Body, Right, Header, View} from "native-base";
import navigationHelper from "../../helpers/navigationHelper";

import {appStyles} from "../../../assets/styles/app_styles";

export default class AppHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    customMenu() {
        return this.props["backMenu"] ? <TouchableHighlight onPress={() => navigationHelper.goBack()}>
            <Icon name="arrow-back" style={appStyles.colorPrimary}/>
        </TouchableHighlight> : <TouchableHighlight onPress={() => navigationHelper.openDrawer()}>
            <Icon name='menu' style={appStyles.colorPrimary}/>
        </TouchableHighlight>;
    }

    render() {
        return (
            <View style={appStyles.navBar}>
                <View style={appStyles.leftContainer}>
                    {this.customMenu()}
                </View>
                <Image source={require("../../../assets/Logo18.png")} style={[appStyles.appHeader]}/>
                <View style={appStyles.rightContainer}>
                    <TouchableHighlight onPress={() => navigationHelper.navigate("My Profile")}>
                        <Icon name='person' style={[appStyles.colorPrimary]}/>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}
