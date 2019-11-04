import * as types from './constants'

/**
 * Set loading status on/off
 * @param error_msg
 * @param errors
 */
export const setError = (error_msg,errors={}) => {
	return {
    type: types.SET_ERROR,
    payload: {error_msg,errors}
  }
};

export const removeErrors=()=>{
  return {
    type:types.REMOVE_ERROR
  }
};
