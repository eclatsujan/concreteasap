import * as types from './constants'

/**
 * Set loading status on/off
 * @param {boolean} yes Loading status
 */
export const setError = (error_msg,errors={}) => {
	// console.log(yes);
  return {
    type: types.SET_ERROR,
    payload: {error_msg,errors}
  }
}

export const removeErrors=()=>{
  return {
    type:types.REMOVE_ERROR
  }
}
