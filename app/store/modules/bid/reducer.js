import { PLACE_ORDER } from './constants'

import * as Immutable from 'immutable';

export const defaultState = Immutable.Record({
        bids: []
});

export const reducer= (state=bidState, action) => {
    switch(action.type){
        // case PLACE_ORDER:
        // return Object.assign({}, state, action.payload)
        default:
            return state
    }
};