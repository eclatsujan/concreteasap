import {reducer,defaultState} from './reducer'
import * as actions from './actions'

//combining the reducer and actions of the order
export const previous_orders={actions,reducer,defaultState};