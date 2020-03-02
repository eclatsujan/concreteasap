import {evaluateChildDrawerTitle} from "../helpers/menu";
import HomeScreen from "../screens/contractor/Concrete/Home";
import {dayOfPour, placeOrderDrawerStack} from "./contractor";
import PlaceOrderRequest from "../screens/contractor/Concrete/PlaceOrder/PlaceOrderRequest";
import ViewOrderBids from "../screens/contractor/Concrete/Pending/ViewOrderBids";
import AcceptedOrderList from "../screens/contractor/Concrete/AcceptedOrder/AcceptedOrderList";
import PreviousOrdersList from "../screens/contractor/Concrete/Previous Order/PreviousOrdersList";
import Notifications from "../screens/User/Notification/Notifications";
import ReoHome from "../screens/contractor/REO/ReoHome";
import PlaceOrderScreen from "../screens/contractor/REO/PlaceOrder/PlaceOrderScreen";

export default {
    "Concrete_Concrete Home":{
        screen:HomeScreen,
        // route:"Home",
        navigationOptions: evaluateChildDrawerTitle,
    },
    "Concrete_I Need Concrete": {
        screen:PlaceOrderRequest,
        params:{
            reset:true,
            key:"I Need Concrete",
            route:"Place Order Requests"
            // backRoute:"ConcreteHome",
            // key:""
        },
        navigationOptions: evaluateChildDrawerTitle,
    },
    "Concrete_Today's Orders": {
        screen: dayOfPour,
        route:"Today's Orders",
        navigationOptions: evaluateChildDrawerTitle,
    },
    "Concrete_Pending Orders": {
        screen: ViewOrderBids,
        route:"Pending Orders",
        navigationOptions: evaluateChildDrawerTitle,
    },
    "Concrete_Accepted Orders": {
        screen: AcceptedOrderList,
        navigationOptions: evaluateChildDrawerTitle,
    },
    "Concrete_Previous Orders":{
        screen:PreviousOrdersList,
        navigationOptions:evaluateChildDrawerTitle,
    },
    "Concrete_Notifications":{
        screen:Notifications,
        navigationOptions:evaluateChildDrawerTitle,
    },
    "Concrete_FAQ":{
        screen:HomeScreen,
        navigationOptions:evaluateChildDrawerTitle,
    },
    "Reo_Reo Home":{
        screen:ReoHome,
        navigationOptions:evaluateChildDrawerTitle,

    },
    "Reo_I Need Reo":{
        screen:PlaceOrderScreen,
        navigationOptions:evaluateChildDrawerTitle,
    },
    "Reo_Today's Orders":{
        screen:ReoHome,
        navigationOptions:evaluateChildDrawerTitle,
    },
    "Reo_Pending Orders":{
        screen:ReoHome,
        navigationOptions:evaluateChildDrawerTitle,
    },
    "Reo_Accepted Orders":{
        screen:ReoHome,
        navigationOptions:evaluateChildDrawerTitle,
    },
    "Reo_Previous Orders":{
        screen:ReoHome,
        navigationOptions:evaluateChildDrawerTitle,
    },
    "Reo_Notifications":{
        screen:ReoHome,
        navigationOptions:evaluateChildDrawerTitle,
    },
    "Reo_FAQ":{
        screen:ReoHome,
        navigationOptions:evaluateChildDrawerTitle
    }
};