import actionTypes from "../actions/actionTypes";

const initState = {
    staffs: [],
    staff: {},
    msg: '',
    add_data: {},
    update: false // in case same msg is received
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
        case actionTypes.STAFF_ADD:
            return {
                ...state,
                msg: action.msg || '', 
                add_data: action.data || {},
                update: !state.update
            }
        case actionTypes.STAFF_UPDATE:
            return {
                ...state,
                msg: action.msg || '',
                update: !state.update
            }
        default:
            return state;
    }
}

export default staffReducer