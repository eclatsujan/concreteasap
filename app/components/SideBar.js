import React from "react";
import {StatusBar, ScrollView,TouchableWithoutFeedback} from "react-native";
import {View, Text,Icon} from 'native-base'
import {DrawerNavigatorItems} from 'react-navigation-drawer';
import {SafeAreaView} from 'react-navigation';

import {connect} from "react-redux";

import {appStyles} from "../../assets/styles/app_styles";
import {actions} from "../store/modules";
import { DrawerActions } from 'react-navigation-drawer';

class SideBar extends React.Component {

    constructor(props) {
        super(props);
        this.resetTopNavigation = this.resetTopNavigation.bind(this);
        this.closeSubMenu=this.closeSubMenu.bind(this);
    }

    resetTopNavigation(route, focused) {
        this.props.appLoading();
        // console.log(route.route.routes);
        if (typeof route.route.routes !== 'undefined') {
            let routeName=route.route.routes[0].routeName;
            let key=route.route.key;
            routeName=routeName==="ViewOrderHome"?"PlaceOrderLanding":routeName;
            this.props.navigation.navigate({
                routeName: routeName
            });
        } else {
            this.props.navigation.navigate(route.route.routeName);
        }
        this.closeSubMenu();
    }

    closeSubMenu(){
        this.props.navigation.dispatch(DrawerActions.closeDrawer());
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
                    <TouchableWithoutFeedback onPress={this.closeSubMenu}>
                        <View style={[appStyles.mr_10,appStyles.flexRow,appStyles.justifyRight]}>
                            <Icon type={"FontAwesome"} name={"close"} style={[appStyles.colorWhite]} />
                        </View>
                    </TouchableWithoutFeedback>

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
