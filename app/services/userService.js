import {Platform} from 'react-native';
import {AUTH_PREFIX_URI, COMMON_PREFIX_URI, USER_PREFIX_URI} from '../config';
import * as SecureStore from 'expo-secure-store';
import {getToken} from '../helpers/token';
import {handleResponse} from '../helpers/httpHandler'

export const userService = {
    login,
    logout,
    register,
    getUser,
    saveUserDeviceId,
    resetPassword,
    removeUserDeviceId,
    changePasswordWithToken,
    getNotifications,
    markAsRead,
    loadUserProfile,
    editUserDetail
};


function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({email: email, password: password})
    };

    return fetch(AUTH_PREFIX_URI + 'login', requestOptions).then(handleResponse);
}

function logout() {

}

function register(data, photo) {

    let form_data=getFormData(data,photo);
    console.log(form_data);
    const requestOptions = {
        method: 'POST',
        // headers: {'Content-Type': 'application/json'},
        body: form_data
    };
    return fetch(AUTH_PREFIX_URI + 'register', requestOptions).then(handleResponse);
}

async function getUser(token) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': "application/json", 'Authorization': 'Bearer ' + token},
        // body: JSON.stringify(token)
    };

    return await fetch(AUTH_PREFIX_URI + 'me', requestOptions).then(handleResponse);
}

async function loadUserProfile() {
    let token = await getToken();
    return getUser(token);
}

async function editUserDetail(user_detail,photo) {
    let token = await getToken();
    let form_data=getFormData(user_detail,photo);
    console.log(form_data);
    const requestOptions = {
        method: 'POST',
        headers: {'Authorization': 'Bearer ' + token},
        body:form_data
    };
    return await fetch(COMMON_PREFIX_URI + 'user/update', requestOptions).then(handleResponse);
}

async function saveUserDeviceId(deviceId) {
    let token = await getToken();
    // console.log(COMMON_USER_URI+'save_device');
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
        body: JSON.stringify({"device_id": deviceId})
    };

    return await fetch(USER_PREFIX_URI + 'save_device', requestOptions).then(handleResponse);

}

async function removeUserDeviceId() {
    let token = await getToken();
    // console.log(COMMON_USER_URI+'save_device');
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}
    };

    return await fetch(USER_PREFIX_URI + 'remove_device', requestOptions).then(handleResponse);
}

async function resetPassword(email) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"email": email})
    };

    return await fetch(AUTH_PREFIX_URI + 'get_reset_token', requestOptions).then(handleResponse);
}


async function changePasswordWithToken(email, token, password, password_confirmation) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, token, password, password_confirmation})
    };
    return await fetch(AUTH_PREFIX_URI + 'reset_password', requestOptions).then(handleResponse);
}

async function getNotifications() {
    let token = await getToken();

    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
    };

    return await fetch(USER_PREFIX_URI + 'notifications', requestOptions).then(handleResponse);
}

async function markAsRead(notification_id) {
    let token = await getToken();
    const requestOptions = {
        method: "POST",
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
        body: JSON.stringify({notification_id})
    };
    return await fetch(USER_PREFIX_URI + 'mark_read', requestOptions).then(handleResponse);
}


function getFormData(data,photo){

    const editProfileData=new FormData();
    console.log(typeof photo==="undefined");
    console.log(photo);
    if(typeof photo==="object"&&photo!==null){
        editProfileData.append("photo", {
            name: !photo.fileName ? "prof-image" : photo.fileName,
            type: "image/jpeg",
            uri:
                Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
        });
    }

    Object.keys(data).forEach(key => {
        editProfileData.append(key, data[key]);
    });

    return editProfileData;
}