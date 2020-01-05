import * as types from './constants'
import {userService} from '../../../services/userService'

import * as SecureStore from 'expo-secure-store';

import * as appActions from '../app/actions'
import * as errorActions from '../error/actions'

import navigationHelper from '../../../helpers/navigationHelper';

export const loadUserState = (token) => {
    return dispatch => {
        return userService.getUser(token).then((res) => {
            dispatch({
                type: types.UPDATE_USER,
                payload: {
                    userId: res.email,
                    roles: res.roles,
                    loggedIn: true,
                    secureToken: token,
                    email: res.email,
                    detail: res.detail
                }
            });
        });
    }
};

export const updateUserState = (userState) => {
    return {
        type: types.UPDATE_USER,
        payload: {
            userId: userState.email,
            email: userState.email,
            roles: userState.roles,
            loggedIn: true,
            secureToken: userState.token,
            detail: userState.detail
        }
    }
};


export const getUserProfile = () => {
    return dispatch => {
        dispatch(appActions.loading());
        return userService.loadUserProfile().then((res) => {
            dispatch({
                type: types.LOAD_USER_PROFILE,
                payload: {
                    detail: res.detail
                }
            });
            dispatch(appActions.loading(false));
        }).catch((err) => {
            console.log(err);
            dispatch(appActions.loading(false));
        })
    }
};

export const editUserDetail = (user_detail,photo) => {
    return dispatch => {
        dispatch(appActions.loading());
        return userService.editUserDetail(user_detail,photo).then((res) => {
            navigationHelper.navigate("My Profile", {});
            // dispatch(appActions.loading(false));
        }).catch((err) => {
            console.log(err);

            dispatch(appActions.loading(false));
        });
    }
};

/**
 * Sign in.
 * @param {string} username
 * @param {string} password
 */
export const login = (email, password) => {
    return async dispatch => {
        dispatch(appActions.loading());
        userService.login(email, password).then((res) => {

            let roles = res.roles.length !== 0 ? res.roles[0]["name"] : "";
            if (roles !== "") {
                SecureStore.setItemAsync("user_token", res["access_token"]);
                SecureStore.setItemAsync("user_role", roles);
                dispatch({
                    type: types.LOGIN,
                    payload: {
                        loggedIn: true,
                        userId: email,
                        email,
                        secureToken: res["access_token"],
                        roles: res.roles
                    }
                });
                navigationHelper.navigate('AuthLoading');
            } else {
                throw "Please contact our Server to verify this user";
                //Handle Server issue or no user roles
            }
        }, (err) => {
            // console.log(err);
            dispatch(errorActions.setError(err.message));
            dispatch(appActions.loading(false));
        });

    }
};

export const register = (user, photo) => {
    return (dispatch) => {
        dispatch(appActions.loading());
        userService.register(user, photo).then((res) => {
            let roles = res.roles.length !== 0 ? res.roles[0]["name"] : "";

            if (roles !== "") {
                SecureStore.setItemAsync("user_token", res.access_token);
                SecureStore.setItemAsync("user_role", roles);
                dispatch({
                    type: types.LOGIN,
                    payload: {
                        loggedIn: true,
                        userId: res.email,
                        secureToken: res.access_token,
                        roles: res.roles
                    }
                });
                navigationHelper.navigate('AuthLoading');
                dispatch(appActions.loading(false));
            } else {
                throw "Please contact our Server to verify this user";
                //Handle Server issue or no user roles
            }
        }).catch((err) => {
            // console.log(err);
            dispatch(errorActions.setError(err.message, err.errors));

            dispatch(appActions.loading(false));
        });
    }
};

export const update = (user) => {
    return (dispatch) => {
        userService.register(user).then((res) => {

            SecureStore.setItemAsync("user_token", res.access_token);

            dispatch({ //towards its reducer
                type: UPDATE_USER,
                payload: {
                    loggedIn: true,
                    userId: user.email,
                    secureToken: res.access_token,
                    roles: res.roles
                }
            });

            navigationHelper.navigate('AuthLoading');

        }).catch((e) => {
            // console.log(e);
        });
    }
}

export const resetPassword = (email) => {
    return (dispatch) => {
        dispatch(appActions.loading());
        userService.resetPassword(email).then((res) => {
            navigationHelper.navigate('Reset Password Token', {
                "email": email
            });
            dispatch(appActions.loading(false));
        }).catch((err) => {
            dispatch(appActions.loading(false));
            dispatch(errorActions.setError(err.message, err.errors));
        });
    }
}

export const changePasswordWithToken = (email, token, password, password_confirmation) => {
    return (dispatch) => {
        dispatch(appActions.loading());
        userService.changePasswordWithToken(email, token, password, password_confirmation).then((res) => {
            navigationHelper.navigate('AuthLoading');
            dispatch(appActions.loading(false));
        }).catch((err) => {
            console.log(err);
            dispatch(appActions.loading(false));
            // console.log(err.message);
            dispatch(errorActions.setError(err.message, err.errors));
        });
    }
};

export const updateUserNotificationsToken = (notification) => {

};


/**
 * Sign out.
 */
export const logout = () => {
    // direct/sync call
    return {
        type: types.LOGOUT
    }
};


export const initState = () => {

}
