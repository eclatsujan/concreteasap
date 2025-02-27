import {CONTRACTOR_PREFIX_URI, REP_PREFIX_URI} from '../config';

import {getToken} from '../helpers/token';
import {handleResponse} from '../helpers/httpHandler'

export const orderService = {
    createOrder,
    modifyOrder,
    contractorCancelOrder,
    contractorConfirmOrderDelivery,
    contractorCompleteOrder,
    getContractorOrders,
    getContractorAcceptedOrders,
    archiveOrder,
    acceptBid,
    rejectBid,
    getBiddingAllOrders,
    getRepPendingOrders,
    getRepAcceptedOrders,
    repCancelOrder,
    updateBidPaymentMethod,
    repReleaseOrder,
    getAllDayOfPour,
    sendOrderMessage,
    sendOrderMessageStatus,
    getPreviousOrders,
    markAsPaid
};

//Common Function
async function contractorCancelOrder(order_id) {
    let token = await getToken();
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
        body: JSON.stringify({order_id})
    };
    return fetch(CONTRACTOR_PREFIX_URI + 'order/cancelOrder', requestOptions).then(handleResponse);
}

async function contractorConfirmOrderDelivery(order_id) {
    let token = await getToken();
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
        body: JSON.stringify({order_id})
    };
    return fetch(CONTRACTOR_PREFIX_URI + 'order/confirmOrderDelivery', requestOptions).then(handleResponse);
}

async function contractorCompleteOrder(order_review) {
    let token = await getToken();
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
        body: JSON.stringify(order_review)
    };
    return fetch(CONTRACTOR_PREFIX_URI + 'order/completeOrder', requestOptions).then(handleResponse);
}

//Contractor Services

async function createOrder(orderData) { //submiting the orderform
    let token = await getToken();
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
        body: JSON.stringify(orderData)
    };
    return fetch(CONTRACTOR_PREFIX_URI + 'order/concrete', requestOptions).then(handleResponse);
}

async function modifyOrder(orderData) {
    let token = await getToken();
    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
        body: JSON.stringify(orderData)
    };
    return fetch(CONTRACTOR_PREFIX_URI + 'order/concrete', requestOptions).then(handleResponse);
}

async function getContractorOrders() {
    let token = await getToken();
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}
    };
    return fetch(CONTRACTOR_PREFIX_URI + 'order/concrete', requestOptions).then(handleResponse);
}

async function getContractorAcceptedOrders() {
    let token = await getToken();
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}
    };
    return fetch(CONTRACTOR_PREFIX_URI + 'order/get_accepted_orders', requestOptions).then(handleResponse);
}


async function acceptBid(bid_id, payment_method) {
    let token = await getToken();
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
        body: JSON.stringify({bid_id, payment_method})
    };
    return fetch(CONTRACTOR_PREFIX_URI + 'order/accept', requestOptions).then(handleResponse);
}

async function rejectBid(bid_id) {
    let token = await getToken();
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
        body: JSON.stringify({bid_id})
    };
    return fetch(CONTRACTOR_PREFIX_URI + 'order/reject', requestOptions).then(handleResponse);
}

async function archiveOrder(order_id) {
    let token = await getToken();
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
        body: JSON.stringify({order_id})
    };
    return fetch(CONTRACTOR_PREFIX_URI + 'order/archiveOrder', requestOptions).then(handleResponse);
}

async function getAllDayOfPour() {
    let token = await getToken();
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}
    };
    return fetch(CONTRACTOR_PREFIX_URI + 'order/getAllDayOfPour', requestOptions).then(handleResponse);
}

//Rep Orders

//Request all orders from contractor to bid
async function getBiddingAllOrders() {
    let token = await getToken();
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}
    };
    return fetch(REP_PREFIX_URI + 'orders', requestOptions).then(handleResponse);
}


async function getRepPendingOrders() {
    let token = await getToken();
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
        // body: JSON.stringify(orderData)
    };
    return fetch(REP_PREFIX_URI + 'pending_orders', requestOptions).then(handleResponse);
}

async function getRepAcceptedOrders() {
    let token = await getToken();
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
        // body: JSON.stringify({bid_id})
    };
    return fetch(REP_PREFIX_URI + 'accepted_orders', requestOptions).then(handleResponse);
}

async function updateBidPaymentMethod(bid_id, payment_method) {
    let token = await getToken();
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
        body: JSON.stringify({bid_id, payment_method})
    };
    return fetch(REP_PREFIX_URI + 'updatePaymentMethod', requestOptions).then(handleResponse);
}

async function repCancelOrder(order_id) {
    let token = await getToken();
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
        body: JSON.stringify({order_id})
    };
    return fetch(REP_PREFIX_URI + 'cancel_order', requestOptions).then(handleResponse);
}

async function repReleaseOrder(bid_id) {
    let token = await getToken();
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
        body: JSON.stringify({bid_id})
    };
    return fetch(REP_PREFIX_URI + 'release_order', requestOptions).then(handleResponse);
}

async function sendOrderMessage(order_id, quantity) {
    let token = await getToken();
    let value = {order_id, quantity};
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
        body: JSON.stringify(value)
    };
    return fetch(CONTRACTOR_PREFIX_URI + 'order/messageOrder', requestOptions).then(handleResponse);
}

async function sendOrderMessageStatus(message_id, status) {
    let token = await getToken();
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
        body: JSON.stringify({message_id, status})
    };
    return fetch(CONTRACTOR_PREFIX_URI + "order/updateMessageStatus", requestOptions).then(handleResponse);
}

async function getPreviousOrders() {
    let token = await getToken();
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}
    };
    return fetch(CONTRACTOR_PREFIX_URI + "orders/previous", requestOptions).then(handleResponse);
}

async function markAsPaid(order_id) {
    let token = await getToken();
    const requestOptions = {
        method: "POST",
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
        body:JSON.stringify({order_id})
    };
    return fetch(CONTRACTOR_PREFIX_URI + "order/markPaid", requestOptions).then(handleResponse);
}