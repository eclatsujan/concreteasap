import * as constants from './constants';
// Action Creators
export const requestOrders = () => {
    return { type: constants.REQUEST_ORDERS }
};

export const requestOrdersSuccess = (data) => {
    return { type: constants.REQUEST_ORDERS_SUCCESS, orders: data }
};

export const requestOrdersError= () => {
    return { type: constants.REQUEST_ORDERS_FAILED }
};

export const fetchOrders = () => {
    return { type: constants.FETCH_ORDERS }
};

export const getAcceptedOrders = () => {
    return {type:constants.GET_ORDERS,order_type:"accepted"}
};

export const getPendingOrders = () => {
    return {type:constants.GET_PENDING_ORDERS}
};

export const getDayOfPourOrders = () => {
    return {type:constants.GET_DAY_OF_POUR_ORDERS}
}