import * as types from './constants'
import {userService} from '../../../services/userService'
import {orderService} from '../../../services/orderService'

import * as appActions from '../app/actions';
import navigationHelper from '../../../helpers/navigationHelper';

export function rejectBid(bid_id) {
    return (dispatch) => {
        dispatch(appActions.loading(true));
        orderService.rejectBid(bid_id).then((res) => {
            dispatch({
                type: types.REMOVE_BID,
                payload:{
                    bid_id:bid_id
                }
            });
        }).catch((err) => {
            dispatch(appActions.loading(false));
        })
    }
}


export const createOrder = (order) => {
    return (dispatch, getState) => {
        dispatch(appActions.loading(true));
        orderService.submitForm(order).then((res) => {
            dispatch({
                type:types.ADD_ORDER,
                payload:{
                    order:order
                }
            });
            navigationHelper.navigate('ViewOrderHome', {message: res.message});
            dispatch(appActions.loading(false));
        }).catch((err) => {
            console.log(err);
            dispatch(appActions.loading(false));
        });
    }
};

export const getUserOrders = () => {
    return (dispatch, getState) => {
        dispatch(appActions.loading(true));
        orderService.getUserOrders().then((res) => {
            dispatch({
                type: types.ORDER_ALL,
                payload: {
                    orders: res
                }
            });
            dispatch(appActions.loading(false));
            // dispatch(appActions.loading(false));
        });
    }
};

export const getAllOrder = (order) => {
    return (dispatch, getState) => {
        orderService.getAllOrders().then((res) => {
            dispatch(appActions.loading(true));
            dispatch({
                type: types.ORDER_ALL,
                payload: {
                    orders: res
                }
            });
            dispatch(appActions.loading(false));
        });
    }
};

export const getPendingOrder = (order) => {
    return (dispatch, getState) => {
        dispatch(appActions.loading(true));
        orderService.getPendingOrders().then((res) => {
            dispatch({
                type: types.PENDING_ORDERS,
                payload: {
                    pending_orders: res
                }
            });
            dispatch(appActions.loading(false));
        }).catch((err)=>{
            appActions.loading(false);
        });
    }
};

export const acceptBid = (bid_id) => {
    return (dispatch) => {
        dispatch(appActions.loading(true));
        orderService.acceptBid(bid_id).then((res) => {
            navigationHelper.navigate('AcceptedOrders');
            appActions.loading(false);
        }).catch((err) => {
            appActions.loading(false);

        });
    }
};

export const getAcceptedOrder = () => {
    return (dispatch) => {
        dispatch(appActions.loading(true));
        orderService.getAcceptedOrders().then((res) => {
            dispatch({
                type: types.ACCEPTED_ORDERS,
                payload: {
                    accepted_orders: res
                }
            });

        }).catch((err) => {
            appActions.loading(false);
        });
    }
};

export const getSingleOrder = (order_id) => {
    return (dispatch) => {
        dispatch(appActions.loading(true));
        orderService.getAcceptedOrders().then((res) => {
            dispatch({
                type: types.SINGLE_ORDER,
                payload: {
                    order_id
                }
            });
            dispatch(appActions.loading(false));
        }).catch((err) => {
            appActions.loading(false);
        });
    }
};
