import {LOGIN, LOGOUT, UPDATE_USER, LOAD_USER_PROFILE} from './constants'

import * as Immutable from 'immutable';

export const defaultState = Immutable.Map({
    loggedIn: false,
    email:"",
    userId: '',
    secureToken: '',
    roles: [],
    detail: {}
});

export const reducer = (state, action) => {
    let newState = [];
    switch (action.type) {
        case LOGIN:
            return state.set("loggedIn", action.payload.loggedIn)
                .set("userId", action.payload.userId)
                .set("email", action.payload.email)
                .set("secureToken", action.payload.secureToken)
                .set("roles", action.payload.roles)
                .set("detail", action.payload.detail);
        case LOGOUT:
            return defaultState;
        case UPDATE_USER:
            return state.set("loggedIn", action.payload.loggedIn)
                .set("userId", action.payload.userId)
                .set("email", action.payload.email)
                .set("secureToken", action.payload.secureToken)
                .set("roles", action.payload.roles)
                .set("detail", action.payload.detail);
        case LOAD_USER_PROFILE:
            newState = state.set("detail", action.payload.detail);
            return newState;
        default:
            return state
    }
};