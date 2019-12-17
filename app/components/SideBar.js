import React from "react";
import {StatusBar, ScrollView} from "react-native";
import {View, Text} from 'native-base'
import {DrawerNavigatorItems} from 'react-navigation-drawer';
import {SafeAreaView} from 'react-navigation';

import {connect} from "react-redux";

import {appStyles} from "../../assets/styles/app_styles";
import {actions} from "../store/modules";


class SideBar extends React.Component {

    constructor(props) {
        super(props);
        this.resetTopNavigation = this.resetTopNavigation.bind(this);
    }

    resetTopNavigation(route, focused) {
        this.props.appLoading();
        if (typeof route.route.routes !== 'undefined') {
            this.props.navigation.navigate({
                routeName: route.route.routes[0].routeName
            });
        } else {
            this.props.navigation.navigate(route.route.routeName);
        }
    }

    render() {
        const {items} = this.props;
        const filteredItems = items.filter(
            item => item.key !== 'dayofPourStack'
        );
        return (
            <ScrollView style={[{paddingTop: StatusBar.currentHeight}, appStyles.bgBlack]}>
                <SafeAreaView
                    forceInset={{top: 'always', horizontal: 'never'}}
                >
                    <DrawerNavigatorItems
                        {...{...this.props, onItemPress: this.resetTopNavigation}}
                        items={filteredItems}
                        getLabel={(scene) => (
                            <View
                                style={[appStyles.py_15, appStyles.ml_20, appStyles.borderGray44, appStyles.borderBottom, appStyles.w_100]}>
                                <Text
                                    style={[appStyles.colorPrimary, appStyles.upperCase, appStyles.boldFont]}>
                                    {this.props.getLabel(scene)}
                                </Text>
                            </View>
                        )}/>
                </SafeAreaView>
            </ScrollView>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        appLoading: async () => {
            return await dispatch(actions.app.loading())
        }
    }
};

export default connect(null, mapDispatchToProps)(SideBar);
