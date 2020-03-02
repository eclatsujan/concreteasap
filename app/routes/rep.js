import {createStackNavigator} from "react-navigation-stack";

//Bid
import BidOrderList from '../screens/Rep/Bid Orders/BidOrderList';
import BidOrderDetail from '../screens/Rep/Bid Orders/BidOrderDetail';
import BidMessageHome from "../screens/Rep/Accepted Bids/BidMessageHome";

//Pending Order Request
import PendingBidList from '../screens/Rep/Pending Bids/PendingBidList';
import PendingBidDetail from '../screens/Rep/Pending Bids/PendingBidDetail'

//Current Order Bids
import AcceptedBidList from '../screens/Rep/Accepted Bids/AcceptedBidList';
import AcceptedBidDetail from '../screens/Rep/Accepted Bids/AcceptedBidDetail';
import UserDetail from "../screens/User/Contact/UserDetail";

//Previous Bid
import PreviousBidList from "../screens/Rep/Previous Orders/PreviousBidList";
import PreviousBidDetail from "../screens/Rep/Previous Orders/PreviousBidDetail";

import ViewOrderDetail from "../screens/contractor/Concrete/Pending/ViewOrderDetail";

export const repPendingBids= createStackNavigator({
    "Pending Bid List": PendingBidList,
    "Pending Bid Detail": PendingBidDetail,
}, {
    initialRouteName: 'Pending Bid List',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

export const repBidOrders = createStackNavigator({
    "Bid Order List": BidOrderList,
    "Bid Order Detail": BidOrderDetail,
    // "Bid Message": BidMessageHome,
}, {
    initialRouteName: 'Bid Order List',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

export const repAcceptedBids = createStackNavigator({
    "Accepted Bid List": AcceptedBidList,
    "Accepted Bid Detail": AcceptedBidDetail,
    "Rep User Contact Detail": UserDetail,
    "Rep View Message":BidMessageHome
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

export const repDayofPourBids = createStackNavigator({
    "Pour List": AcceptedBidList,
    "Pour Bid Detail": AcceptedBidDetail,
    "Pour User Contact Detail": UserDetail,
    "Pour View Message":BidMessageHome
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});


export const repPreviousBids = createStackNavigator({
    "Previous Bid List":PreviousBidList,
    "Previous Bid Detail":PreviousBidDetail,
},{
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});


