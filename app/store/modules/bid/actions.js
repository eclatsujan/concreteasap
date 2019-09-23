import * as types from './constants'
import {bidService} from '../../../services/bidService'

export const place_order = (bidData) => {
    return dispatch => {
        bidService.placeBid(bidData).then((res)=>{

        });
    }
}