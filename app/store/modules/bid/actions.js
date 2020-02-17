import {Alert} from 'react-native';
import * as types from './constants'
import {bidService} from '../../../services/bidService'
import {orderService} from "../../../services/orderService";

import * as appActions from '../app/actions'
import * as order from '../order/actions'

import navigationHelper from '../../../helpers/navigationHelper';
import {PUSH_BIDS} from "./constants";
import moment from "moment";

export function placeMessagePrice(pricePer, bid_id,message_id) {
    return (dispatch, getState) => {
        dispatch(addMessage(pricePer,bid_id,message_id));
        bidService.placeMessagePrice(pricePer, message_id).then((res) => {
            dispatch(appActions.loading(false));
        }).catch((err) => {
            dispatch(addMessage(0,bid_id,message_id));
            console.log(err);
            dispatch(appActions.loading(false));
        });
    };
}


export const getRepAcceptedBids = () => {
    return (dispatch, getState) => {
        bidService.getRepAcceptedBids().then((res) => {
            dispatch(pushBids("accepted_bids",res));
            dispatch(appActions.loading(false));
        }).catch((err) => {
            console.log(err);
            dispatch(appActions.loading(false));
        });
    }
};

export const getRepPendingBids = () => {
    return (dispatch) => {
        bidService.getRepPendingBids().then((res) => {
            dispatch(pushBids("pending_bids", res));
            dispatch(appActions.loading(false));
        }).catch((err) => {
            dispatch(appActions.loading(false));
        });
    }
};

export const getRepBidOrders = () => {
    return (dispatch, getState) => {
        let isLoading = getState().get("bid").get("bid_orders").get("isLoading");
        if (!isLoading) {
            dispatch(setLoadState("bid_orders", true));
            bidService.getRepBidOrders().then((res) => {
                dispatch(pushBids("bid_orders", res["data"], res["current_page"], res["last_page"], res["total"]));
                dispatch(appActions.loading(false));
                dispatch(setLoadState("bid_orders", false));
            }).catch((err) => {
                dispatch(appActions.loading(false));
                dispatch(setLoadState("bid_orders", false));
            });
        }

    }
};

// export const get
export const getRepPreviousBids = () => {
    return (dispatch, getState) => {
        bidService.getRepPreviousBids().then((res) => {
            if(res["data"]?.length>0){
                res["data"]=res["data"].map((bid)=>{
                    let date=moment(bid["date_delivery"]);
                    let order_id=typeof bid?.order ==="undefined"?"":bid?.order?.id;
                    bid["custom_id"]=order_id+"-"+date.format("MM")+"-"+date.format("YY");
                    return bid;
                });
            }
            dispatch(pushBids("previous_bids", res["data"], res["current_page"], res["last_page"], res["total"]));
            dispatch(appActions.loading(false));
        }).catch((err) => {
            dispatch(appActions.loading(false));
        });
    }
};

export const setLoadState = (collectionName, isLoading) => {
    return (dispatch) => {
        dispatch({
            type: types.SET_LOADSTATE,
            payload: {
                collectionName,
                isLoading
            }
        });
    }
};

export const placeBid = (order_id) => {
    return (dispatch) => {
        dispatch(appActions.loading(true));
        dispatch({
            type: types.PLACE_BID,
            payload: {
                order_id
            }
        })
    }
};

export const addMessage = (price,bid_id,message_id) => {
    return (dispatch) => {
        dispatch({
            type: types.ADD_MESSAGE_PRICE,
            payload: {
                price,
                message_id,
                bid_id
            }
        });
    }
};

function pushBids(collectionName, data = [], current_page = 0, last_page = 0, total = 0) {
    return {
        type: types.PUSH_BIDS,
        payload: {
            collectionName,
            data,
            current_page,
            last_page,
            total
        }
    }
}