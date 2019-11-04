import { LOGIN, LOGOUT, UPDATEUSER } from './constants'

import * as Immutable from 'immutable';

export const defaultState = Immutable.Map({
  loggedIn: false,
  userId: '',
  secureToken: '',
  roles:[]
});

export const reducer= (state, action) => {
  switch (action.type) {
    case LOGIN:
      return state.set("loggedIn",action.payload.loggedIn)
          .set("userId",action.payload.userId)
          .set("secureToken",action.payload.secureToken)
          .set("roles",action.payload.roles);
    case LOGOUT:
      return defaultState;
    case UPDATEUSER:
      // let newState=Object.assign({}, state, action.payload);
      // console.log(newState);
      return state;
    default:
  		return state
  }
};