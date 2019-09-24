import {REP_PREFIX_URI} from '../config';
import * as SecureStore from 'expo-secure-store';
import {getToken,handleResponse} from '../helpers/token';
export const bidService = {
    placeBid
};

async function placeBid(bidData){ //submiting the orderform
    let token=await getToken();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+token },
        body: JSON.stringify(bidData)
    };
    return fetch(REP_PREFIX_URI+'bid', requestOptions).then(handleResponse);
}

