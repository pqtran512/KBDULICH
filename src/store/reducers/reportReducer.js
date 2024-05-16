import actionTypes from "../actions/actionTypes";

const initState = {
    tour_data: {},
    customer_data: {},
    income_data: {},
}
const reportReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.REPORT_TOUR:
            return {
                ...state,
                tour_data: action.data || {},
            }
        case actionTypes.REPORT_CUSTOMER:
            return {
                ...state,
                customer_data: action.data || {},
            }
        case actionTypes.REPORT_INCOME:
            return {
                ...state,
                income_data: action.data || {},
            }
        default:
            return state;
    }
}

export default reportReducer