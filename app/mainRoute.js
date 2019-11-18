import * as React from 'react';
import {createSwitchNavigator,createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';


//contractor
import {acceptedOrders, calculator, pendingOrder, placeOrderStack,placeOrderDrawerStack} from "./routes/contractor";

import Notifications from "./screens/User/Notification/Notifications";
import HomeScreen from "./screens/contractor/Home";

//Rep Navigation
import {repAcceptedOrder,repViewOrder,repPendingOrder} from "./routes/rep";
import RepHomeScreen from './screens/Rep/RepHomeScreen';
import RepPastBids from './screens/Rep/Past Bids/RepPastBids';
import repNotifications from './screens/Rep/Notifications/Notifications'

//General Navigation
import AuthLoadingScreen from "./screens/auth/AuthLoadingScreen";
import {AuthStack,UserProfileStack} from "./routes/general";
import LogoutScreen from "./screens/auth/LogoutScreen";

import SideBar from "./components/SideBar";


const ContractorDrawer = createDrawerNavigator({
    //Contractor Drawer navigation section
    Home: HomeScreen,
    "Place Order Request":placeOrderDrawerStack,
    "Pending Order":pendingOrder,
    "Accepted Order":acceptedOrders,
    "Notifications":Notifications,
    "Calculator":calculator,
    "User Profile":UserProfileStack,
    "Logout":LogoutScreen,
},{
    contentComponent: props => <SideBar {...props} />
});

const RepDrawer = createDrawerNavigator({
    //Rep Drawer navigation section
    "Home":RepHomeScreen,
    "Open Orders":repViewOrder,
    "Pending Rep Orders":repPendingOrder,
    "Current Orders":repAcceptedOrder,
    "Past Orders":RepPastBids,
    "Rep Notifications":Notifications,
    "User Profile":UserProfileStack,
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
