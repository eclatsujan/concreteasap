import {COMMON_PREFIX_URI,REP_PREFIX_URI} from '../config';
import {getToken,handleResponse} from '../helpers/token';

export const paymentService = {
    getPaymentToken,
    payBidPrice
};

async function getPaymentToken(){ //submiting the orderform
    let token=await getToken();
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+token },
    };
    return fetch(COMMON_PREFIX_URI+'client/payment_token', requestOptions).then(handleResponse);
}

async function payBidPrice(token,order_id,price,save_details,date_delivery,time_delivery){
    //submiting the orderform
    let user_token=await getToken();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+user_token },
        body: JSON.stringify({token,order_id,price,save_details,date_delivery,time_delivery})
    };
    return fetch(REP_PREFIX_URI+'pay/bid', requestOptions).then(handleResponse).catch((err)=>{
        console.log(err);
    });
}