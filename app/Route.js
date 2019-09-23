import * as React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import {
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer,
} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';

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
import HomeScreen from './screens/contractor/Home';
import PlaceOrder from './screens/contractor/Order/PlaceOrder';
import ReviewOrder from './screens/contractor/Order/ReviewOrder';
import ReviewInstructions from './screens/contractor/Order/ReviewInstructions';
import SpecialRequests from './screens/contractor/Order/SpecialRequests';
import Notifications from './screens/contractor/Notification/Notifications';
import ViewOrderRequests from './screens/contractor/Order/ViewOrderRequests';
import ViewBids from './screens/contractor/Bids/ViewBids';
import PlaceOrderRequest from './screens/contractor/Order/PlaceOrderRequest';
import OrderBidStatus from './screens/contractor/Bids/OrderBidStatus';
import AcceptedOrders from './screens/contractor/Order/AcceptedOrders';
import DayOfPour from './screens/contractor/Order/DayOfPour';
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

const ContractorStack = createDrawerNavigator({

    //Contractor Drawer navigation section
    Authorization:{
        screen: AuthStack
    },
    ContractorHome: {
        screen: contractorPannel
    },
    RepHome: {
        screen: RepPannel
    },



});

const contractorPannel = createStackNavigator({
        //User profile
        UserProfile:UserProfile,
        EditUserProfile:EditUserProfile,
        //contractor stack navigation section
        PlaceOrder:PlaceOrder,
        ReviewOrder:ReviewOrder,
        ReviewInstructions:ReviewInstructions,
        SpecialRequests:SpecialRequests,
        ViewOrderRequests:ViewOrderRequests,
        ViewBids:ViewBids,
        OrderBidStatus:OrderBidStatus,
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

const AuthStack = createStackNavigator({
    SignIn: LoginScreen,
    Register:Register,
    RegContractor:RegisterContractor,
    repRegister:repRegister, },{
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

// const RepStack = createDrawerNavigator({ 
//   //Rep Drawer navigation section
//   RepHome:RepHome,
//   CurrentAcceptedOrder:CurrentAcceptedOrder,
//   RepViewOrderRequests:RepViewOrderRequests,
//   RepViewAcceptedOrder:RepViewAcceptedOrder,
//   repNotification:repNotification,
//   Logout:LogoutScreen, 
// });

const RepPannel = createStackNavigator({
        //Rep navigation section
        OrderStatus:OrderStatus,
        OrderDetails:OrderDetails,
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
    second:SecondPage,
    third:ThirdPage,
    fourth:FourthPage,
});


const MainRoute = createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: {
                screen: AuthLoadingScreen,
                navigationOptions: { header: null },
            },
            App: ContractorStack,
            Auth: AuthStack,
            Contractor: contractorPannel,
            Rep: RepPannel,
            RepDrawer: RepStack,
            cal:calculator,

        },
        {
            contentComponent: props => <SideBar {...props} />
        },
        {
            initialRouteName: 'AuthLoading',
        }
    )
);

export default MainRoute;