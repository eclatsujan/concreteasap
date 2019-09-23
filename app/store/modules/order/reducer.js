import { ORDER_ALL } from './constants'
const initialState = {
  orders: []
}

export default (state=initialState, action) => {
	switch(action.type){
		case ORDER_ALL:
		return Object.assign({}, state,action.payload);
		default:
		return state
	}	
}