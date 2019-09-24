import {AUTH_PREFIX_URI} from '../config';
import * as SecureStore from 'expo-secure-store';
import {getToken,handleResponse} from '../helpers/token';
export const userService = {
    login,
    logout,
    register,
    getUser,
    // submitForm,
    // getAll,
    // getById,
    // update,
    // delete: _delete
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


