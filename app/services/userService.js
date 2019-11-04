import {Platform} from 'react-native';
import {AUTH_PREFIX_URI,USER_PREFIX_URI} from '../config';
import * as SecureStore from 'expo-secure-store';
import {getToken,handleResponse} from '../helpers/token';
export const userService = {
    login,
    logout,
    register,
    getUser,
    saveUserDeviceId,
    resetPassword,
    removeUserDeviceId,
    changePasswordWithToken
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

function register(data,photo) {

    const form_data=new FormData();
    // if(photo){
    //   form_data.append("photo", {
    //     name: !photo.fileName?"prof-image":photo.fileName,
    //     type: photo.type,
    //     uri:
    //       Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    //   });
    //   Object.keys(data).forEach(key => {
    //     form_data.append(key, data[key]);
    //   });
    // }
    // console.log(form_data);
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

async function removeUserDeviceId(){
  let token=await getToken();
  // console.log(COMMON_USER_URI+'save_device');
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+token }
  };

  return await fetch(USER_PREFIX_URI+'remove_device', requestOptions).then(handleResponse);
}

async function resetPassword(email){
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({"email":email})
  };

  return await fetch(AUTH_PREFIX_URI+'get_reset_token', requestOptions).then(handleResponse);
}


async function changePasswordWithToken(token,email,password,password_confirmation){
  const requestOptions={
    method:'POST',
    headers: { 'Content-Type': 'application/json'},
    body:JSON.stringify({email,token,password,password_confirmation})
  }
  return await fetch(AUTH_PREFIX_URI+'reset_password', requestOptions).then(handleResponse);
}
