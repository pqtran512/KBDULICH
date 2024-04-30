import actionTypes from "../actions/actionTypes";

const initState = {
    staffs: [],
}
const staffReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_STAFF:
            return {
                ...state,
                staffs: action.staffs || [],
            }
        default:
            return state;
    }
}

export default staffReducer