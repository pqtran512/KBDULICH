import actionTypes from "../actions/actionTypes";

const initState = {
    isLoggedIn: false,
    token: null,
    msg: '',
    update: false // in case same msg is received
}
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_SUCESS:
        case actionTypes.LOGIN_SUCESS:
            return {
                ...state,
                isLoggedIn: true,
                token: action.data,
                msg: ''
            }
        case actionTypes.REGISTER_FAIL:
        case actionTypes.LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                msg: action.data,
                token: null,
                update: !state.update
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                msg: ''
            }
        default:
            return state;
    }
}

export default authReducer