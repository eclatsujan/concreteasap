import {Alert} from 'react-native';
import * as types from './constants'
import {bidService} from '../../../services/bidService'
import {orderService} from "../../../services/orderService";

import * as appActions from '../app/actions'
import * as order from '../order/actions'

import navigationHelper from '../../../helpers/navigationHelper';
import {PUSH_BIDS} from "./constants";


export const getRepAcceptedBids = () => {
    return (dispatch,getState) => {
        // console.log(getState().get("bids"));
        // dispatch(setLoadState(true));
        bidService.getRepAcceptedBids().then((res) => {
            dispatch(pushBids("accepted_bids", res["data"], res["current_page"], res["last_page"], res["total"]));
            dispatch(appActions.loading(false));
            // dispatch(setLoadState(false));
        }).catch((err) => {
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
    return (dispatch,getState) => {
        let isLoading=getState().get("bid").get("bid_orders").get("isLoading");
        if(!isLoading){
            dispatch(setLoadState("bid_orders",true));
            bidService.getRepBidOrders().then((res) => {
                dispatch(pushBids("bid_orders", res["data"], res["current_page"], res["last_page"], res["total"]));
                dispatch(appActions.loading(false));
                dispatch(setLoadState("bid_orders",false));
            }).catch((err) => {
                // Alert.alert("Issue","Some issue occured while rendering data");
                dispatch(appActions.loading(false));
                dispatch(setLoadState("bid_orders",false));
            });
        }

    }
};

// export const get
export const getRepPreviousBids = () => {
    return (dispatch,getState) => {

        // dispatch(setLoadState("previous_bids",true));
        bidService.getRepPreviousBids().then((res) => {
            // console.log(res);
            dispatch(pushBids("previous_bids", res["data"], res["current_page"], res["last_page"], res["total"]));
            dispatch(appActions.loading(false));
            // dispatch(setLoadState("previous_bids",false));
        }).catch((err) => {
            // console.log(err);
            // Alert.alert("Issue","Some issue occured while rendering data");
            dispatch(appActions.loading(false));
        });
    }
};

export const setLoadState= (collectionName,isLoading) =>{
    return (dispatch) => {
        dispatch({
            type:types.SET_LOADSTATE,
            payload:{
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
            type:types.PLACE_BID,
            payload:{
                order_id
            }
        })
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