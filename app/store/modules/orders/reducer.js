import * as Immutable from "immutable";
import * as constants from "./constants";


export const PendingState = Immutable.Map({
    orders: Immutable.List([]),
    error:false,
    loading:false
});

export const PendingReducers = (state, action) => {
    let newState;
    switch(action.type) {
        case constants.REQUEST_ORDERS:
            return state.updateIn(["loading"],()=>{
                return true;
            });
        case constants.REQUEST_ORDERS_SUCCESS:
            newState=state.set("orders",Immutable.fromJS(action.payload.orders))
                    .set("loading",false);
            return newState;
        case constants.REQUEST_ORDERS_FAILED:
            return state.set("error",true).set("loading",false);
        default:
            return state;
    }
};