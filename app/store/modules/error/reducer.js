import {SET_ERROR} from './constants'
import {REMOVE_ERROR} from './constants'

import * as Immutable from 'immutable';

export const defaultState = Immutable.Map({
    error_msg: "",
    errors: Immutable.List([])
});

export const reducer=(state, action) => {
    switch (action.type) {
        case SET_ERROR:
            console.log(action.payload.error_msg);
            return state.set("error_msg",action.payload.error_msg).setIn(["errors"], Immutable.fromJS(action.payload.errors));
        case REMOVE_ERROR:
            return defaultState;
        default:
            return state
    }
}
