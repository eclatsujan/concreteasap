import {createStackNavigator} from "react-navigation-stack";
import {createSwitchNavigator} from "react-navigation";

//Calculator files
import FirstPage from '../screens/contractor/Concrete/calculator/FirstPage';
import SecondPage from '../screens/contractor/Concrete/calculator/SecondPage';
import ThirdPage from '../screens/contractor/Concrete/calculator/ThirdPage';
import FourthPage from '../screens/contractor/Concrete/calculator/FourthPage';

//Home Page
import HomeScreen from '../screens/contractor/Concrete/Home';
//Notifications
import Notifications from '../screens/User/Notification/Notifications';

//Place order in contractor
import PlaceOrderLanding from '../screens/contractor/Concrete/PlaceOrder/PlaceOrderLanding';
import PlaceOrderRequest from '../screens/contractor/Concrete/PlaceOrder/PlaceOrderRequest';
import PlaceOrderAdditionalRequest from '../screens/contractor/Concrete/PlaceOrder/PlaceOrderAdditionalRequest';

//Special requests
import SpecialRequests from '../screens/contractor/Concrete/PlaceOrder/SpecialRequests';
import ReviewOrder from '../screens/contractor/Concrete/Review Order/ReviewOrder';
import ReviewInstructions from '../screens/contractor/Concrete/Review Order/ReviewInstructions';
import ViewOrderHome from '../screens/contractor/Concrete/PlaceOrder/ViewOrderHome';

//View accepted orders
import AcceptedOrderList from '../screens/contractor/Concrete/AcceptedOrder/AcceptedOrderList';
import DayOfPour from '../screens/contractor/Concrete/AcceptedOrder/DayOfPour';

//All Orders
import OrderBidStatus from '../screens/contractor/Concrete/Pending/OrderBidStatus';
import ViewOrderDetail from "../screens/contractor/Concrete/Pending/ViewOrderDetail";
import ViewOrderBids from '../screens/contractor/Concrete/Pending/ViewOrderBids';
import ViewBids from '../screens/contractor/Concrete/Pending/ViewBids';

//View Bids
import AcceptedOrderFullDetail from '../screens/contractor/Concrete/AcceptedOrder/AcceptedOrderFullDetail';
import ModifyOrderRequest from "../screens/contractor/Concrete/AcceptedOrder/Modify Order/ModifyOrderRequest";
import ModifyAdditionalRequest from "../screens/contractor/Concrete/AcceptedOrder/Modify Order/ModifyAdditionalRequest";

//Order Message
import OrderMessageList from '../screens/contractor/Concrete/AcceptedOrder/Order Message/OrderMessageList'
import OrderMessageDetail from "../screens/contractor/Concrete/AcceptedOrder/Order Message/OrderMessageDetail";

//Confirm Order
import ConfirmReview from "../screens/contractor/Concrete/AcceptedOrder/Confirm Order/ConfirmReview";
import ConfirmComment from "../screens/contractor/Concrete/AcceptedOrder/Confirm Order/ConfirmComment";

//User Profile
import UserDetail from "../screens/User/Contact/UserDetail";

//Day Of Pour
import pourDayList from "../screens/contractor/Concrete/Day of Pour/pourDayList";
import pourDayDetail from "../screens/contractor/Concrete/Day of Pour/pourDayDetail";

import PreviousOrdersList from "../screens/contractor/Concrete/Previous Order/PreviousOrdersList"
import PreviousOrderDetail from "../screens/contractor/Concrete/Previous Order/PreviousOrderDetail";
import {createDrawerNavigator} from "react-navigation-drawer";
import PlaceOrderScreen from "../screens/contractor/REO/PlaceOrder/PlaceOrderScreen";
import AccessoriesOrderScreen from "../screens/contractor/REO/PlaceOrder/AccessoriesOrderScreen";
import ReoSpecialOrderScreen from "../screens/contractor/REO/PlaceOrder/ReoSpecialOrderScreen";
import ReoAdditionalOrderScreen from "../screens/contractor/REO/PlaceOrder/ReoAdditionalOrderScreen";
import ReoReviewScreen from "../screens/contractor/REO/ReviewOrder/ReoReviewScreen";
import ReoReviewInstructions from "../screens/contractor/REO/ReviewOrder/ReoReviewInstructions";


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

export const placeReoOrderRequestScreen=createStackNavigator({
    "Place Reo Order":PlaceOrderScreen,
    "Accessories Order":AccessoriesOrderScreen,
    "Reo Additional Order":ReoAdditionalOrderScreen,
    "Reo Special Order":ReoSpecialOrderScreen,
    "Reo Review Order":ReoReviewScreen,
    "Reo Review Instructions":ReoReviewInstructions
},{
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});
