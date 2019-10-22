import { AppState, app } from './app'
import { UserState, user } from './user'
import {ContractorState,contractor} from './contractor'
import {RepState,rep} from './rep'
import {OrderState,order} from './order'
import {bid} from './bid'
import {error} from './error'

/**
 * Root states.
 */
export const States = {
  user,app,contractor,rep,bid,error
}

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
  error:error.reducer
}

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
  error:error.actions
}

export { user }
