import * as React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import {createSwitchNavigator,createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';

import Constants from 'expo-constants';

// You can import from local files
// import AssetExample from './AssetExample';
import LoginScreen from './screens/auth/Login';
import LogoutScreen from './screens/auth/Logout';
import AuthLoadingScreen from './screens/auth/AuthLoading';
import Register from './screens/auth/Register';
import UserProfile from './screens/contractor/Profile/UserProfile';
import EditUserProfile from './screens/contractor/Profile/EditUserProfile';
//Calculator files
import FirstPage from './screens/contractor/calculator/FirstPage';
import SecondPage from './screens/contractor/calculator/SecondPage';
import ThirdPage from './screens/contractor/calculator/ThirdPage';
import FourthPage from './screens/contractor/calculator/FourthPage';

//contractor files
import RegisterContractor from './screens/contractor/Register';

//Home Page
import HomeScreen from './screens/contractor/Home';
//Special requests
import SpecialRequests from './screens/contractor/Order/SpecialRequests';
//Notifications
import Notifications from './screens/contractor/Notification/Notifications';

//Place order in contractor 
import PlaceOrderRequest from './screens/contractor/Order/PlaceOrder/PlaceOrderRequest';
import PlaceOrder from './screens/contractor/Order/PlaceOrder/PlaceOrder';
import ReviewOrder from './screens/contractor/Order/PlaceOrder/ReviewOrder';
import ReviewInstructions from './screens/contractor/Order/PlaceOrder/ReviewInstructions';
import ViewOrderHome from './screens/contractor/Order/PlaceOrder/ViewOrderHome';

//View accepted orders
import AcceptedOrders from './screens/contractor/Order/AcceptedOrder/AcceptedOrders';
import DayOfPour from './screens/contractor/Order/AcceptedOrder/DayOfPour';

//
import ViewOrderRequests from './screens/contractor/Order/ViewOrderRequests';

//View Bids
import ViewBids from './screens/contractor/Bids/ViewBids';
import OrderBidStatus from './screens/contractor/Bids/OrderBidStatus';

import ViewFullOrderDetails from './screens/contractor/Order/ViewFullOrderDetails';
import ModifyOrder from './screens/contractor/Order/ModifyOrder';
import ModifySpecialRequest from './screens/contractor/Order/ModifySpecialRequest';

//Rep files
import RepHome from './screens/Rep/RepHome';
import repRegister from './screens/Rep/Register';
import RepViewOrderRequests from './screens/Rep/Order/ViewOrderRequests';
import OrderDetails from './screens/Rep/Order/OrderDetails';
import RepViewAcceptedOrder from './screens/Rep/Order/ViewAcceptedOrder';
import OrderStatus from './screens/Rep/Order/OrderStatus';
import CurrentAcceptedOrder from './screens/Rep/Order/CurrentAcceptedOrder';
import repNotification from './screens/Rep/Notifications/Notifications';

import SideBar from "./components/SideBar";

import BidMessageHome from "./screens/Rep/Order/BidMessageHome";

const AuthStack = createStackNavigator({
        SignIn: LoginScreen,
        Register:Register,
        RegContractor:RegisterContractor,
        repRegister:repRegister,
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }}
);

const repAcceptedOrder=createStackNavigator({
    CurrentAcceptedOrder:CurrentAcceptedOrder,
    "OrderStatus":OrderStatus,
},{
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
}});

const repViewOrder=createStackNavigator({
    CurrentAcceptedOrder:RepViewOrderRequests,
    "Order Details":OrderDetails,
    "Bid Message":BidMessageHome,
},{
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }});

const RepDrawer = createDrawerNavigator({
    //Rep Drawer navigation section
    "Home":RepHome,
    "Current Accepted Order":repAcceptedOrder,
    "Open Orders":repViewOrder,
    "View Accepted Order":RepViewAcceptedOrder,
    "Rep Notifications":repNotification,
    "Logout":LogoutScreen,
    // RepOrder:RepOrderStatus
});

const placeOrderStack = createStackNavigator({
        PlaceOrderRequest:PlaceOrderRequest,
        PlaceOrder:PlaceOrder,
        SpecialRequests:SpecialRequests,
        ReviewOrder:ReviewOrder,
        ReviewInstructions:ReviewInstructions,
        ViewOrderHome:ViewOrderHome,
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

const pendingOrder = createStackNavigator({

        ViewOrderRequests:ViewOrderRequests,
        ViewBids:ViewBids,
        OrderBidStatus:OrderBidStatus,

    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

const acceptedOrders = createStackNavigator({
        AcceptedOrders:AcceptedOrders,
        DayOfPour:DayOfPour,
        ViewFullOrderDetails:ViewFullOrderDetails,
        ModifyOrder:ModifyOrder,
        ModifySpecialRequest:ModifySpecialRequest,
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

const calculator = createSwitchNavigator({
    //calculator
    first:FirstPage,
    second:SecondPage,
    third:ThirdPage,
    fourth:FourthPage,
});

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