import actionTypes from "../actions/actionTypes";

const initState = {
    places: [],
}
const placeReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_PLACES:
            return {
                ...state,
                places: action.places || [],
            }
        default:
            return state;
    }
}

export default placeReducer