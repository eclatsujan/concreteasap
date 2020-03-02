import React from "react";
import {Image, TouchableWithoutFeedback,Text} from "react-native";
import {Icon, View} from "native-base";
import navigationHelper from "../../helpers/navigationHelper";

import {appStyles} from "../../../assets/styles/app_styles";
import * as SecureStore from "expo-secure-store";

export default class AppHeader extends React.Component {

    constructor(props) {
        super(props);
    }


    customMenu() {
        return (
            <TouchableWithoutFeedback style={[appStyles.bgWhite,appStyles.w_100,appStyles.flex1]}
                                      onPress={() => navigationHelper.openDrawer()}>
                <View style={[appStyles.w_50,appStyles.flexRow,appStyles.verticalCenter]}>
                    <View>
                        <Icon name='menu' style={appStyles.colorPrimary}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    render() {
        return (
            <View style={appStyles.navBar}>
                <View style={[appStyles.leftContainer, appStyles.flex1,appStyles.flexRow]}>
                    {this.customMenu()}
                </View>
                <View>
                    <TouchableWithoutFeedback onPress={() => {
                        SecureStore.getItemAsync("user_role").then((role) => {
                            if (role === "contractor") {
                                navigationHelper.navigate("Main Home");
                            }
                        });
                    }}>
                        <View style={[appStyles.w_100,appStyles.flexRow,appStyles.justifyItemsCenter]}>
                            <Image source={require("../../../assets/Logo18.png")} style={[appStyles.appHeader]}/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={[appStyles.rightContainer]}>
                    <TouchableWithoutFeedback onPress={() => navigationHelper.navigate("My Profile")}>
                        <View style={[appStyles.w_50,{justifyContent:"center",alignItems:"flex-end"}]}>
                            <Icon name='person' style={[appStyles.colorPrimary]}/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}
