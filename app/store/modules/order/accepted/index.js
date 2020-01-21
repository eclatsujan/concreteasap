import {pendingReducer,pendingDefaultState} from './reducer'
import * as pendingActions from './actions'

//combining the reducer and actions of the order
export const actions=pendingActions;
export const reducer=pendingReducer;
export const defaultState=pendingDefaultState;