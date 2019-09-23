import * as types from './constants'
import {UPDATEUSER} from '../user/constants'
import {userService} from '../../../services/userService'

import * as SecureStore from 'expo-secure-store';

// export const createOrder = (order) => {
//   return dispatch => {
//     userService.submitForm(order).then((res)=>{
//       console.log(res);
//       dispatch({
//           type: UPDATEUSER,
//           payload: {
//             loggedIn: true,
//             // message: res,
//           }
//       });
//     });  
//   }
// }

export const register = (user) => {
    return dispatch => {
        userService.register(user).then((res)=>{
            // console.log(res);
            SecureStore.setItemAsync("user_token",res.access_token);
            dispatch({
                type: UPDATEUSER,
                payload: {
                    loggedIn: true,
                    userId: user.email,
                    secureToken:res.access_token,
                }
            });
        }).catch((e)=>{
            console.log(e);
            // dispatch(appActions.loading(false));
        });
    }
}



