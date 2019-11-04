import * as constants from './constants'
import * as Immutable from 'immutable';

export const defaultState = Immutable.Map({
    orders: [],
    pending_orders: [],
    accepted_orders: [],
    current_order:{}
});

export const reducer= (state, action) => {
    switch (action.type) {
        case constants.ORDER_ALL:
            return state.set("orders", action.payload.orders);
        case constants.PENDING_ORDERS:
            return state.set("pending_orders", action.payload.pending_orders);
        case constants.ADD_ORDER:
            let orders=state.get("pending_orders");
            orders.push(action.payload.order);
            return state.set("pending_orders",orders);
        case constants.ACCEPTED_ORDERS:
            return state.set("accepted_orders", action.payload.accepted_orders);
        case constants.SINGLE_ORDER:
            return state.set("current_order",state.get("accepted_orders").find((order)=>order.id===action.payload.order_id));
        case constants.REMOVE_BID:
            return state;
        default:
            return state
    }
}
