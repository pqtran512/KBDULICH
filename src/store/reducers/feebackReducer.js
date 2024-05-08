import actionTypes from "../actions/actionTypes";

const initState = {
    feedbacks: [],
    msg: ''
}
const feedbackReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_FEEDBACK_OF_TOURTYPE:
            return {
                ...state,
                feedbacks: action.feedbacks || []
            }
        case actionTypes.ADD_FEEDBACK:
            return {
                ...state,
                msg: action.msg || ''
            }
        default:
            return state;
    }
}

export default feedbackReducer