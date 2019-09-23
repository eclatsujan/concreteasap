import config from '../config';
import * as SecureStore from 'expo-secure-store';
import {getToken,handleResponse} from '../helpers/token';
export const orderService = {
    submitForm,
    getAllOrder
};



async function submitForm(orderData){ //submiting the orderform
	let token=await getToken();  
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+token },
        body: JSON.stringify(orderData)
    };    
    return fetch('https://concreteasap.herokuapp.com/api/contractor/order/concrete', requestOptions).then(handleResponse);
}

async function getAllOrder(){
	let token=await getToken();  
	const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+token},
        // body: JSON.stringify(orderData)
    };
    return fetch('https://concreteasap.herokuapp.com/api/contractor/order/concrete', requestOptions).then(handleResponse);
}