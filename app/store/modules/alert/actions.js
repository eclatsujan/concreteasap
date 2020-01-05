import * as types from './constants'

export const addAlert = (title, message, type="error") => {
    return (dispatch, getState) => {
        dispatch(pushAlert({
            title,
            message,
            type
        }))
    }
};

export const deleteAlert = (alert_id) => {
    return (dispatch) => {
        dispatch(removeAlert(alert_id))
    }
};

export const pushAlert = (alert) => {
    return {
        type: types.PUSH_ALERT,
        payload: {
            alert
        }
    }
};

export const removeAlert = (alert_id) => {
    return {
        types: types.REMOVE_ALERT,
        payload: {
            alert_id
        }
    }
};
