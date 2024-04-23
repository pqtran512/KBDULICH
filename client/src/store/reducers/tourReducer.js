import actionTypes from "../actions/actionTypes";

const initState = {
    tours: [],
    count: 0,
    tours_cond: [],
    count_cond: 0,
    tours_rating: [],
    count_rating: 0,
    tour: [],
    tours_name: [],
    count_name: 0,
    tours_staff: [],
}
const tourReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_TOURS_RATING:
            return {
                ...state,
                tours_rating: action.tours_rating || [],
                count_rating: action.count_rating || 0
            }
        case actionTypes.GET_TOURS_NAME:
            return {
                ...state,
                tours_name: action.tours_name || [],
                count_name: action.count_name || 0
            }
        case actionTypes.GET_TOURS_CONDITION:
            return {
                ...state,
                tours_cond: action.tours_cond || [],
                count_cond: action.count_cond || 0
            }
        case actionTypes.GET_TOUR:
            return {
                ...state,
                tour: action.tour || []
            }
        case actionTypes.GET_TOURS_STAFF:
            return {
                ...state,
                tours_staff: action.tours_staff || []
            }
        default:
            return state;
    }
}

export default tourReducer