import * as types from './constants'
import {userService} from "../../../services/userService";
import * as appActions from "../app/actions";
import * as constants from "./constants";
import {GET_NOTIFICATIONS_SUCCESS} from "./constants";

// export function markAsRead(notification_id) {
//     return dispatch => {
//         loading(true);
//         dispatch({
//             type: types.REMOVE_NOTIFICATIONS,
//             payload: {
//                 notification_id
//             }
//         });
//         userService.markAsRead(notification_id).then((res) => {
//
//         }).catch((err) => {
//             console.log(err);
//             loading(false);
//         });
//     };
// }


/**
 * Set loading status on/off
 * @param {boolean} yes Loading status
 */

// export const get = () => {
//     return (dispatch,getState) => {
//         userService.getNotifications().then((res) => {
//             console.log("I am notification");
//             dispatch({
//                 type: types.GET_NOTIFICATIONS,
//                 payload: {
//                     notifications: res
//                 }
//             });
//             dispatch(appActions.loading(false));
//         }).catch((err) => {
//             dispatch(appActions.loading(false));
//         });
//     };
// };
//
// export const loading = (isLoading) => {
//     return dispatch => {
//         dispatch({
//             type:types.SET_LOADING,
//             payload:{
//                 isLoading
//             }
//         })
//     }
// };
//
//
export const requestNotificationsSuccess = (data) => {
    // console.log(data);
    return { type: constants.GET_NOTIFICATIONS_SUCCESS, payload:{notifications: data}}
};

export const requestNotificationsError= () => {
    return { type: constants.REQUEST_NOTIFICATIONS_FAILED}
};

export const fetchNotifications = () => {
    return { type: constants.FETCH_NOTIFICATIONS }
};

export const stopFetchingNotifications = () => {
    return { type:constants.STOP_FETCH_NOTIFICATIONS}
};

export const removeNotification = (notification_id) => {
    return {type:constants.REMOVE_NOTIFICATION,payload:{notification_id}}
};

export const removeNotificationSuccess = (notification_id) => {
    return {type:constants.REMOVE_NOTIFICATION_SUCCESS,payload:{notification_id}}
};

export const removeNotificationFailure = (notification_id) => {
    return {type:constants.REMOVE_NOTIFICATION_FAILURE,payload:{notification_id}}
};
