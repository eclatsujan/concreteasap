import * as types from './constants'
import {UPDATEUSER} from '../user/constants'
import {userService} from '../../../services/userService'

import * as SecureStore from 'expo-secure-store';

import navigationHelper from '../../../helpers/navigationHelper';

import * as appActions from '../app/actions'

export const register = (user) => {
  return (dispatch) => {
  	userService.register(user).then((res)=>{

      SecureStore.setItemAsync("user_token",res.access_token);
      
      dispatch({ //towards its reducer
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
       // console.log(e);
       // dispatch(appActions.loading(false));
    });
  }
}
