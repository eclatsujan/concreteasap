import * as constants from './constants'
import * as Immutable from 'immutable';

export const defaultState = Immutable.Map({
    bidding_orders: [],
    pending_orders: [],
    accepted_orders: [],
    cancelled_orders: [],
    complete_orders: [],
    current_order: {}
});

export const reducer = (state, action) => {
    switch (action.type) {
        case constants.BIDDING_ORDERS:
            return state.set("bidding_orders", action.payload.bidding_orders);
        case constants.PENDING_ORDERS:
            return state.set("pending_orders", action.payload.pending_orders);
        case constants.ACCEPTED_ORDERS:
            return state.set("accepted_orders", action.payload.accepted_orders);
        case constants.ADD_ORDER:
            let orders = state.get("pending_orders");
            orders.push(action.payload.order);
            return state.set("pending_orders", orders);
        case constants.GET_SINGLE_ACCEPTED_ORDER:
            let order = state.get("accepted_orders").filter(x => x.id === action.payload.id);
            //if order is array
            order = order ? order[0] : {};
            return state.set("current_order", order);
        case constants.SINGLE_ORDER:
            return state.set("current_order", state.get("accepted_orders").find((order) => order.id === action.payload.order_id));
        case constants.CANCEL_ORDER:
            // state.get("accepted_orders").find((order)=>order.id===action.payload.order_id);
            // let cancelled_orders=state.get("cancelled_orders");
            return state.set("cancelled_orders", orders);
        case constants.REMOVE_BID:
            //get pending orders from immutable js
            let pending_order = state.get("pending_orders");
            //find current order
            let order_index = pending_order.findIndex((order) => order.id === action.payload.order_id);
            //filter bid from pending orders
            let bids = pending_order[order_index]["bids"].filter((bid) => {
                return bid["id"] !== action.payload.bid_id;
            });
            //update removed bid value
            return state.setIn(["pending_orders", order_index, "bids"], bids);
        default:
            return state
    }
}
