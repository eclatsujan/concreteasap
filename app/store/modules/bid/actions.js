import * as types from './constants'
import {bidService} from '../../../services/bidService'
import {orderService} from "../../../services/orderService";

import navigationHelper from '../../../helpers/navigationHelper';

export const place_order = (bidData) => {
    return dispatch => {
        bidService.placeBid(bidData).then((res)=>{

        });
    }
}

export const placeBid = (data) => {
    console.log("rep place bid",data);
    return (dispatch,getState) => {
        bidService.placeBid(data).then((res)=>{
            navigationHelper.navigate('Bid Message',{message:res.message});
        });
    }
}