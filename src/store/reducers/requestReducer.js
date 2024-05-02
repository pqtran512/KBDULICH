import actionTypes from "../actions/actionTypes";

const initState = {
    requests: [],
    request: {},
    requests_staff: [],
    msg: ''
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
        case actionTypes.REQUEST_ADD:
        case actionTypes.REQUEST_EDIT:
        case actionTypes.REQUEST_CANCEL:
            return {
                ...state,
                msg: action.msg,
            }
        default:
            return state;
    }
}

export default requestReducer