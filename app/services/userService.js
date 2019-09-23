import config from '../config';
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

    return fetch('https://concreteasap.herokuapp.com/api/auth/login',requestOptions).then(handleResponse);
}

function logout(){
    
}

function register(data) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    return fetch('https://concreteasap.herokuapp.com/api/auth/register', requestOptions).then(handleResponse);
}

async function getUser(token) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+token },
        // body: JSON.stringify(token)
    };
    
    return await fetch('https://concreteasap.herokuapp.com/api/auth/me', requestOptions).then(handleResponse);
}


