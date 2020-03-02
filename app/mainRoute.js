import * as React from 'react';
import {View,Text} from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import MainSidebar from './components/App/Sidebar/MainSidebar'
import screenMapping from './routes/ContractorScreenMenu'
//contractor
import {
    acceptedOrders,
    calculator,
    pendingOrder,
    placeOrderDrawerStack,
    dayOfPour,
    dayofPourStack,
    previousOrders,
    placeReoOrderRequestScreen
} from "./routes/contractor";

import Notifications from "./screens/User/Notification/Notifications";
import HomeScreen from "./screens/contractor/Concrete/Home";

//Rep Navigation
import {repBidOrders, repPendingBids, repAcceptedBids, repPreviousBids,repDayofPourBids} from "./routes/rep";
import RepHomeScreen from './screens/Rep/RepHomeScreen';

//General Navigation
import AuthLoadingScreen from "./screens/auth/AuthLoadingScreen";
import {AuthStack, UserProfileStack} from "./routes/general";
import LogoutScreen from "./screens/auth/LogoutScreen";

import SideBar from "./components/App/Sidebar/SideBar";

import MainHome from "./screens/contractor/MainHome";
// import {ConcreteDrawer} from "./components/ConcreteDrawer";
import ReoHome from "./screens/contractor/REO/ReoHome";
import {PlaceOrderScreen} from "./screens/contractor/REO/PlaceOrder/PlaceOrderScreen";

const ContractorConcreteDrawer = createDrawerNavigator({
    //Contractor Drawer navigation section
    Home: HomeScreen,
    "I Need Concrete": placeOrderDrawerStack,
    "Today's Orders": dayOfPour,
    "Pending Orders": pendingOrder,
    "Accepted Orders": acceptedOrders,
    "Previous Orders":previousOrders,
    // "Previous Order": previousOrders,
    "Notifications": Notifications,
    "Calculator": calculator,
    dayofPourStack
}, {
    defaultNavigationOptions: {
        drawerLockMode: 'locked-closed',
    },
    contentComponent: props => <SideBar {...props} />
});

const ContractorReoDrawer=createSwitchNavigator({
    "Reo Home":ReoHome,
    "I Need Reo":placeReoOrderRequestScreen,

});

const Main=createDrawerNavigator({
    "Main Home":MainHome,
    ...screenMapping,
    "User Profile": UserProfileStack,
    "Logout": LogoutScreen,
    ConcreteHome: ContractorConcreteDrawer,
    Reo:ContractorReoDrawer
},{
    contentComponent:props=><MainSidebar {...props} />
});

const RepDrawer = createDrawerNavigator({
    //Rep Drawer navigation section
    "Home": RepHomeScreen,
    "Concrete Jobs for Tender": repBidOrders,
    "My Bids": repPendingBids,
    "Jobs Won": repAcceptedBids,
    // "Day of Pour":repDayofPourBids,
    "Previous Bids": repPreviousBids,
    "Rep Notifications": Notifications,
    "User Profile": UserProfileStack,
    "Logout": LogoutScreen,
    // RepOrder:RepOrderStatus
}, {
    contentComponent: props => <SideBar {...props} />
});



const MainRoute = createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: {
                screen: AuthLoadingScreen,
                navigationOptions: {header: null},
            },
            Auth: AuthStack,
            MainContractorScreen:Main,
            Rep: RepDrawer
        },
        {
            initialRouteName: 'AuthLoading',
            disableGestures: true
        }
    )
);

export default MainRoute;
