import * as Immutable from "immutable";
import * as constants from "./constants";


export const pendingDefaultState = Immutable.Map({
    last_page: 0,
    current_page: 0,
    data: Immutable.List([]),
    error: false,
    loading: false,
    trash: Immutable.List([])
});

export const pendingReducer = (state, action) => {
    let orders, newState, index;
    switch (action.type) {
        case constants.REQUEST_PENDING_ORDERS:
            return state.updateIn(["loading"], () => {
                return true;
            });
        case constants.REQUEST_PENDING_ORDERS_SUCCESS:
            newState = state.set("data", Immutable.fromJS(action.payload.orders))
                .set("loading", false);
            return newState;
        case constants.REQUEST_PENDING_ORDERS_FAILED:
            return state.set("error", true).set("loading", false);
        case constants.REQUEST_ARCHIVE_ORDER:
            const {order_id}=action.payload;
            return state.updateIn(["data","result"],(order)=>{
                return order.filter((x)=>x!==order_id)
            });
        case constants.REQUEST_REMOVE_BID:
            const {bid_id,bid_order_id}=action.payload;
            // console.log(bid_id);
            return state.updateIn(["data","entities","orders",bid_order_id.toString(),"bids"],(bids)=>{
                return bids.filter((x)=>x!==bid_id);
            });
        default:
            return state;
    }
};