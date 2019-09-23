import { PLACE_ORDER } from './constants'

const initialState = {
  isRegister: false,
  userId: '',
  secureToken: '',
  formMessage:'Form Submited',
  errorFormMessage:'Failed To Submit Form',
}

export default (state=initialState, action) => {
	switch(action.type){
		// case PLACE_ORDER: 
		// return Object.assign({}, state, action.payload)
		default:
		return state
	}	
}