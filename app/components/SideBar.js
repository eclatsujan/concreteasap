import React from "react";
import {StatusBar, ScrollView} from "react-native";
import {DrawerNavigatorItems} from 'react-navigation-drawer';
import {SafeAreaView} from 'react-navigation';


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
            <ScrollView style={{paddingTop: StatusBar.currentHeight}}>
                <SafeAreaView
                    forceInset={{top: 'always', horizontal: 'never'}}
                >
                    <DrawerNavigatorItems {...{...this.props, onItemPress: this.resetTopNavigation}} />
                </SafeAreaView>
            </ScrollView>
        );
    }
}
