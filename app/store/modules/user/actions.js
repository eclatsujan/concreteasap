import * as types from './constants'
import {userService} from '../../../services/userService'

import * as SecureStore from 'expo-secure-store';

import * as appActions from '../app/actions'
import * as errorActions from '../error/actions'

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
    return async dispatch => {
        dispatch(appActions.loading());
        userService.login(email,password).then((res)=>{
          console.log(res);
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
            dispatch(appActions.loading(false));
            dispatch(errorActions.setError(e));
        });

    }
}

export const register = (user) => {
  return (dispatch) => {
    dispatch(appActions.loading());
  	userService.register(user).then((res)=>{
      let roles=res.roles.length!==0?res.roles[0]["name"]:"";

      if(roles!==""){
        console.log(res);
          SecureStore.setItemAsync("user_token",res.access_token);
          SecureStore.setItemAsync("user_role",roles);
          dispatch({
              type: types.LOGIN,
              payload: {
                  loggedIn: true,
                  userId: res.email,
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
      dispatch(appActions.loading(false));
      dispatch(errorActions.setError("There is an issue occured",e));
      // dispatch(errorActions.setError(e,"Register Rep Screen"));
       // console.log(e);
    });
  }
}

export const update = (user)=>{
  return (dispatch) => {
  	userService.register(user).then((res)=>{

      SecureStore.setItemAsync("user_token",res.access_token);

      dispatch({ //towards its reducer
          type: UPDATE_USER,
          payload: {
            loggedIn: true,
            userId: user.email,
            secureToken:res.access_token,
            roles:res.roles
          }
      });

      navigationHelper.navigate('AuthLoading');

    }).catch((e)=>{
       console.log(e);
    });
  }
}

export const resetPassword=(email)=>{
  return (dispatch) => {
    dispatch(appActions.loading());
    userService.resetPassword(email).then((res)=>{
      navigationHelper.navigate('Reset Password Token',{
        "email":email
      });
      dispatch(appActions.loading(false));
    }).catch((err)=>{
      dispatch(appActions.loading(false));
      dispatch(errorActions.setError(err.message,err.errors));
    });
  }
}

export const changePasswordWithToken=(token,email,password,password_confirmation)=>{
  return (dispatch) => {
    dispatch(appActions.loading());
    userService.changePasswordWithToken(token,email,password,password_confirmation).then((res)=>{
      navigationHelper.navigate('AuthLoading');
      dispatch(appActions.loading(false));
    }).catch((err)=>{
      dispatch(appActions.loading(false));
      dispatch(errorActions.setError(err.message,err.errors));
    });
  }
}

export const updateUserNotificationsToken=(notification)=>{

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
