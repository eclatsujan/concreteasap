import * as types from './constants'
import {userService} from '../../../services/userService'

import * as SecureStore from 'expo-secure-store';

import * as appActions from '../app/actions'

import navigationHelper from '../../../helpers/navigationHelper';

export const loadUserState = (token) =>{
    return dispatch => {
        return userService.getUser(token).then((res)=>{
            dispatch({
                type:types.UPDATEUSER,
                payload:{
                    userId:res.email,
                    roles:res.roles,
                    loggedIn:true,
                    secureToken:token,
                }
            });
        });
    }
}

/**
 * Sign in.
 * @param {string} username
 * @param {string} password
 */
export const login = (email, password) => {
    return dispatch => {
        dispatch(appActions.loading());
        userService.login(email,password).then((res)=>{
            let roles=res.roles.length!==0?res.roles[0]["name"]:"";
            if(roles!==""){
                SecureStore.setItemAsync("user_token",res.access_token);
                SecureStore.setItemAsync("user_role",roles);
                dispatch({
                    type: types.LOGIN,
                    payload: {
                        loggedIn: true,
                        userId: email,
                        secureToken:res.access_token,
                        roles:res.roles
                    }
                });
                navigationHelper.navigate('AuthLoading');
            }
            else{
                throw "Please contact our Server to verify this user";
                //Handle Server issue or no user roles
            }
        }).catch((e)=>{
            console.log(e);
            dispatch(appActions.loading(false));
        });

    }
}

export const updateUserState = (userState) =>{
    return {
        type:types.UPDATEUSER,
        payload:userState
    }
}

/**
 * Sign out.
 */
export const logout = () => {
    // direct/sync call
    return {
        type: types.LOGOUT
    }
}


export const initState = () => {

}
