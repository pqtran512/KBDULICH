import actionTypes from "../actions/actionTypes";

const initState = {
    staffs: [],
    staff: {},
}
const staffReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_STAFF:
            return {
                ...state,
                staffs: action.staffs || [],
            }
        case actionTypes.GET_STAFF:
            return {
                ...state,
                staff: action.staff || {},
            }
        default:
            return state;
    }
}

export default staffReducer