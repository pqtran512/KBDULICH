import actionTypes from "../actions/actionTypes";

const initState = {
    requests: [],
    request: {},
    requests_staff:[]
}
const requestReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_REQUESTS:
        case actionTypes.GET_REQUESTS_STAFF:
            return {
                ...state,
                requests: action.requests || [],
            }
        case actionTypes.GET_REQUEST:
            return {
                ...state,
                request: action.request || {},
            }
        default:
            return state;
    }
}

export default requestReducer