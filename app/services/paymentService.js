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

async function payBidPrice(payment_token,order_id,totalPrice,save_details){ //submiting the orderform
    let token=await getToken();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+token },
        body: JSON.stringify({"token":payment_token,"order_id":order_id,"price":totalPrice,"save_details":save_details})
    };
    return fetch(REP_PREFIX_URI+'pay/bid', requestOptions).then(handleResponse).catch((err)=>{
        console.log(err);
    });
}