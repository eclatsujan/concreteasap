import {createStackNavigator} from "react-navigation-stack";
import {createSwitchNavigator} from "react-navigation";

//Calculator files
import FirstPage from '../screens/contractor/calculator/FirstPage';
import SecondPage from '../screens/contractor/calculator/SecondPage';
import ThirdPage from '../screens/contractor/calculator/ThirdPage';
import FourthPage from '../screens/contractor/calculator/FourthPage';

//Home Page
import HomeScreen from '../screens/contractor/Concrete/Home';
//Notifications
import Notifications from '../screens/User/Notification/Notifications';

//Place order in contractor
import PlaceOrderLanding from '../screens/contractor/PlaceOrder/PlaceOrderLanding';
import PlaceOrderRequest from '../screens/contractor/PlaceOrder/PlaceOrderRequest';
import PlaceOrderAdditionalRequest from '../screens/contractor/PlaceOrder/PlaceOrderAdditionalRequest';

//Special requests
import SpecialRequests from '../screens/contractor/PlaceOrder/SpecialRequests';
import ReviewOrder from '../screens/contractor/Review Order/ReviewOrder';
import ReviewInstructions from '../screens/contractor/Review Order/ReviewInstructions';
import ViewOrderHome from '../screens/contractor/PlaceOrder/ViewOrderHome';

//View accepted orders
import AcceptedOrderList from '../screens/contractor/AcceptedOrder/AcceptedOrderList';
import DayOfPour from '../screens/contractor/AcceptedOrder/DayOfPour';

//All Orders
import OrderBidStatus from '../screens/contractor/Pending/OrderBidStatus';
import ViewOrderDetail from "../screens/contractor/Pending/ViewOrderDetail";
import ViewOrderBids from '../screens/contractor/Pending/ViewOrderBids';
import ViewBids from '../screens/contractor/Pending/ViewBids';

//View Bids
import AcceptedOrderFullDetail from '../screens/contractor/AcceptedOrder/AcceptedOrderFullDetail';
import ModifyOrderRequest from "../screens/contractor/AcceptedOrder/Modify Order/ModifyOrderRequest";
import ModifyAdditionalRequest from "../screens/contractor/AcceptedOrder/Modify Order/ModifyAdditionalRequest";

//Order Message
import OrderMessageList from '../screens/contractor/AcceptedOrder/Order Message/OrderMessageList'
import OrderMessageDetail from "../screens/contractor/AcceptedOrder/Order Message/OrderMessageDetail";

//Confirm Order
import ConfirmReview from "../screens/contractor/AcceptedOrder/Confirm Order/ConfirmReview";
import ConfirmComment from "../screens/contractor/AcceptedOrder/Confirm Order/ConfirmComment";

//User Profile
import UserDetail from "../screens/User/Contact/UserDetail";

//Day Of Pour
import pourDayList from "../screens/contractor/Day of Pour/pourDayList";
import pourDayDetail from "../screens/contractor/Day of Pour/pourDayDetail";

import PreviousOrdersList from "../screens/contractor/Previous Order/PreviousOrdersList"
import PreviousOrderDetail from "../screens/contractor/Previous Order/PreviousOrderDetail";


export const calculator = createStackNavigator({
    //calculator
    firstCalculator: FirstPage,
    secondCalculator: SecondPage,
    thirdCalculator: ThirdPage,
    fourthCalculator: FourthPage,
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

export const placeOrderStack = createStackNavigator({
        PlaceOrderRequest: PlaceOrderRequest,
        orderCalculator: calculator,
        "Place Order Additional Request": PlaceOrderAdditionalRequest,
        SpecialRequests: SpecialRequests,
        ReviewOrder: ReviewOrder,
        ReviewInstructions: ReviewInstructions,
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

export const placeOrderDrawerStack = createStackNavigator({
    // PlaceOrderLanding: PlaceOrderLanding,
    "Place Order Requests": placeOrderStack,
    ViewOrderHome: ViewOrderHome,
}, {
    headerMode: 'none',
    initialRouteName: 'Place Order Requests',
    navigationOptions: {
        headerVisible: false,
    }
});

export const pendingOrder = createStackNavigator({
        ViewOrderBids: ViewOrderBids,
        ViewBids: ViewBids,
        OrderBidStatus: OrderBidStatus,
        "ViewOrderDetail": ViewOrderDetail
    },
    {
        headerMode: 'none',
        initialRouteKey: "ViewOrderBids",
        navigationOptions: {
            headerVisible: false,
        }
    }
);

export const modifyOrder = createStackNavigator({
    ModifyOrder: ModifyOrderRequest,
    ModifyAdditionalRequest: ModifyAdditionalRequest,
    ModifySpecialRequests: SpecialRequests,
    ModifyReviewOrder: ReviewOrder,
    ModifyReviewInstructions: ReviewInstructions,
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

export const acceptedOrders = createStackNavigator({
    "Accepted Order List": AcceptedOrderList,
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

export const orderMessage=createStackNavigator({
    "Order Message List": OrderMessageList,
    "Order Message Detail":OrderMessageDetail
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

export const dayofPourStack = createStackNavigator({
        DayOfPour: DayOfPour,
        "Accepted Order Full Detail": AcceptedOrderFullDetail,
        modifyOrder,
        "Modify Order Calculator": calculator,
        "Confirm Review": ConfirmReview,
        "Confirm Comment": ConfirmComment,
        "User Contact Detail": UserDetail,
        "Order Message":orderMessage,
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
            drawerLabel: () => null
        }
    }
);


export const dayOfPour = createStackNavigator({
    pourDayList,
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

export const previousOrders= createStackNavigator({
    "Previous Order List":PreviousOrdersList,
    "Previous Order Detail":PreviousOrderDetail
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});
