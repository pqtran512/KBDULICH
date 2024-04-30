import actionTypes from "../actions/actionTypes";

const initState = {
    feedbacks: []
}
const feedbackReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_FEEDBACK_OF_TOURTYPE:
            return {
                ...state,
                feedbacks: action.feedbacks || []
            }
        default:
            return state;
    }
}

export default feedbackReducer