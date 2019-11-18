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
import ViewOrderBids from '../screens/contractor/AllOrders/ViewOrderBids';
import ViewBids from '../screens/contractor/AllOrders/ViewBids';

//View Bids
import ViewFullOrderDetails from '../screens/contractor/AcceptedOrder/ViewFullOrderDetails';
import ModifyOrderRequest from "../screens/contractor/Modify Order/ModifyOrderRequest";
import ModifyAdditionalRequest from "../screens/contractor/Modify Order/ModifyAdditionalRequest";

//User Profile
import OrderReview from "../screens/contractor/Confirm Order/OrderReview";

export const placeOrderStack = createStackNavigator({
        PlaceOrderRequest: PlaceOrderRequest,
        "Place Order Additional Request": PlaceOrderAdditionalRequest,
        SpecialRequests: SpecialRequests,
        ReviewOrder: ReviewOrder,
        ReviewInstructions: ReviewInstructions,
        ViewOrderHome: ViewOrderHome,
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
    "Place Order Request": placeOrderStack
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

export const pendingOrder = createStackNavigator({
        "View Order Bids": ViewOrderBids,
        ViewBids: ViewBids,
        OrderBidStatus: OrderBidStatus,
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

export const modifyOrder=createStackNavigator({
    ModifyOrder: ModifyOrderRequest,
    ModifyAdditionalRequest: ModifyAdditionalRequest,
    ModifySpecialRequests:SpecialRequests,
    ModifyReviewOrder: ReviewOrder,
    ModifyReviewInstructions: ReviewInstructions,
},{
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

export const acceptedOrders = createStackNavigator({
        AcceptedOrders: AcceptedOrders,
        OrderReview: OrderReview,
        DayOfPour: DayOfPour,
        ViewFullOrderDetails: ViewFullOrderDetails,
        modifyOrder:modifyOrder
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
    first: FirstPage,
    second: SecondPage,
    third: ThirdPage,
    fourth: FourthPage,
});
