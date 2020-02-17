import { call, put, takeLeading, takeLatest,delay,take,race } from 'redux-saga/effects'
import * as constants from './constants';
import * as actions from './actions';
import * as appActions from '../../app/actions';
import {orderService} from "../../../../services/orderService";
import {normalizedOrderData} from "../../../schemas";

function* fetchAcceptedOrders(){
    try{
        const data=yield call(()=>{
            return orderService.getContractorAcceptedOrders().then((res)=>{
                return normalizedOrderData(res);
            });
        });
        yield put(actions.requestAcceptedOrdersSuccess(data["entities"]));
        yield put(appActions.loading(false));
        yield delay(6000);
    }
    catch(err){
        console.log(err);
        yield put(actions.requestAcceptedOrdersError());
        yield put(appActions.loading(false));
    }
}

export default function* fetchOrders() {
    while(true){
        const data = yield take(constants.FETCH_ACCEPTED_ORDERS);
        yield race({
            task:call(fetchAcceptedOrders),
            cancel:constants.REQUEST_ACCEPTED_ORDERS_FAILED,
        });
    }
}

export function* getAllOrders() {
    // yield take(actions.requestPendingOrders());

    yield [fetchOrders()];
}




