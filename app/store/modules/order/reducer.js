import * as constants from './constants'
import * as Immutable from 'immutable';
import {update} from "immutable";
import {normalize} from "normalizr";

export const defaultState = Immutable.Map({
    orders: Immutable.List([]),
    bidding_orders: Immutable.List([]),
    pending_orders: Immutable.List([]),
    accepted_orders: Immutable.Map({
        last_page: 0,
        current_page: 0,
        total: 0,
        data: Immutable.List([]),
        isLoading:false
    }),
    // accepted_orders: Immutable.List([]),
    previous_orders: Immutable.List([]),
    pour_orders: Immutable.Map({
        last_page: 0,
        current_page: 0,
        total: 0,
        data: Immutable.List([]),
        isLoading:false
    })
});

export const reducer = (state, action) => {
    let orders, newState, index;
    switch (action.type) {
        case constants.BIDDING_ORDERS:
            return state.set("bidding_orders", Immutable.fromJS(action.payload.bidding_orders));
        case constants.PENDING_ORDERS:
            let pending_orders = action.payload.pending_orders.filter((order) => {
                return order.order !== null;
            });
            return state.set("pending_orders", Immutable.fromJS(pending_orders));
        case constants.ACCEPTED_ORDERS:
            return state.setIn(["accepted_orders","data"], Immutable.fromJS(action.payload.data));
        case constants.SET_POUR_ORDERS:
            return state.setIn(["pour_orders","data"],Immutable.fromJS(action.payload.data))
                .setIn(["pour_orders","current_page"],action.payload.current_page)
                .setIn(["pour_orders","last_page"],action.payload.last_page)
                .setIn(["pour_orders","total"],action.payload.total)
                .setIn(["pour_orders","isLoading"],action.payload.isLoading);
        case constants.ADD_ORDER:
            orders = state.get("pending_orders");
            orders.push(Immutable.fromJS(action.payload.order));
            return state.set("pending_orders", orders);
        case constants.MODIFY_ORDER:
            orders = state.get("accepted_orders").get("data");
            index = orders.findKey((order) => {
                return order.get("id") === action.payload.order.order_id;
            });
            let type=action.payload.order_type?action.payload.order_type:"accepted_orders";
            newState = state.updateIn([type,"data", index, "order_concrete"], (val) => {
                return val.set("address", action.payload.order.address)
                    .set("suburb", action.payload.order.suburb)
                    .set("acc", action.payload.order.acc)
                    .set("quantity", action.payload.order.quantity)
                    .set("type", action.payload.order.type)
                    .set("placement_type", action.payload.order.placement_type)
                    .set("agg", action.payload.order.agg)
                    .set("mpa", action.payload.order.mpa)
                    .set("slump", action.payload.order.slump)
                    .set("preference", action.payload.order.preference)
                    .set("colours", action.payload.order.colours)
                    .set("time_deliveries", action.payload.order.time_deliveries)
                    .set("delivery_date", action.payload.order.delivery_date)
                    .set("delivery_date1", action.payload.order.delivery_date1)
                    .set("delivery_date2", action.payload.order.delivery_date2)
                    .set("time_preference1", action.payload.order.time_preference1)
                    .set("time_preference2", action.payload.order.time_preference2)
                    .set("time_preference3", action.payload.order.time_preference3)
                    .set("delivery_instructions", action.payload.order.delivery_instructions)
                    .set("message_required", action.payload.order.message_required)
            });

            return newState;
        case constants.CANCEL_ORDER:
            return state.updateIn(['accepted_orders',"data"], (orders) => {
                   return orders.filter((order) => {
                       return order.get("id") !== action.payload.order_id;
                   });
               });
        case constants.ARCHIVE_ORDER:
            return state.updateIn(["pending_orders"],(orders)=>{
                return orders.filter((order)=>{
                    return order.get("id") !== action.payload.order_id;
                })
            });
        case constants.COMPLETE_ORDER:
            return state.updateIn(['accepted_orders',"data"], (orders) => {
                return orders.filter((order) => {
                    return order.get("id") !== action.payload.order_id;
                });
            });
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
        case constants.PAY_ORDER:
            let bidding_orders = state.get("bidding_orders");
            let filtered_bidding = bidding_orders.filter((order) => order.id !== action.payload.order_id);
            return state.set("bidding_orders", filtered_bidding);
        case constants.PREVIOUS_ORDER:
            return state.set("previous_order", "");
        default:
            return state
    }
};
