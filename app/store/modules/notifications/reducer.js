import {
    REQUEST_NOTIFICATIONS_FAILED,
    REMOVE_NOTIFICATION,
    FETCH_NOTIFICATIONS,
    STOP_FETCH_NOTIFICATIONS,
    GET_NOTIFICATIONS_SUCCESS, REMOVE_NOTIFICATION_SUCCESS, REMOVE_NOTIFICATION_FAILURE
} from './constants'
import * as Immutable from "immutable";
import {fromJS} from "immutable";
// import {notifications} from "./index";

export const defaultState = Immutable.Map({
    data: Immutable.List([]),
    isLoading: false,
    error: false,
    polling:false,
    trashNotifications: Immutable.List([])
});

export const reducer = (state, action) => {
    let newState;
    switch (action.type) {
        case FETCH_NOTIFICATIONS:
            return state.setIn(["polling"],true);
        case GET_NOTIFICATIONS_SUCCESS:
            return state.setIn(["data"],fromJS(action.payload.notifications));
        case REQUEST_NOTIFICATIONS_FAILED:
            return state.setIn(["error"],true);
        case STOP_FETCH_NOTIFICATIONS:
            return state.setIn(["polling"],false);
        case REMOVE_NOTIFICATION:
            let notification_id=action.payload.notification_id;
            let item=state.getIn(["data",notification_id]);
            newState=state.updateIn(["data","result"],(notification)=>notification.filter((x)=> x!==notification_id));
            return newState.update("trashNotifications",(list)=>list.push(item));
        case REMOVE_NOTIFICATION_SUCCESS:
            let id=action.payload.notification_id;
            return state.removeIn(["trashNotifications",id]);
        case REMOVE_NOTIFICATION_FAILURE:
            return state;
        default:
            return state;

    }
};