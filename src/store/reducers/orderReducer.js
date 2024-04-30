import actionTypes from "../actions/actionTypes";

const initState = {
    orders: [],
    count_order: 0,
    count_order_tourtype: 0,
    orders_customer: [],
    count_order_customer: 0
}
const orderReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_ORDER_OF_TOUR:
            return {
                ...state,
                orders: action.orders || [],
                count_order: action.count_order || 0
            }
        case actionTypes.GET_ORDER_OF_CUSTOMER:
            return {
                ...state,
                orders_customer: action.orders_customer || [],
                count_order_customer: action.count_order_customer || 0
            }
        case actionTypes.COUNT_ORDER_TOURTYPE:
            return {
                ...state,
                count_order_tourtype: action.count_order_tourtype || 0
            }
        default:
            return state;
    }
}

export default orderReducer