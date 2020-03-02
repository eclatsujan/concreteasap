import * as Immutable from "immutable";
import * as constants from './constants'

export const defaultState = Immutable.Map({
    data: Immutable.List([]),
    isLoading: false,
    error: false,
    polling:false,
    trashItems: Immutable.List([])
});
export const reducer = (state, action) => {
    let newState;
    switch (action.type) {
        case constants.REQUEST_PREVIOUS_ORDERS:
            return state.set("polling",true);
        case constants.REQUEST_PREVIOUS_ORDERS_SUCCESS:
            return state.set("data",Immutable.fromJS(action.payload.data)).set("error",false);
        case constants.REQUEST_PREVIOUS_ORDERS_FAILED:
            return state.set("error",true);
        case constants.STOP_FETCH_PREVIOUS_ORDERS:
            return state.set("polling",false);
        case constants.REMOVE_ORDER:
            let order_id=action.payload.order_id;
            state=state.update("trashItems",(result)=>{
                return result.push(order_id);
            });
            return state.updateIn(["data","result"],(result)=>{
                return result.filter((x)=>x!==order_id);
            });

        default:
            return state;
    }
};