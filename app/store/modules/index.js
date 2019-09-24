import { AppState, app } from './app'
import { UserState, user } from './user'
import {ContractorState,contractor} from './contractor'
import {RepState,rep} from './rep'
import {OrderState,order} from './order'
import {bid} from './bid'
/**
 * Root states.
 */
export const States = {
  user,app,contractor,rep,bid
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
  bid:bid.reducer
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
  bid:bid.actions
}

export { user }