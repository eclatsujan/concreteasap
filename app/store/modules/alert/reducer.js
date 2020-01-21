import * as types from './constants'
import * as Immutable from "immutable";

export const defaultState = Immutable.Map({
    alerts: Immutable.List([])
});

export const reducer= (state, action) => {
    let newState;
    switch(action.type) {
        case types.PUSH_ALERT:
            let alert=Immutable.fromJS(action.payload.alert);
            newState=state.update("alerts",(val)=>{
                return val.push(alert);
            });
            return newState;
        case types.REMOVE_ALERT:
            newState=state.update("alerts",(alerts)=>{
                return alerts.filter((alert)=>alert.get("id")!==action.payload["alert_id"]);
            });
            return newState;
        default:
            return state;
    }
};