import * as types from './constants'
import {userService} from "../../../services/userService";
import * as appActions from "../app/actions";

export function markAsRead(notification_id) {

    return dispatch => {

        userService.markAsRead(notification_id).then((res) => {
            dispatch({
                type: types.REMOVE_NOTIFICATIONS,
                payload: {
                    notification_id
                }
            });
        }).catch((err) => {

        });
    };
}


/**
 * Set loading status on/off
 * @param {boolean} yes Loading status
 */
export const get = () => {
    return dispatch => {
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

