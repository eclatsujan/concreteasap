import reducer from './reducer'
import * as actions from './actions'

//combining the reducer and actions of the order
export const order = { reducer, actions }
export { OrderState } from './reducer'