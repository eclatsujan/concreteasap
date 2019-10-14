import * as React from 'react';
import { Text, View, StyleSheet, TextInput, StatusBar,  } from 'react-native';
import {createSwitchNavigator,createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';

//contractor
import {acceptedOrders, calculator, pendingOrder, placeOrderStack} from "./routes/contractor";
import Notifications from "./screens/contractor/Notification/Notifications";
import HomeScreen from "./screens/contractor/Home";

//Rep Navigation
import {repAcceptedOrder,repViewOrder} from "./routes/rep";
import RepHomeScreen from './screens/Rep/RepHomeScreen';
import RepViewAcceptedOrders from './screens/Rep/Accepted Bids/RepViewAcceptedOrders';
import repNotifications from './screens/Rep/Notifications/Notifications'

//General Navigation
import AuthLoadingScreen from "./screens/auth/AuthLoadingScreen";
import {AuthStack} from "./routes/general";
import LogoutScreen from "./screens/auth/LogoutScreen";

import SideBar from "./components/SideBar";


const ContractorDrawer = createDrawerNavigator({
    //Contractor Drawer navigation section
    Home: HomeScreen,
    "Place Order Request":placeOrderStack,
    "Pending Order":pendingOrder,
    "Accepted Orders":acceptedOrders,
    "Notifications":Notifications,
    "Calculator":calculator,
    "Logout":LogoutScreen,
},{
    contentComponent: props => <SideBar {...props} />
});

const RepDrawer = createDrawerNavigator({
    //Rep Drawer navigation section
    "Home":RepHomeScreen,
    "Current Accepted Order":repAcceptedOrder,
    "Open Orders":repViewOrder,
    "View Accepted Order":RepViewAcceptedOrders,
    "Rep Notifications":repNotifications,
    "Logout":LogoutScreen,
    // RepOrder:RepOrderStatus
},{
    contentComponent: props => <SideBar {...props} />
});



const MainRoute = createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: {
                screen: AuthLoadingScreen,
                navigationOptions: { header: null },
            },
            Auth: AuthStack,
            App: ContractorDrawer,
            Rep:RepDrawer
        },
        {
            initialRouteName: 'AuthLoading',
        }
    )

);

export default MainRoute;