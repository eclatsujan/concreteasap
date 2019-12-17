import {Alert} from 'react-native';
import * as types from './constants'
import {orderService} from '../../../services/orderService'

import * as appActions from '../app/actions';
import navigationHelper from '../../../helpers/navigationHelper';
import * as httpHandler from '../../../helpers/httpHandler';

import actions from "redux-form/lib/actions";

export function getAllDayOfPour() {
    return (dispatch) => {
        orderService.getAllDayOfPour().then((res)=>{
            dispatch({
                type:types.SET_POUR_ORDERS,
                payload:{
                    pour_orders:res
                }
            });
            dispatch(appActions.loading(false));
        }).catch((err)=>{
            dispatch(appActions.loading(false));
        });
    }
}


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
            dispatch(actions["destroy"]("placeOrder"));
            navigationHelper.resetNavigation('ViewOrderHome',"Place Order Request",0,
                {message: res["message"]});
            dispatch(appActions.loading(false));
        }).catch((err) => {
            Alert.alert("Server Error", "There is some issue in the server");
            dispatch(appActions.loading(false));
        });
    }
};

export const modifyOrder = (order) => {
    return (dispatch) => {
        dispatch(appActions.loading(true));
        orderService.modifyOrder(order).then((res) => {
            dispatch(actions["destroy"]("placeOrder"));
            dispatch({
               type:types.MODIFY_ORDER,
               payload:{
                   order,
                   order_type:"pour_orders"
               }
            });
            navigationHelper.resetNavigation( "DayOfPour", "dayofPourStack",0,{
                order_id: order["order_id"],
                message: res.message
            });

            dispatch(appActions.loading(false));
        }).catch((err) => {
            console.log(err);
            dispatch(appActions.loading(false));
        });
    };
};

export const archiveOrder = (order_id) => {
    return (dispatch) => {
        orderService.archiveOrder(order_id).then((res)=>{
            dispatch({
                type:types.ARCHIVE_ORDER,
                payload:{
                    order_id
                }
            });
            dispatch(appActions.loading(false));
        }).catch((err)=>{
            console.log(err);
            dispatch(appActions.loading(false));
            Alert.alert("Failed to archive","There is some issue in Server");
        });
    }
};

export const getContractorOrders = () => {
    return (dispatch, getState) => {
        orderService.getContractorOrders().then((res) => {
            dispatch({
                type: types.PENDING_ORDERS,
                payload: {
                    pending_orders: res
                }
            });
            dispatch(appActions.loading(false));
            // dispatch(appActions.loading(false));
        }).catch((err)=>{
            dispatch(appActions.loading(false));
        });
    }
};

export const acceptBid = (bid_id, payment_method) => {
    return (dispatch) => {
        dispatch(appActions.loading(true));
        orderService.acceptBid(bid_id, payment_method).then((res) => {
            navigationHelper.navigate('AcceptedOrders');
        }).catch((err) => {
            console.log(err);
            appActions.loading(false);
        });
    }
};

export function rejectBid(bid_id, order_id) {
    return (dispatch) => {
        dispatch(appActions.loading(true));
        dispatch({
            type: types.REMOVE_BID,
            payload: {
                bid_id,
                order_id
            }
        });
        orderService.rejectBid(bid_id).then((res) => {
            dispatch(appActions.loading(false));
        }).catch((err) => {
            dispatch(appActions.loading(false));
        });
    }
}

export const getContractorAcceptedOrder = (order) => {
    return (dispatch, getState) => {
        orderService.getContractorAcceptedOrders().then((res) => {
            dispatch({
                type: types.ACCEPTED_ORDERS,
                payload: {
                    data: res
                }
            });
            dispatch(appActions.loading(false));
        }).catch((err) => {
            dispatch(appActions.loading(false));
        });
    }
};

export const getContractorAllPour = () => {
    return (dispatch,getState) => {
        orderService.getAllDayOfPour().then((res)=>{
            dispatch({
               type:types.SET_POUR_ORDERS,
               payload:{
                   current_page:res["current_page"],
                   data:res["data"],
                   last_page:res["last_page"],
                   total:res["total"],
                   isLoading:false
               }
            });
            dispatch(appActions.loading(false));
        }).catch((err)=>{
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
        dispatch({
            type:types.COMPLETE_ORDER,
            payload:{
                order_id:order_review["order_id"]
            }
        });
        orderService.contractorCompleteOrder(order_review).then((res) => {
            navigationHelper.navigate('ViewOrderBids');
            dispatch(appActions.loading(false));
        }).catch((err) => {
            console.log(err);
            appActions.loading(false);
        });
    }
};

export const contractorCancelOrder = (order_id) => {
    return (dispatch) => {
        dispatch(appActions.loading(true));
        orderService.contractorCancelOrder(order_id).then((res) => {
            dispatch({
                type:types.CANCEL_ORDER,
                payload:{
                    order_id
                }
            });
            navigationHelper.navigate('AcceptedOrders');
        }).catch((err) => {
            console.log(err);
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
                    bidding_orders: res["data"]
                }
            });
            delete res["data"];
            dispatch(appActions.loading(false));
        }).catch((err) => {
                appActions.loading(false);
        });
    }
};

//Pay Order

export const payOrder = (order_id) => {
    return (dispatch) => {
        dispatch({
            type:types.PAY_ORDER,
            payload:{
                order_id
            }
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

export function repReleaseOrder(bid_id) {
    return async (dispatch) => {
        dispatch(appActions.loading());
        await orderService.repReleaseOrder(bid_id).then((res) => {

        }).catch((err) => {
            dispatch(appActions.loading(false));
        });
    }
}


export function getRepPreviousOrders() {
    return undefined;
}