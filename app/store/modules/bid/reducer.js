import { PLACE_ORDER } from './constants'

const initialState = {
    bids: [],
};

export default (state=initialState, action) => {
    switch(action.type){
        // case PLACE_ORDER:
        // return Object.assign({}, state, action.payload)
        default:
            return state
    }
}