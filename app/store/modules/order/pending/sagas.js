import {call, put, fork, takeLeading,takeEvery, takeLatest, delay, take, race} from 'redux-saga/effects'
import * as constants from './constants';
import * as actions from './actions';
import * as appActions from '../../app/actions';
import {orderService} from "../../../../services/orderService";
import {normalizedOrderData} from "../../../schemas";
import {setOrderLoading} from "../actions";

function* fetchPendingOrders() {
    try {
        const data = yield call(() => {
            return orderService.getContractorOrders().then((res) => {
                return normalizedOrderData(res);
            });
        });
        yield put(actions.requestPendingOrdersSuccess(data["entities"]));
        yield put(appActions.loading(false));
        yield delay(6000);
    } catch (err) {
        yield put(actions.requestPendingOrdersError());
        yield put(appActions.loading(false));
    }
}

export function* fetchOrders() {
    // const data = yield take(constants.FETCH_PENDING_ORDERS);
    yield takeEvery(constants.FETCH_PENDING_ORDERS,fetchPendingOrders);
}

export function* archiveOrder(order_id){
    try{
        yield put(appActions.loading(true));
        const data=yield call(()=>{
            return orderService.archiveOrder(order_id).then((res)=>{

            });
        });
        yield put(actions.archiveOrder());
        yield put(appActions.loading(false));
    }
    catch(err){

    }
}

export function* getAllOrders() {
    yield [fetchOrders()];
}




