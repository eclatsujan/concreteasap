import * as constants from './constants';

export function stopFetchingPreviousOrders() {
    return {type:constants.STOP_FETCH_PREVIOUS_ORDERS}
}

export const fetchPreviousOrders = () => {
    return { type: constants.FETCH_PREVIOUS_ORDERS }
};

// Action Creators
export const requestPreviousOrders = () => {
    return { type: constants.REQUEST_PREVIOUS_ORDERS }
};

export const requestPreviousOrdersSuccess = (data) => {
    return { type: constants.REQUEST_PREVIOUS_ORDERS_SUCCESS, payload: {data} }
};

export const requestPreviousOrdersError= () => {
    return { type: constants.REQUEST_PREVIOUS_ORDERS_FAILED }
};

export function removePreviousOrder(order_id) {
    console.log(order_id);
    return {type:constants.REMOVE_PREVIOUS_ORDER,payload:{order_id}};
}

export function removeOrder(order_id){
    console.log(order_id);
    return {type:constants.REMOVE_ORDER,payload:{order_id}};
}