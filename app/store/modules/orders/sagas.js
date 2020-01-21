import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import * as constants from './constants';
import * as actions from './actions';
import {orderService} from "../../../services/orderService";
import {normalizedOrderData} from "../../schemas";


function* fetchOrdersAsync()  {
    try{
        yield put(actions.requestOrders());
        const data=yield call(()=>{
            return orderService.getContractorOrders().then((res)=>{
                return normalizedOrderData(res);
            });
        });
        yield put(actions.requestOrdersSuccess(data));
    }
    catch(err){
        console.log(err);
        yield put(actions.requestOrdersError());
    }

}

export function* getAllOrders() {
    yield takeLatest(constants.FETCH_ORDERS, fetchOrdersAsync);
}


