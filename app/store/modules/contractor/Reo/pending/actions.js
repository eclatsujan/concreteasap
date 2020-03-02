import * as constants from './constants'

export const createReoOrder = (order) => {
    return {type:constants.PLACE_REO_ORDER,payload:{order}}
};