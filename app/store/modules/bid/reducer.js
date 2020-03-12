import {PREVIOUS_BIDS, SET_LOADSTATE, OPEN_BIDS, PUSH_BIDS, PLACE_BID, ADD_MESSAGE_PRICE,UPDATE_ACCEPTED_STATUS} from './constants'

import * as Immutable from 'immutable';

export const defaultState = Immutable.Map({
    pending_bids: Immutable.Map({
        last_page: 0,
        current_page: 0,
        total: 0,
        data: Immutable.List([]),
        isLoading: false
    }),
    bid_orders: Immutable.Map({
        last_page: 0,
        current_page: 0,
        total: 0,
        data: Immutable.List([]),
        isLoading: false
    }),
    accepted_bids: Immutable.Map({
        last_page: 0,
        current_page: 0,
        total: 0,
        data: Immutable.List([]),
        isLoading: false
    }),
    previous_bids: Immutable.Map({
        last_page: 0,
        current_page: 0,
        total: 0,
        data: Immutable.List([]),
        isLoading: false
    })
});

export const reducer = (state, action) => {
    let new_state, index;
    switch (action.type) {
        case OPEN_BIDS:
            return state;
        case SET_LOADSTATE:
            return state.setIn([action.payload["collectionName"], "isLoading"], action.payload.isLoading);
        case PUSH_BIDS:
            let current_page = state.get(action.payload["collectionName"]).get("current_page");
            let current_state = state;
            let data = Immutable.fromJS(action.payload.data);

            if (current_page !== action.payload.current_page) {
                current_state = state.updateIn([action.payload["collectionName"], "data"], (val) => {
                    // return val;
                    return val.concat(Immutable.fromJS(action.payload.data));
                });
            } else {
                current_state = state.setIn([action.payload["collectionName"], "data"], data);
            }
            current_state = current_state.updateIn([action.payload["collectionName"], "current_page"], (val) => {
                return action.payload.current_page;
            });
            current_state = current_state.updateIn([action.payload["collectionName"], "total"], (val) => {
                return action.payload.total;
            });
            current_state = current_state.updateIn([action.payload["collectionName"], "last_page"], (val) => {
                return action.payload.last_page;
            });
            return current_state;
        case ADD_MESSAGE_PRICE:
            let index = state.get("accepted_bids").get("data").findIndex((bid) => {
                return bid.get("id") === action.payload.bid_id;
            });
            let message_index = state.getIn(["accepted_bids","data",index,"order","message"]).findIndex((message) => {
                return message.get("id") === action.payload.message_id;
            });
            return state.updateIn(["accepted_bids","data",index,"order","message",message_index,"price"],(message)=>{
                return action.payload.price;
            });
        case UPDATE_ACCEPTED_STATUS:
            let accepted_index = state.get("accepted_bids").get("data").findIndex((bid) => {
                return bid.get("id") === action.payload.bid_id;
            });
            return state.updateIn(["accepted_bids","data",accepted_index,"order","status"],(status)=>{
                return action.payload.status;
            });
        case PLACE_BID:
            let order_id = action.payload.order_id;
            return state;
        default:
            return state
    }
};