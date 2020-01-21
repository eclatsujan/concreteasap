import {reducer,defaultState} from './reducer'
import * as actions from './actions'

import * as pending_order from './pending';

import {all,fork} from "redux-saga/effects";

//combining the reducer and actions of the order
export const order = {pending_order,reducer,actions,defaultState};