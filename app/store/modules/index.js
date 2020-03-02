import {app} from './app'
import {user} from './user'
// import {contractor} from './contractor'
import {rep} from './rep'
import {order} from './order'
import {bid} from './bid'
import {error} from './error'
import {notifications} from './notifications'
import {previous_orders} from './previous_orders';
import {reo} from './contractor/Reo';

// import * as pendingSaga from './orders/sagas';
import * as pendingSaga from './order/pending/sagas';
import * as notificationSaga from './notifications/sagas';
import * as previousOrderSaga from './previous_orders/sagas';

//Reo Orders
import * as pendingOrderSaga from './previous_orders/sagas'

import * as reoPendingSagas from './contractor/Reo/pending/sagas'


import {all, fork} from 'redux-saga/effects'
import * as pending_order from "./order/pending";

/**
 * Root states.
 */
export const States = {
    app: app.defaultState,
    alert: app.defaultState,
    user: user.defaultState,
    // contractor: contractor.defaultState,
    rep: rep.defaultState,
    bid: bid.defaultState,
    error: error.defaultState,
    order: order.defaultState,
    pending_order:order.pending_order.defaultState,
    notifications: notifications.defaultState,
    previous_orders:previous_orders.defaultState
};


/**
 * Root reducers.
 */
export const reducers = {
    app: app.reducer,
    alert: app.reducer,
    user: user.reducer,
    // contractor: contractor.reducer,
    rep: rep.reducer,
    order: order.reducer,
    pending_order:order.pending_order.reducer,
    bid: bid.reducer,
    error: error.reducer,
    notifications: notifications.reducer,
    previous_orders:previous_orders.reducer
};
/**
 * Root actions.
 */
export const actions = {
    app: app.actions,
    alert: alert.actions,
    user: user.actions,
    // contractor: contractor.actions,
    rep: rep.actions,
    order: order.actions,
    pending_order:order.pending_order.actions,
    previous_orders:previous_orders.actions,
    bid: bid.actions,
    error: error.actions,
    notifications: notifications.actions,
    reo:reo.actions
};

export function* rootSaga() {
    yield all([
        ...Object.values(pendingSaga),
        ...Object.values(notificationSaga),
        ...Object.values(previousOrderSaga),
        ...Object.values(pendingOrderSaga),
        ...Object.values(reoPendingSagas)
    ].map(fork));
}

export {user}
