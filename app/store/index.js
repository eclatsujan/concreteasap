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

import createSagaMiddleware from 'redux-saga'

import { reducer as formReducer } from 'redux-form/immutable';

import { reducers, actions,States } from './modules'

const initialStates=new Immutable.Map({
  app:States.app,
  alert:States.alert,
  user:States.user,
  contractor:States.contractor,
  rep:States.rep,
  bid:States.bid,
  error:States.error,
  order:States.order,
  notifications:States.notifications
});

const obj={
  form:formReducer
};


let merged = {...reducers,...obj};

const sagaMiddleware = createSagaMiddleware();

// sagaMiddleware.run(handleNewMessage);

// Apply thunk middleware
const middleware = applyMiddleware(thunk,sagaMiddleware);

/**
 * Create app store.
 */
const createStore = _createStore(combineReducers(merged),initialStates,middleware);

export { createStore, actions }