import {createStackNavigator} from "react-navigation-stack";

//Bid
import RepViewBids from '../screens/Rep/Bid Order/RepViewBids';
import OrderBidDetails from '../screens/Rep/Bid Order/OrderBidDetails';

//Current Order Bids
import CurrentAcceptedOrder from '../screens/Rep/Current Bids/CurrentAcceptedOrder';
import OrderStatus from '../screens/Rep/Current Bids/OrderStatus';

//Pending Order Request
import PendingOrderRequest from '../screens/Rep/My Bids/PendingOrderRequest';
import OrderPendingDetails from '../screens/Rep/My Bids/OrderPendingDetails'

//Rep Notifications
import Notifications from '../screens/User/Notification/Notifications';

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
    // "ViewOrderDetail":ViewOrderDetail,
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
