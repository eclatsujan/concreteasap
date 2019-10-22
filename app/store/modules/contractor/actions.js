import * as types from './constants'
import {UPDATEUSER} from '../user/constants'
import {userService} from '../../../services/userService'

import * as SecureStore from 'expo-secure-store';
import navigationHelper from "../../../helpers/navigationHelper";

import * as appActions from '../app/actions'
import * as errorActions from '../error/actions'

export const register = (user) => {
    return dispatch => {
        dispatch(appActions.loading());
        userService.register(user).then((res)=>{
            // console.log(res);
            SecureStore.setItemAsync("user_token",res.access_token);
            dispatch({
                type: UPDATEUSER,
                payload: {
                    loggedIn: true,
                    userId: user.email,
                    secureToken:res.access_token,
                    roles:res.roles
                }
            });
            navigationHelper.navigate('AuthLoading');
        }).catch((e)=>{
            dispatch(errorActions.setError("There is an issue occured","contractor_registration",e));
            dispatch(appActions.loading(false));
        });

    }
}
