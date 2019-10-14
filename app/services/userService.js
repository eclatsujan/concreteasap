import {AUTH_PREFIX_URI,USER_PREFIX_URI} from '../config';
import * as SecureStore from 'expo-secure-store';
import {getToken,handleResponse} from '../helpers/token';
export const userService = {
    login,
    logout,
    register,
    getUser,
    saveUserDeviceId
};



function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: {Accept: 'application/json','Content-Type': 'application/json'},
        body: JSON.stringify({email:email,password: password})
    };

    return fetch(AUTH_PREFIX_URI+'login',requestOptions).then(handleResponse);
}

function logout(){
    
}

function register(data) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    return fetch(AUTH_PREFIX_URI+'register', requestOptions).then(handleResponse);
}

async function getUser(token) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+token },
        // body: JSON.stringify(token)
    };
    
    return await fetch(AUTH_PREFIX_URI+'me', requestOptions).then(handleResponse);
}

async function saveUserDeviceId(deviceId){
    let token=await getToken();  
    // console.log(COMMON_USER_URI+'save_device');
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+token },
        body: JSON.stringify({"device_id":deviceId})
    };

    return await fetch(USER_PREFIX_URI+'save_device', requestOptions).then(handleResponse);

}


