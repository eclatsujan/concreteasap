import {GET_NOTIFICATIONS,REMOVE_NOTIFICATIONS,SET_LOADING} from './constants'
import * as Immutable from "immutable";
import {fromJS} from "immutable";
// import {notifications} from "./index";

export const defaultState = Immutable.Map({
    notifications:Immutable.List([]),
    isLoading:false
});

export const reducer= (state, action) => {
    let newState=[];
    switch (action.type) {
        case GET_NOTIFICATIONS:
            newState=state.set("notifications",fromJS(action.payload.notifications));
            return newState;
        case REMOVE_NOTIFICATIONS:
            newState=state.get("notifications").filter(notify=>notify.get("id")!==action.payload.notification_id);
            return state.set("notifications",newState);
        case SET_LOADING:
            return state.set("isLoading",true);
        default:
            return state;
    }
};