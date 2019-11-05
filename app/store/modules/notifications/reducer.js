import {SET_LOADING} from './constants'
import * as Immutable from "immutable";

export const defaultState = Immutable.Map({
    loading: false
});

export const reducer= (state, action) => {
    switch (action.type) {
        case SET_LOADING:
            let newState=state.set("loading", action.payload);
            console.log(action.payload);
            return newState;
        default:
            return state;
    }
}