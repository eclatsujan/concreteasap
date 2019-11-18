import React from "react";
import {StatusBar, ScrollView} from "react-native";
import {View, Text} from 'native-base'
import {DrawerNavigatorItems} from 'react-navigation-drawer';
import {SafeAreaView} from 'react-navigation';

import {appStyles} from "../../assets/styles/app_styles";

export default class SideBar extends React.Component {

    constructor(props) {
        super(props);

        this.resetTopNavigation = this.resetTopNavigation.bind(this);
    }

    resetTopNavigation(route, focused) {
        if (typeof route.route.routes !== 'undefined') {
            this.props.navigation.navigate({
                routeName: route.route.routes[0].routeName
            });
        } else {
            this.props.navigation.navigate(route.route.routeName);
        }
    }

    render() {
        return (
            <ScrollView style={[{paddingTop: StatusBar.currentHeight}, appStyles.bgBlack]}>
                <SafeAreaView
                    forceInset={{top: 'always', horizontal: 'never'}}
                >
                    <DrawerNavigatorItems
                        {...{...this.props, onItemPress: this.resetTopNavigation}}
                        getLabel={(scene) => (
                            <View
                                style={[appStyles.py_15,appStyles.ml_20, appStyles.borderGray44, appStyles.borderBottom,appStyles.w_100]}>
                                <Text
                                    style={[appStyles.colorPrimary, appStyles.upperCase]}>
                                    {this.props.getLabel(scene)}
                                </Text>
                            </View>
                        )}/>
                </SafeAreaView>
            </ScrollView>
        );
    }
}
