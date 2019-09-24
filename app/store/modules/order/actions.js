import * as types from './constants'
import {userService} from '../../../services/userService'
import {orderService} from '../../../services/orderService'

import navigationHelper from '../../../helpers/navigationHelper';

export const createOrder = (order) => {
  // console.log("Data from action",order);
  return (dispatch,getState) => {    
    orderService.submitForm(order).then((res)=>{
      navigationHelper.navigate('ViewOrderHome',{message:res.message});
    });  
  }
}

export const getUserOrders = () => {
  return (dispatch,getState) => {
    orderService.getUserOrders().then((res)=>{
      // console.log(res);
      dispatch({
        type: types.ORDER_ALL,
        payload:{
          orders:res
        }
      });
    });
  }
}

export const getAllOrder = (order) => {
  return (dispatch,getState) => {    
    orderService.getAllOrders().then((res)=>{
      // console.log(res);
      dispatch({
        type: types.ORDER_ALL,
        payload:{
          orders:res
        }
      });
    });  
  }
}




