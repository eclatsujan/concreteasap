import {createStackNavigator} from "react-navigation-stack";

  //Bid
import RepViewOrders from '../screens/Rep/Bid/RepViewOrders';
import OrderDetails from '../screens/Rep/Bid/OrderDetails';

// import ViewOrderRequests from '../screens/contractor/Bid/ViewOrderRequests';

//Accept Order
import RepViewAcceptedOrders from '../screens/Rep/Accepted Bids/RepViewAcceptedOrders';

//Current Order Bids
import CurrentAcceptedOrder from '../screens/Rep/Current Bids/CurrentAcceptedOrder';
import OrderStatus from '../screens/Rep/Current Bids/OrderStatus';

//Rep Notifications
import repNotification from '../screens/Rep/Notifications/Notifications';

import BidMessageHome from "../screens/Rep/Order/BidMessageHome";

export const repAcceptedOrder=createStackNavigator({
    CurrentAcceptedOrder:CurrentAcceptedOrder,
    "OrderStatus":OrderStatus,
},{
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }});

export const repViewOrder=createStackNavigator({
    CurrentAcceptedOrder:RepViewOrders,
    "Order Details":OrderDetails,
    "Bid Message":BidMessageHome,
},{
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }});
