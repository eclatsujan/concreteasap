import {call, put, fork, takeLeading,takeEvery, takeLatest, delay, take, race} from 'redux-saga/effects'
import * as constants from './constants';
import * as actions from './actions';
import * as appActions from '../../app/actions';
import {orderService} from "../../../../services/orderService";
import {normalizedOrderData} from "../../../schemas";
import {setOrderLoading} from "../actions";
import navigationHelper from "../../../../helpers/navigationHelper";
import moment from "moment";

function* fetchPendingOrders() {
    while(true){
        try {
            const data = yield call(() => {
                return orderService.getContractorOrders().then((res) => {
                    return normalizedOrderData(res);
                });
            });
            yield put(actions.requestPendingOrdersSuccess(data));
        } catch (err) {
            console.log(err);
            yield put(actions.requestPendingOrdersError());
        }
        yield put(appActions.loading(false));
        yield delay(10000);
    }
}

export function* fetchOrders() {
    while(true){
        let action=yield take(constants.FETCH_PENDING_ORDERS);
        yield race({
            task:call(fetchPendingOrders,action),
            cancel:take(constants.STOP_FETCH_PENDING_ORDERS)
        });
    }
    // const data = yield take(constants.FETCH_PENDING_ORDERS);
    // yield takeEvery(constants.FETCH_PENDING_ORDERS,fetchPendingOrders);
}

function* processArchiveOrder(action){
    const {order_id}=action.payload;
    try{
        const data=yield call(()=>{
            return orderService.archiveOrder(order_id)
        });
    }
    catch(err){
        // yield put(actions.archiveOrderFailure(order_id));
        // yield put(appActions.loading(false));
    }
}

export function* archivePendingOrder(){
    yield takeEvery(constants.REQUEST_ARCHIVE_ORDER,processArchiveOrder);
}

function* processRejectBid(action){
    const {order_id,bid_id}=action.payload;
    try{
        const data=yield call(()=>{
            return orderService.rejectBid(bid_id);
        });
    }
    catch(err){

    }
}

export function* rejectBid(action){
    yield takeEvery(constants.REQUEST_REMOVE_BID,processRejectBid);
}

function* processAcceptBid(action){
    const {bid_id,payment_method,date_delivery}=action.payload;
    try{
        yield put(appActions.loading());
        const data=yield call(()=>{
            return orderService.acceptBid(bid_id,payment_method);
        });
        if(date_delivery===moment().format("YYYY-MM-DD")){
            navigationHelper.resetNavigation('pourDayList',"Today's Orders");
        }
        else{
            navigationHelper.resetNavigation('Accepted Order List','Accepted Orders');
        }

    }
    catch(err){
        console.log(err);
    }
}

export function* acceptBid(){
    yield takeEvery(constants.REQUEST_ACCEPT_BID,processAcceptBid);
}

export function* getAllOrders() {
    yield [fetchOrders(),archivePendingOrder(),rejectBid(),acceptBid()];
}




