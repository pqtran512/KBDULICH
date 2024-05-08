import actionTypes from "../actions/actionTypes";

const initState = {
    places: [],
    place_cond: [],
    count_cond: 0
}
const placeReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_PLACES:
            return {
                ...state,
                places: action.places || [],
            }
        case actionTypes.GET_PLACE_COND:
            return {
                ...state,
                place_cond: action.place_cond || [],
                count_cond: action.count_cond || 0
            }
        default:
            return state;
    }
}

export default placeReducer