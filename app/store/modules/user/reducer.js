import { LOGIN, LOGOUT, UPDATEUSER } from './constants'

const initialState = {
  loggedIn: false,
  userId: '',
  secureToken: '',
  roles:[]
}


export default (state=initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, action.payload)
    case LOGOUT:
      return Object.assign({}, state, initialState)
    case UPDATEUSER:
      let newState=Object.assign({}, state, action.payload);
      console.log(newState);
      return newState;
    default:
  		return state
  }
}