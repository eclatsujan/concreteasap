import {CONTRACTOR_PREFIX_URI, REP_PREFIX_URI} from '../config';

import {getToken,handleResponse} from '../helpers/token';
export const orderService = {
    submitForm,
    getUserOrders,
    getAllOrders,
};



async function submitForm(orderData){ //submiting the orderform
	let token=await getToken();  
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+token },
        body: JSON.stringify(orderData)
    };    
    return fetch(CONTRACTOR_PREFIX_URI+'order/concrete', requestOptions).then(handleResponse);
}

async function getUserOrders(){
	let token=await getToken();  
	const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+token},
        // body: JSON.stringify(orderData)
    };
    return fetch(CONTRACTOR_PREFIX_URI+'order/concrete', requestOptions).then(handleResponse);
}

async function getAllOrders(){
    let token=await getToken();
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+token},
        // body: JSON.stringify(orderData)
    };
    return fetch(REP_PREFIX_URI+'orders', requestOptions).then(handleResponse);
}
