import {call, put, fork, takeLeading,takeEvery, takeLatest, delay, take, race,select} from 'redux-saga/effects'
import * as constants from './constants';
import * as actions from './actions';
import * as appActions from '../app/actions';
import {normalizedNotificationData} from "../../schemas";
import {userService} from "../../../services/userService";
import {acc} from "react-native-reanimated";

function* fetchPendingNotifications(action) {
    while(true){
        try {
            let data = yield call(() => {
                return userService.getNotifications();

            });
            data= yield(normalizedNotificationData(data));
            if(Object.keys(data["result"]).length>0){
                data["result"]=data["result"].sort((a,b)=>{
                    let date1=Date.parse(data["entities"]["notifications"][a]?.date);
                    let date2=Date.parse(data["entities"]["notifications"][b]?.date);
                    return date2-date1;
                });
            }
            yield put(actions.requestNotificationsSuccess(data));
            yield put(appActions.loading(false));
        } catch (err) {
            yield put(actions.requestNotificationsError());
            yield put(appActions.loading(false));
        }
        yield delay(10000);
    }

}

export function* fetchNotifications() {
    while(true){
        const state=yield select();
        // console.log(state.getIn(["notifications","polling"]));
        let action=yield take(constants.FETCH_NOTIFICATIONS);
        yield race({
            task:call(fetchPendingNotifications,action),
            cancel:take(constants.STOP_FETCH_NOTIFICATIONS)
        });
    }
    // yield takeLatest(constants.FETCH_NOTIFICATIONS,fetchPendingNotifications);
}

function* notificationMarkAsRead(action){
    const {notification_id}=action.payload;
    try{
        yield put(actions.removeNotificationSuccess(notification_id));
        yield call(()=>{
            return userService.markAsRead(notification_id).then((res)=>{
                console.log(res);
            });
        });
    }
    catch(err){
        console.log(err);
        yield put(actions.removeNotificationFailure(notification_id));
    }
}

export function* markAsRead(){
    yield takeEvery(constants.REMOVE_NOTIFICATION,notificationMarkAsRead);
    // yield call(notificationMarkAsRead,action);
}

export function* getAllNotification() {
    yield [fetchNotifications(),markAsRead()];
}




