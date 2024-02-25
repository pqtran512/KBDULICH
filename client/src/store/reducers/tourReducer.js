import actionTypes from "../actions/actionTypes";

const initState = {
    tours: [],
    msg: '',
    count: 0,
}
const tourReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_TOURS:
        case actionTypes.GET_TOURS_LIMIT:
            return {
                ...state,
                tours: action.tours || [],
                msg: action.msg || '',
                count: action.count || 0
            }
        default:
            return state;
    }
}

export default tourReducer