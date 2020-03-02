import {call, put, takeEvery, delay, take, race,select} from 'redux-saga/effects'
import * as constants from "./constants";
import * as actions from './actions';
import * as appActions from '../../../app/actions';
import navigationHelper from "../../../../../helpers/navigationHelper";

function* requestPlaceReoOrder(action){
   try{
        yield put(appActions.loading(true));
        let data=yield call(()=>{

        });
        // yield put(navigationHelper.navigate(""))
        yield put(appActions.loading(false));
    }
    catch(err){
        console.log(err);
        // yield put(actions.removeNotificationFailure(notification_id));
    }

}

export function* placeReoOrder(){
    yield takeEvery(constants.PLACE_REO_ORDER,requestPlaceReoOrder);
}

export function* reoPendingActions(){
    yield [placeReoOrder];
}