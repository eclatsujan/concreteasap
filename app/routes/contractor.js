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
import AcceptedOrders from '../screens/contractor/AcceptedOrder/AcceptedOrders';
import DayOfPour from '../screens/contractor/AcceptedOrder/DayOfPour';

//All Orders
import OrderBidStatus from '../screens/contractor/AllOrders/OrderBidStatus';
import ViewOrderDetail from "../screens/contractor/AllOrders/ViewOrderDetail";
import ViewOrderBids from '../screens/contractor/AllOrders/ViewOrderBids';
import ViewBids from '../screens/contractor/AllOrders/ViewBids';

//View Bids
import ViewFullOrderDetails from '../screens/contractor/AcceptedOrder/ViewFullOrderDetails';
import ModifyOrderRequest from "../screens/contractor/Modify Order/ModifyOrderRequest";
import ModifyAdditionalRequest from "../screens/contractor/Modify Order/ModifyAdditionalRequest";

//Confirm Order
import ConfirmReview from "../screens/contractor/Confirm Order/ConfirmReview";
import ConfirmComment from "../screens/contractor/Confirm Order/ConfirmComment";

//User Profile
import UserDetail from "../screens/User/Contact/UserDetail";

//Day Of Pour
import pourDayList from "../screens/contractor/Day of Pour/pourDayList";
import pourDayDetail from "../screens/contractor/Day of Pour/pourDayDetail";


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
    PlaceOrderLanding: PlaceOrderLanding,
    "Place Order Requests": placeOrderStack,
    ViewOrderHome: ViewOrderHome,
}, {
    headerMode: 'none',
    initialRouteName: 'PlaceOrderLanding',
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
    AcceptedOrders: AcceptedOrders,
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

export const dayofPourStack = createStackNavigator({
        DayOfPour: DayOfPour,
        ViewFullOrderDetails: ViewFullOrderDetails,
        modifyOrder,
        "Confirm Review": ConfirmReview,
        "Confirm Comment": ConfirmComment,
        "User Contact Detail": UserDetail,
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
