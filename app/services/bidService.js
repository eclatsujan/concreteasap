import {REP_PREFIX_URI} from '../config';
import * as SecureStore from 'expo-secure-store';
import {getToken} from '../helpers/token';
import {handleResponse} from '../helpers/httpHandler'
export const bidService = {
    placeBid,
    getRepBidOrders,
    getRepAcceptedBids,
    getRepPendingBids,
    getRepPreviousBids,
    placeMessagePrice
};


//Rep Functions
async function placeBid(bidData){ //submiting the orderform
    let token=await getToken();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+token },
        body: JSON.stringify(bidData)
    };
    return fetch(REP_PREFIX_URI+'bid', requestOptions).then(handleResponse);
}

//Get all order that could be bid
async function getRepBidOrders(){
    let token=await getToken();
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+token}
    };
    return fetch(REP_PREFIX_URI+'orders', requestOptions).then(handleResponse);
}

//Get all bids that are pending
async function getRepPendingBids(){
    let token=await getToken();
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+token},
        // body: JSON.stringify(orderData)
    };
    return fetch(REP_PREFIX_URI+'pending_orders', requestOptions).then(handleResponse);
}


async function getRepAcceptedBids(){
    let token=await getToken();
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+token}
    };
    return fetch(REP_PREFIX_URI+'bid/accepted_order', requestOptions).then(handleResponse);
}

//Get all previous bids of rep
async function getRepPreviousBids(){
    let token=await getToken();
    const requestOptions={
        method:'GET',
        headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+token },
    };
    return fetch(REP_PREFIX_URI+"bid/previous_order",requestOptions).then(handleResponse);
}

async function placeMessagePrice(price,order_id){
    let token=await getToken();
    const requestOptions={
        method:'POST',
        headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+token },
        body: JSON.stringify({price,order_id})
    };
    return fetch(REP_PREFIX_URI+"order/setMessagePrice",requestOptions).then(handleResponse);
}
