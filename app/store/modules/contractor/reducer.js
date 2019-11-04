import * as Immutable from 'immutable';

export const defaultState = Immutable.Map({

});

export const reducer=(state, action) => {
	switch(action.type){
		// case PLACE_ORDER: 
		// return Object.assign({}, state, action.payload)
		default:
		return state
	}	
}