import * as constants from "./constants";

// Action Creators
export const requestAcceptedOrders = () => {
    return { type: constants.REQUEST_ACCEPTED_ORDERS }
};

export const requestAcceptedOrdersSuccess = (data) => {
    return { type: constants.REQUEST_ACCEPTED_ORDERS_SUCCESS, payload:{orders: data}}
};

export const requestAcceptedOrdersError= () => {
    return { type: constants.REQUEST_ACCEPTED_ORDERS_FAILED}
};

export const fetchAcceptedOrders = () => {
    return { type: constants.FETCH_ACCEPTED_ORDERS }
};

