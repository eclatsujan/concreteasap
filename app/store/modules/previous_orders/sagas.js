import {call, put, takeEvery, delay, take, race,select} from 'redux-saga/effects'
import * as constants from './constants';
import * as actions from './actions';
import * as appActions from '../app/actions';
import {normalizedOrderData} from "../../schemas";
import {orderService} from "../../../services/orderService";

function* fetchPreviousOrders(action) {
    while(true){
        try {
            // yield put
            let data = yield call(() => {
                return orderService.getPreviousOrders();

            });
            // console.log("stop");
            data=yield(normalizedOrderData(data));
            yield put(actions.requestPreviousOrdersSuccess(data));
            yield put(appActions.loading(false));
        } catch (err) {
            // yield put(actions.requestNotificationsError());
            yield put(appActions.loading(false));
        }
        yield delay(10000);
    }

}

export function* fetchPreviousOrder() {
    while(true){
        let action=yield take(constants.FETCH_PREVIOUS_ORDERS);
        yield race({
            task:call(fetchPreviousOrders,action),
            cancel:take(constants.STOP_FETCH_PREVIOUS_ORDERS)
        });
    }
}

function *archiveOrderRequest(action){
    const {order_id}=action.payload;
    try{
        yield put(actions.removeOrder(order_id));
        let data=yield call(()=>{
            return orderService.archiveOrder(order_id);
        });

    }
    catch(err){
        console.log(err);

    }

}

export function* archiveOrder(){
    yield takeEvery(constants.REMOVE_PREVIOUS_ORDER,archiveOrderRequest);
}


export function* previousOrderSagas() {
    yield [fetchPreviousOrder(),archiveOrder()];
}




