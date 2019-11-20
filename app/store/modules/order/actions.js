import * as types from './constants'
import {orderService} from '../../../services/orderService'

import * as appActions from '../app/actions';
import navigationHelper from '../../../helpers/navigationHelper';
import * as httpHandler from '../../../helpers/httpHandler';

//common function
export const getSingleAcceptedOrder = (id) => {
    return (dispatch) => {
        dispatch({
            type: types.GET_SINGLE_ACCEPTED_ORDER,
            payload: {
                id
            }
        });
    }
};
////

export const createOrder = (order) => {
    return (dispatch, getState) => {
        dispatch(appActions.loading(true));
        orderService.createOrder(order).then((res) => {
            dispatch({
                type: types.ADD_ORDER,
                payload: {
                    order: order
                }
            });
            navigationHelper.navigate('ViewOrderHome', {message: res.message});
            dispatch(appActions.loading(false));
        }).catch((err) => {
            dispatch(appActions.loading(false));
        });
    }
};

export const modifyOrder = (order) => {
    return (dispatch) => {
        dispatch(appActions.loading(true));
        orderService.modifyOrder(order).then((res)=>{
            navigationHelper.navigate("DayOfPour",{
                order_id:order["order_id"],
                message:res.message
            });
            // navigationHelper.navigate('ViewOrderHome', {message: res.message});
            dispatch(appActions.loading(false));
        }).catch((err)=>{
            console.log(err);
            dispatch(appActions.loading(false));
        });
    };
};

export const getContractorOrders = () => {
    return (dispatch, getState) => {
        dispatch(appActions.loading(true));
        orderService.getContractorOrders().then((res) => {
            dispatch({
                type: types.PENDING_ORDERS,
                payload: {
                    pending_orders: res
                }
            });
            dispatch(appActions.loading(false));
            // dispatch(appActions.loading(false));
        });
    }
};

export const acceptBid = (bid_id, payment_method) => {
    return (dispatch) => {
        dispatch(appActions.loading(true));
        orderService.acceptBid(bid_id, payment_method).then((res) => {
            navigationHelper.navigate('AcceptedOrders');
            // appActions.loading(false);
        }).catch((err) => {
            console.log(err);
            appActions.loading(false);
        });
    }
};

export function rejectBid(bid_id, order_id) {
    return (dispatch) => {
        dispatch(appActions.loading(true));
        orderService.rejectBid(bid_id).then((res) => {
            dispatch({
                type: types.REMOVE_BID,
                payload: {
                    bid_id,
                    order_id
                }
            });
            dispatch(appActions.loading(false));
        }).catch((err) => {
            dispatch(appActions.loading(false));
        });
    }
}

export const getContractorAcceptedOrder = (order) => {
    return (dispatch, getState) => {
        orderService.getContractorAcceptedOrders().then((res) => {
            dispatch(appActions.loading(true));
            dispatch({
                type: types.ACCEPTED_ORDERS,
                payload: {
                    accepted_orders: res
                }
            });
            dispatch(appActions.loading(false));
        });
    }
};

export const getAcceptedOrder = (order_id) => {
    return (dispatch) => {
        dispatch(appActions.loading(true));
        dispatch({
            type: types.GET_SINGLE_ACCEPTED_ORDER,
            payload: {
                order_id
            }
        });
        setTimeout(() => {
            appActions.loading(false)
        }, 1500)
    }
};

export const confirmOrderDelivery = (order_id) => {
    return (dispatch) => {
        dispatch(appActions.loading(true));
        orderService.contractorConfirmOrderDelivery(order_id).then((res) => {
            dispatch(appActions.loading(false));
        }).catch((err) => {
            console.log(err);
            appActions.loading(false);
        });
    }
};

export const contractorCompleteOrder = (order_review) => {
    return (dispatch) => {
        dispatch(appActions.loading(true));
        orderService.contractorCompleteOrder(order_review).then((res) => {
            navigationHelper.navigate('View Order Bids');
            dispatch(appActions.loading(false));
        }).catch((err) => {
            appActions.loading(false);
        });
    }
};

export const contractorCancelOrder = (order_id) => {
    return (dispatch) => {
        dispatch(appActions.loading(true));
        orderService.contractorCancelOrder(order_id).then((res) => {
            navigationHelper.navigate('AcceptedOrders');
            dispatch(appActions.loading(false));
        }).catch((err) => {
            appActions.loading(false);
        });
    }
};

//Contractor Actions

export const getBiddingOrders = () => {
    return (dispatch) => {
        dispatch(appActions.loading(true));
        orderService.getBiddingAllOrders().then((res) => {
            dispatch({
                type: types.BIDDING_ORDERS,
                payload: {
                    bidding_orders: res
                }
            });
            dispatch(appActions.loading(false));
        }).catch((err) => {
            appActions.loading(false);
        });
    }
};

export function getRepAllOrders() {
    return async (dispatch, getState) => {
        dispatch(appActions.loading(true));
        await orderService.getBiddingAllOrders().then((res) => {
            dispatch({
                type: types.PENDING_ORDERS,
                payload: {
                    pending_orders: res
                }
            });
            dispatch(appActions.loading(false));
        }).catch((err) => {
            appActions.loading(false);
        });
    }
}

export const getRepPendingOrder = (order) => {
    return async (dispatch, getState) => {
        dispatch(appActions.loading(true));
        await orderService.getRepPendingOrders().then((res) => {
            dispatch({
                type: types.PENDING_ORDERS,
                payload: {
                    pending_orders: res
                }
            });
            dispatch(appActions.loading(false));
        }).catch((err) => {
            console.log(err);
            appActions.loading(false);
        });
    }
};

export const getRepAcceptedOrders = () => {
    return async (dispatch) => {
        dispatch(appActions.loading(true));
        await orderService.getRepAcceptedOrders().then((res) => {
            dispatch({
                type: types.ACCEPTED_ORDERS,
                payload: {
                    accepted_orders: res
                }
            });
            dispatch(appActions.loading(false));
        }).catch((err) => {
            dispatch(appActions.loading(false));
        });
    }
};

export function repCancelOrder(order_id) {
    return async (dispatch) => {
        dispatch(appActions.loading());
        await orderService.repCancelOrder(order_id).then((res) => {
            navigationHelper.goBack();
        }).catch((err) => {
            console.log(err);
            dispatch(appActions.loading(false));
        });
    }
}


export function updatePaymentType(bid_id, payment_type) {
    return async (dispatch) => {
        dispatch(appActions.loading());
        await orderService.updateBidPaymentMethod(bid_id, payment_type).then((res) => {
            navigationHelper.goBack();
        }).catch((err) => {
            console.log(err);
            dispatch(appActions.loading(false));
        });
    }
}
