import * as constants from "./constants";


export const archiveOrder =  (order_id) => {
    return {type:constants.REQUEST_ARCHIVE_ORDER,payload:{order_id}};
};

export function archiveOrderSuccess(order_id) {
    return {type:constants.REQUEST_PENDING_ORDERS_SUCCESS,payload:{order_id}}
}


export function archiveOrderFailure(order_id) {
    return {type:constants.REQUEST_ARCHIVE_ORDER_FAILED,payload:{order_id}}
}

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


export const requestRejectBid = (bid_id,bid_order_id) => {
    return {type:constants.REQUEST_REMOVE_BID,payload:{bid_id,bid_order_id}}
};

export const rejectBidSuccess = (data) => {
    return { type: constants.REQUEST_PENDING_ORDERS_SUCCESS, payload:{orders: data}}
};

export const rejectBidFailed = () => {
    return {type:constants.REQUEST_PENDING_ORDERS_FAILED,payload:{}}
};

export const requestAcceptBid=(bid_id,payment_method,date_delivery)=>{
    return {type:constants.REQUEST_ACCEPT_BID,payload:{bid_id,payment_method,date_delivery}}
};

export function stopFetchingPreviousOrders() {
    return {type:constants.STOP_FETCH_PENDING_ORDERS}
}
