import {app} from './app'
import {user} from './user'
import {contractor} from './contractor'
import {rep} from './rep'
import {order} from './order'
import {bid} from './bid'
import {error} from './error'
import {notifications} from './notifications'

// import * as pendingSaga from './orders/sagas';
import * as pendingSaga from './order/pending/sagas';

import {all, fork} from 'redux-saga/effects'
import * as pending_order from "./order/pending";

/**
 * Root states.
 */
export const States = {
    app: app.defaultState,
    alert: app.defaultState,
    user: user.defaultState,
    contractor: contractor.defaultState,
    rep: rep.defaultState,
    bid: bid.defaultState,
    error: error.defaultState,
    order: order.defaultState,
    pending_order:order.pending_order.defaultState,
    notifications: notifications.defaultState
};


/**
 * Root reducers.
 */
export const reducers = {
    app: app.reducer,
    alert: app.reducer,
    user: user.reducer,
    contractor: contractor.reducer,
    rep: rep.reducer,
    order: order.reducer,
    pending_order:order.pending_order.reducer,
    bid: bid.reducer,
    error: error.reducer,
    notifications: notifications.reducer
};
/**
 * Root actions.
 */
export const actions = {
    app: app.actions,
    alert: alert.actions,
    user: user.actions,
    contractor: contractor.actions,
    rep: rep.actions,
    order: order.actions,
    pending_order:order.pending_order.actions,
    bid: bid.actions,
    error: error.actions,
    notifications: notifications.actions
};

export function* rootSaga() {
    yield all([
        ...Object.values(pendingSaga)
    ].map(fork));
}

export {user}
