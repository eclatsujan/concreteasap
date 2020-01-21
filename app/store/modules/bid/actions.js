import {Alert} from 'react-native';
import * as types from './constants'
import {bidService} from '../../../services/bidService'
import {orderService} from "../../../services/orderService";

import * as appActions from '../app/actions'
import * as order from '../order/actions'

import navigationHelper from '../../../helpers/navigationHelper';
import {PUSH_BIDS} from "./constants";

export function placeMessagePrice(pricePer, order_id) {
    return (dispatch, getState) => {
        bidService.placeMessagePrice(pricePer, order_id).then((res) => {
            navigationHelper.goBack();

            dispatch(appActions.loading(false));
        }).catch((err) => {
            console.log(err);
            dispatch(appActions.loading(false));
        });
    };
}


export const getRepAcceptedBids = () => {
    return (dispatch, getState) => {
        bidService.getRepAcceptedBids().then((res) => {
            dispatch(pushBids("accepted_bids", res["data"], res["current_page"], res["last_page"], res["total"]));
            dispatch(appActions.loading(false));
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

export const addMessage = (price) => {
    return (dispatch) => {
        dispatch({
            type: types.ADD_MESSAGE,
            payload: {
                price,

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