import { call, put, takeLeading, takeLatest,delay,take,race } from 'redux-saga/effects'
import * as constants from './constants';
import * as actions from './actions';
import * as appActions from '../../app/actions';
import {orderService} from "../../../../services/orderService";
import {normalizedOrderData} from "../../../schemas";

function* fetchPendingOrders(){
    try{
        const data=yield call(()=>{
            return orderService.getContractorOrders().then((res)=>{
                return normalizedOrderData(res);
            });
        });
        yield put(actions.requestPendingOrdersSuccess(data["entities"]));
        yield put(appActions.loading(false));
        yield delay(6000);
    }
    catch(err){
        console.log(err);
        yield put(actions.requestPendingOrdersError());
        yield put(appActions.loading(false));
    }
}

export default function* fetchOrders() {
    while(true){
        const data = yield take(constants.FETCH_PENDING_ORDERS);
        yield race({
            task:call(fetchPendingOrders),
            cancel:constants.REQUEST_PENDING_ORDERS_FAILED,

        });
    }
}

export function* getAllOrders() {
    // yield take(actions.requestPendingOrders());

    yield [fetchOrders()];
}




