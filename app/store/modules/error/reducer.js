import { SET_ERROR } from './constants'
import { REMOVE_ERROR } from './constants'

const initialState = {
  error_msg:"",
  errors:{}
}


export default (state=initialState, action) => {
  switch (action.type) {
    case SET_ERROR:
      return Object.assign({}, state,{error_msg:action.payload.error_msg,errors:action.payload.errors})
    case REMOVE_ERROR:
      return Object.assign({},state,initialState);
    default:
  		return state
  }
}
