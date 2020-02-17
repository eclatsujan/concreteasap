import {acceptedReducer,acceptedDefaultState} from './reducer'
import * as acceptedActions from './actions'

//combining the reducer and actions of the order
export const actions=acceptedActions;
export const reducer=acceptedReducer();
export const defaultState=acceptedDefaultState;