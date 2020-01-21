import * as constants from "./constants";

// Action Creators
export const requestPendingOrders = () => {
    return { type: constants.REQUEST_PENDING_ORDERS }
};

export const requestPendingOrdersSuccess = (data) => {
    return { type: constants.REQUEST_PENDING_ORDERS_SUCCESS, payload:{orders: data}}
};

export const requestPendingOrdersError= () => {
    return { type: constants.REQUEST_PENDING_ORDERS_FAILED}
};

export const fetchPendingOrders = () => {
    return { type: constants.FETCH_PENDING_ORDERS }
};
