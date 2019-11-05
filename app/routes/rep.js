import {createStackNavigator} from "react-navigation-stack";

  //Bid
import RepViewBids from '../screens/Rep/Bid Order/RepViewBids';
import OrderBidDetails from '../screens/Rep/Bid Order/OrderBidDetails';

// import ViewOrderRequests from '../screens/contractor/Bid/ViewOrderRequests';

//Accept Order
import RepViewAcceptedOrders from '../screens/Rep/Accepted Bids/RepViewAcceptedOrders';

//Current Order Bids
import CurrentAcceptedOrder from '../screens/Rep/Current Bids/CurrentAcceptedOrder';
import OrderStatus from '../screens/Rep/Current Bids/OrderStatus';

//Pending Order Request
import PendingOrderRequest from '../screens/Rep/My Bids/PendingOrderRequest';
import OrderPendingDetails from '../screens/Rep/My Bids/OrderPendingDetails'
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
    "View Bids":RepViewBids,
    "View Bid Detail":OrderBidDetails,
    "Bid Message":BidMessageHome,
},{
  headerMode: 'none',
  navigationOptions: {
      headerVisible: false,
  }});

export const repPendingOrder=createStackNavigator({
    "Pending Order":PendingOrderRequest,
    "Order Pending Details":OrderPendingDetails,
},{
  headerMode: 'none',
  navigationOptions: {
      headerVisible: false,
  }});
