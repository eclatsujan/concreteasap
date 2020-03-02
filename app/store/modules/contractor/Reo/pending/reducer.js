import * as Immutable from 'immutable';

export const defaultState = Immutable.Map({
    orders:[],
    current_page:1,
    last_page:1
});

export const reducer=(state, action) => {
    switch(action.type){
        // case PLACE_ORDER:
        // return Object.assign({}, state, action.payload)
        default:
            return state
    }
}