import {createStackNavigator} from "react-navigation-stack";
import {createSwitchNavigator} from "react-navigation";

//Calculator files
import FirstPage from '../screens/contractor/calculator/FirstPage';
import SecondPage from '../screens/contractor/calculator/SecondPage';
import ThirdPage from '../screens/contractor/calculator/ThirdPage';
import FourthPage from '../screens/contractor/calculator/FourthPage';

//Home Page
import HomeScreen from '../screens/contractor/Home';
//Notifications
import Notifications from '../screens/contractor/Notification/Notifications';

//Place order in contractor
import PlaceOrderLanding from '../screens/contractor/Order/PlaceOrder/PlaceOrderLanding';
import PlaceOrderRequest from '../screens/contractor/Order/PlaceOrder/PlaceOrderRequest';
import PlaceOrderAdditionalRequest from '../screens/contractor/Order/PlaceOrder/PlaceOrderAdditionalRequest';
//Special requests
import SpecialRequests from '../screens/contractor/Order/PlaceOrder/SpecialRequests';
import ReviewOrder from '../screens/contractor/Order/PlaceOrder/ReviewOrder';
import ReviewInstructions from '../screens/contractor/Order/PlaceOrder/ReviewInstructions';
import ViewOrderHome from '../screens/contractor/Order/PlaceOrder/ViewOrderHome';

//View accepted orders
import AcceptedOrders from '../screens/contractor/Order/AcceptedOrder/AcceptedOrders';
import DayOfPour from '../screens/contractor/Order/AcceptedOrder/DayOfPour';

//Pending Orders
import ViewOrderBids from '../screens/contractor/Bids/ViewOrderBids';
import ViewBids from '../screens/contractor/Bids/ViewBids';

//View Bids
import OrderBidStatus from '../screens/contractor/Bids/OrderBidStatus';

import ViewFullOrderDetails from '../screens/contractor/Order/AcceptedOrder/ViewFullOrderDetails';
import ModifyOrder from '../screens/contractor/Order/AcceptedOrder/ModifyOrder';
import ModifySpecialRequest from '../screens/contractor/Order/ModifySpecialRequest';

//User Profile
import UserProfile from '../screens/User/Profile/UserProfile';
import EditUserProfile from '../screens/User/Profile/EditUserProfile';

export const placeOrderStack = createStackNavigator({
        PlaceOrderLanding:PlaceOrderLanding,
        PlaceOrderRequest:PlaceOrderRequest,
        "Place Order Additional Request":PlaceOrderAdditionalRequest,
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
        "View Order Bids":ViewOrderBids,
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
