import {createStackNavigator} from "react-navigation-stack";
import {createSwitchNavigator} from "react-navigation";

//Calculator files
import FirstPage from '../screens/contractor/calculator/FirstPage';
import SecondPage from '../screens/contractor/calculator/SecondPage';
import ThirdPage from '../screens/contractor/calculator/ThirdPage';
import FourthPage from '../screens/contractor/calculator/FourthPage';

//Home Page
import HomeScreen from '../screens/contractor/Home';
//Special requests
import SpecialRequests from '../screens/contractor/Order/SpecialRequests';
//Notifications
import Notifications from '../screens/contractor/Notification/Notifications';

//Place order in contractor
import PlaceOrderRequest from '../screens/contractor/Order/PlaceOrder/PlaceOrderRequest';
import PlaceOrder from '../screens/contractor/Order/PlaceOrder/PlaceOrder';
import ReviewOrder from '../screens/contractor/Order/PlaceOrder/ReviewOrder';
import ReviewInstructions from '../screens/contractor/Order/PlaceOrder/ReviewInstructions';
import ViewOrderHome from '../screens/contractor/Order/PlaceOrder/ViewOrderHome';

//View accepted orders
import AcceptedOrders from '../screens/contractor/Order/AcceptedOrder/AcceptedOrders';
import DayOfPour from '../screens/contractor/Order/AcceptedOrder/DayOfPour';

//Pending Orders
import ViewOrderRequests from '../screens/contractor/Order/ViewOrderRequests';

//View Bids
import ViewBids from '../screens/contractor/Bids/ViewBids';
import OrderBidStatus from '../screens/contractor/Bids/OrderBidStatus';

import ViewFullOrderDetails from '../screens/contractor/Order/ViewFullOrderDetails';
import ModifyOrder from '../screens/contractor/Order/ModifyOrder';
import ModifySpecialRequest from '../screens/contractor/Order/ModifySpecialRequest';

//User Profile
import UserProfile from '../screens/contractor/Profile/UserProfile';
import EditUserProfile from '../screens/contractor/Profile/EditUserProfile';

export const placeOrderStack = createStackNavigator({
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

export const pendingOrder = createStackNavigator({
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

export const acceptedOrders = createStackNavigator({
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

export const calculator = createSwitchNavigator({
    //calculator
    first:FirstPage,
    second:SecondPage,
    third:ThirdPage,
    fourth:FourthPage,
});





