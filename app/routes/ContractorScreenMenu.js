import {evaluateChildDrawerTitle} from "../helpers/menu";
import HomeScreen from "../screens/contractor/Concrete/Home";
import {dayOfPour, placeOrderDrawerStack} from "./contractor";
import PlaceOrderRequest from "../screens/contractor/PlaceOrder/PlaceOrderRequest";
import ViewOrderBids from "../screens/contractor/Pending/ViewOrderBids";
import AcceptedOrderList from "../screens/contractor/AcceptedOrder/AcceptedOrderList";
import PreviousOrdersList from "../screens/contractor/Previous Order/PreviousOrdersList";
import Notifications from "../screens/User/Notification/Notifications";
import ReoHome from "../screens/contractor/REO/ReoHome";

export default {
    "Concrete_Concrete Home":{
        screen:HomeScreen,
        // route:"Home",
        navigationOptions: evaluateChildDrawerTitle,
        params:{
            hey:"Ho"
        }
    },
    "Concrete_I Need Concrete": {
        screen:PlaceOrderRequest,
        route:"I Need Concrete",
        key:"App",
        navigationOptions: evaluateChildDrawerTitle,
    },
    "Concrete_Today's Order": {
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
    "Reo_I Need Reo":{
        screen:ReoHome,
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
        navigationOptions:evaluateChildDrawerTitle,
    }
};