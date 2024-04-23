import actionTypes from "../actions/actionTypes";

const initState = {
    orders: []
}
const orderReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_ORDER_OF_TOUR:
            return {
                ...state,
                orders: action.orders || []
            }
        default:
            return state;
    }
}

export default orderReducer