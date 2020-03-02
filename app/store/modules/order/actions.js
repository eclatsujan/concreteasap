import {Alert} from 'react-native';
import * as types from './constants'
import {orderService} from '../../../services/orderService'

import * as appActions from '../app/actions';
import navigationHelper from '../../../helpers/navigationHelper';
import * as httpHandler from '../../../helpers/httpHandler';

// import actions from "redux-formValues/lib/actions";
import {normalizedOrderData} from "../../schemas";

import {pending} from '../orders';

import * as pendingActions from "./pending/actions";
import {app} from "../app";
import moment from "moment";

export const pendingOrder=pendingActions;


export function getAllDayOfPour() {
    return (dispatch,getState) => {
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
            navigationHelper.resetNavigation('ViewOrderHome',"I Need Concrete",0,
                {message: res["message"]});
            dispatch(appActions.loading(false));
        }).catch((err) => {
            console.log(err);
            Alert.alert("Server Error", "There is some issue in the server");
            dispatch(appActions.loading(false));
        });
    }
};

export const modifyOrder = (order,order_type="accepted_orders") => {
    return (dispatch) => {
        dispatch(appActions.loading(true));
        orderService.modifyOrder(order).then((res) => {
            dispatch({
               type:types.MODIFY_ORDER,
               payload:{
                   order,
                   order_type
               }
            });
            navigationHelper.resetNavigation( "DayOfPour", "dayofPourStack",0,{
                order_id: order["order_id"],
                message: res.message,
                order_type
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
        setOrderLoading(true,"pending_orders");
        dispatch({
            type:types.ARCHIVE_ORDER,
            payload:{
                order_id
            }
        });
        orderService.archiveOrder(order_id).then((res)=>{
            dispatch(appActions.loading(false));
            setOrderLoading(false,"pending_orders");
        }).catch((err)=>{
            dispatch(appActions.loading(false));
            Alert.alert("Failed to archive","There is some issue in Server");
        });
    }
};

export const getContractorOrders = () => {
    return (dispatch, getState) => {
        if(!getState().get("order").get("pending_orders").get("isLoading")){
            setOrderLoading(true,"pending_orders");
            orderService.getContractorOrders().then((res) => {
                dispatch({
                    type: types.PENDING_ORDERS,
                    payload: {
                        pending_orders: res
                    }
                });
                setOrderLoading(false,"pending_orders");
                dispatch(appActions.loading(false));
            }).catch((err)=>{
                console.log(err);
                setOrderLoading(false,"pending_orders");
                dispatch(appActions.loading(false));
            });
        }
    }
};

export const acceptBid = (bid_id, payment_method,order_date) => {
    return (dispatch) => {
        dispatch(appActions.loading(true));
        // console.log();
        orderService.acceptBid(bid_id, payment_method).then((res) => {
            if(order_date===moment().format("YYYY-MM-DD")){
                navigationHelper.resetNavigation('pourDayList',"Today's Orders");
            }
            else{
                navigationHelper.resetNavigation('Accepted Order List','Accepted Order');
            }

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
            // console.log(res);
            dispatch({
               type:types.SET_POUR_ORDERS,
               payload:{
                   data:res,
                   // current_page:res["current_page"],
                   // data:res["data"],
                   // last_page:res["last_page"],
                   // total:res["total"],
                   isLoading:false
               }
            });
            dispatch(appActions.loading(false));
        }).catch((err)=>{
            console.log(err);
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

export const contractorCompleteOrder = (order_review,order_type="accepted_orders") => {
    return (dispatch) => {
        dispatch(appActions.loading(true));
        dispatch({
            type:types.COMPLETE_ORDER,
            payload:{
                order_id:order_review["order_id"],
                order_type
            }
        });
        console.log(order_review);
        orderService.contractorCompleteOrder(order_review).then((res) => {
            navigationHelper.navigate("Home");
            dispatch(appActions.loading(false));
        }).catch((err) => {
            appActions.loading(false);
        });
    }
};

export const contractorCancelOrder = (order_id,order_type="accepted_orders") => {
    return (dispatch) => {
        dispatch(appActions.loading(true));
        orderService.contractorCancelOrder(order_id).then((res) => {
            dispatch({
                type:types.CANCEL_ORDER,
                payload:{
                    order_id,
                    order_type
                }
            });
            navigationHelper.navigate('Accepted Order');
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
            // console.log(res);
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
            // navigationHelper.goBack();
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
            console.log(res);
        }).catch((err) => {
            console.log(err);
            dispatch(appActions.loading(false));
        });
    }
}

export function setOrderLoading(isLoading,order_type){
    return (dispatch) => {
        dispatch({
            type:types.LOADING_ORDER,
            payload:{
                order_type,
                isLoading
            }
        });
    }
}

export function sendOrderMessage(order_id,quantity,order_type){
    return async (dispatch) => {
        dispatch(appActions.loading());
        await orderService.sendOrderMessage(order_id,quantity).then((res)=>{
            console.log(res);
            dispatch({
                type:types.ADD_MESSAGE,
                payload:{
                    order_type,
                    order_id,
                    data:res["order_message"]
                }
            });
            navigationHelper.goBack();
            dispatch(appActions.loading(false));
        }).catch((err)=>{
            console.log(err);
            dispatch(appActions.loading(false));
        });
    }
}

export function sendOrderMessageStatus(message_id,status,order_type,order_id){
    return async (dispatch)=>{
        console.log(message_id);
        // dispatch(appActions.loading());
        await orderService.sendOrderMessageStatus(message_id,status).then((res)=>{
            dispatch({
                type:types.UPDATE_STATUS_MESSAGE,
                payload:{
                    order_id,
                    status:status,
                    order_type,
                    message_id
                }
            });
            dispatch(appActions.loading(false));
        }).catch((err)=>{
            console.log(err);
            dispatch(appActions.loading(false));
        });
    }
}


export function getRepPreviousOrders() {
    return undefined;
}

