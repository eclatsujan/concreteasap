import React from "react";
import {Image, TouchableWithoutFeedback} from "react-native";
import {Icon, View} from "native-base";
import navigationHelper from "../../helpers/navigationHelper";

import {appStyles} from "../../../assets/styles/app_styles";

export default class AppHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    customMenu() {
        return this.props["backMenu"] ? <TouchableWithoutFeedback style={appStyles.bgWhite}
                                                                  onPress={() => navigationHelper.goBack()}>
            <Icon name="arrow-back" style={appStyles.colorPrimary}/>
        </TouchableWithoutFeedback> : <TouchableWithoutFeedback style={[appStyles.w_50]} onPress={() => navigationHelper.openDrawer()}>
            <View>
                <Icon name='menu' style={appStyles.colorPrimary}/>
            </View>
        </TouchableWithoutFeedback>;
    }

    render() {
        return (
            <View style={appStyles.navBar}>
                <View style={[appStyles.leftContainer]}>
                    <View style={[appStyles.flex1]}>
                        {this.customMenu()}
                    </View>
                </View>
                <View>
                    <TouchableWithoutFeedback onPress={()=>{
                        navigationHelper.navigate("Home");
                    }}>
                        <Image source={require("../../../assets/Logo18.png")} style={[appStyles.appHeader]}/>
                    </TouchableWithoutFeedback>
                </View>
                <View style={appStyles.rightContainer}>
                    <TouchableWithoutFeedback onPress={() => navigationHelper.navigate("My Profile")}>
                        <Icon name='person' style={[appStyles.colorPrimary]}/>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}
