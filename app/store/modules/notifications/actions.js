import * as types from './constants'
import {userService} from "../../../services/userService";
import * as appActions from "../app/actions";

export function markAsRead(notification_id) {

    return dispatch => {
        dispatch(appActions.loading(true));
        dispatch({
            type: types.REMOVE_NOTIFICATIONS,
            payload: {
                notification_id
            }
        });
        userService.markAsRead(notification_id).then((res) => {
            dispatch(appActions.loading(false));
        }).catch((err) => {
            dispatch(appActions.loading(false));
        });
    };
}


/**
 * Set loading status on/off
 * @param {boolean} yes Loading status
 */
export const get = () => {
    return dispatch => {
        dispatch(appActions.loading(true));
        userService.getNotifications().then((res) => {
            dispatch({
                type: types.GET_NOTIFICATIONS,
                payload: {
                    notifications: res
                }
            });
            dispatch(appActions.loading(false));
        }).catch((err) => {
            dispatch(appActions.loading(false));
        });
    };
};

