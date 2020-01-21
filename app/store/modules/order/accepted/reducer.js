import * as Immutable from "immutable";
import * as constants from "./constants";


export const acceptedDefaultState = Immutable.Map({
    last_page: 0,
    current_page: 0,
    data: Immutable.List([]),
    error:false,
    loading:false
});

export const acceptedReducer = (state, action) => {
    let orders, newState, index;
    switch(action.type) {
        case constants.REQUEST_ACCEPTED_ORDERS:
            return state.updateIn(["loading"],()=>{
                return true;
            });
        case constants.REQUEST_ACCEPTED_ORDERS_SUCCESS:
            newState=state.set("data",Immutable.fromJS(action.payload.orders))
                .set("loading",false);
            return newState;
        case constants.REQUEST_ACCEPTED_ORDERS_FAILED:
            return state.set("error",true).set("loading",false);
        default:
            return state;
    }
};