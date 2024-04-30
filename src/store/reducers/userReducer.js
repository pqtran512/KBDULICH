import actionTypes from "../actions/actionTypes";

const initState = {
    currentData: {}
}
const userReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_CURRENT:
            return {
                ...state,
                currentData: action.currentData || {} // if currentData is null -> empty array
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                currentData: {} 
            }
        default:
            return state;
    }
}

export default userReducer