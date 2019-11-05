import {CONTRACTOR_PREFIX_URI, REP_PREFIX_URI} from '../config';

import {getToken,handleResponse} from '../helpers/token';
export const orderService = {
    submitForm,
    getContractorPendingOrders,
    getContractorAcceptedOrders,
    acceptBid,
    rejectBid,
    getBiddingAllOrders,
    getRepPendingOrders,
    getRepAcceptedOrders,

};

//Contractor Services

async function submitForm(orderData){ //submiting the orderform
    let token=await getToken();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+token },
        body: JSON.stringify(orderData)
    };
    return fetch(CONTRACTOR_PREFIX_URI+'order/concrete', requestOptions).then(handleResponse);
}

async function getContractorPendingOrders(){
	let token=await getToken();
	const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+token},
        // body: JSON.stringify(orderData)
    };
    return fetch(CONTRACTOR_PREFIX_URI+'order/concrete', requestOptions).then(handleResponse);
}

async function getContractorAcceptedOrders(){
    let token=await getToken();
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+token},
        // body: JSON.stringify({bid_id})
    };
    return fetch(CONTRACTOR_PREFIX_URI+'order/get_accepted_orders', requestOptions).then(handleResponse);
}


async function acceptBid(bid_id){
    let token=await getToken();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+token},
        body: JSON.stringify({bid_id})
    };
    return fetch(CONTRACTOR_PREFIX_URI+'order/accept', requestOptions).then(handleResponse);
}

async function rejectBid(bid_id){
    let token=await getToken();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+token},
        body: JSON.stringify({bid_id})
    };
    return fetch(CONTRACTOR_PREFIX_URI+'order/reject', requestOptions).then(handleResponse);
}

//Rep Orders

//Request all orders from contractor to bid
async function getBiddingAllOrders(){
    let token=await getToken();
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+token},
        // body: JSON.stringify(orderData)
    };
    return fetch(REP_PREFIX_URI+'orders', requestOptions).then(handleResponse);
}

async function getRepPendingOrders(){
    let token=await getToken();
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+token},
        // body: JSON.stringify(orderData)
    };
    return fetch(REP_PREFIX_URI+'pending_orders', requestOptions).then(handleResponse);
}

async function getRepAcceptedOrders(){
    let token=await getToken();
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+token},
        // body: JSON.stringify({bid_id})
    };
    return fetch(REP_PREFIX_URI+'accepted_orders', requestOptions).then(handleResponse);
}