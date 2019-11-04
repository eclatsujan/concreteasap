import {
  createStore as _createStore,
  applyMiddleware,
    compose
} from 'redux'

import {
  combineReducers
} from 'redux-immutable';

import * as Immutable from 'immutable';

import thunk from 'redux-thunk';

import { reducer as formReducer } from 'redux-form/immutable';

import { reducers, actions,States } from './modules'

// import compose from 'redux/lib/compose';

const initialStates=new Immutable.Map({
  app:States.app,
  user:States.user,
  contractor:States.contractor,
  rep:States.rep,
  bid:States.bid,
  error:States.error,
  order:States.order
});

const obj={
  form:formReducer
};


let merged = {...reducers,...obj};


// Apply thunk middleware
const middleware = applyMiddleware(thunk);

/**
 * Create app store.
 */
// const initialState = Immutable.Map();
const createStore = _createStore(combineReducers(merged),initialStates,middleware);

export { createStore, actions }