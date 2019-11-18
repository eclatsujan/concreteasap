import { app } from './app'
import { user } from './user'
import {contractor} from './contractor'
import {rep} from './rep'
import {order} from './order'
import {bid} from './bid'
import {error} from './error'
import {notifications} from './notifications'

/**
 * Root states.
 */
export const States = {
  app:app.defaultState,
  user:user.defaultState,
  contractor:contractor.defaultState,
  rep:rep.defaultState,
  bid:bid.defaultState,
  error:error.defaultState,
  order:order.defaultState,
  notifications:notifications.defaultState
};

/**
 * Root reducers.
 */
export const reducers = {
  app: app.reducer,
  user: user.reducer,
  contractor:contractor.reducer,
  rep:rep.reducer,
  order:order.reducer,
  bid:bid.reducer,
  error:error.reducer,
  notifications:notifications.reducer
};

/**
 * Root actions.
 */
export const actions = {
  app: app.actions,
  user: user.actions,
  contractor: contractor.actions,
  rep:rep.actions,
  order:order.actions,
  bid:bid.actions,
  error:error.actions,
  notifications:notifications.actions
};

export { user }
