import actionTypes from "../actions/actionTypes";

const initState = {
    isLoggedIn: false,
    role: '',
    token: null,
    refresh_token: null,
    msg: '',
    refresh_msg: '',
    change: false,
    update: false // in case same msg is received
}
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_SUCESS:
            return {
                ...state,
                msg: action.msg || ''
            }
        case actionTypes.REGISTER_FAIL:
            return {
                ...state,
                role: '',
                msg: action.msg || '',
                update: !state.update
            }
        case actionTypes.LOGIN_SUCESS:
            return {
                ...state,
                isLoggedIn: true,
                role: 'customer',
                token: action.token,
                refresh_token: action.refresh_token,
                msg: ''
            }
        case actionTypes.LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                role: '',
                msg: action.msg,
                token: null,
                refresh_token: null,
                update: !state.update
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                role: '',
                token: null,
                refresh_token: null,
            }
        case actionTypes.STAFF_LOGIN_SUCESS:
            return {
                ...state,
                isLoggedIn: true,
                role:'staff',
                token: action.token,
                refresh_token: action.refresh_token,
                msg: ''
            }
        case actionTypes.MANAGER_LOGIN_SUCESS:
            return {
                ...state,
                isLoggedIn: true,
                role:'manager',
                token: action.token,
                refresh_token: action.refresh_token,
                msg: ''
            }
        case actionTypes.REFRESH_TOKEN:
            return {
                ...state,
                isLoggedIn: true,
                token: action.token,
                refresh_token: action.refresh_token,
                refresh_msg: action.refresh_msg,
                role: action.role
            }
        case actionTypes.CHANGEPASS_SUCESS:
            return {
                ...state,
                msg: action.msg || '',
                change: true,
                update: !state.update
            }
        case actionTypes.CHANGEPASS_FAIL:
            return {
                ...state,
                msg: action.msg || '',
                change: false,
                update: !state.update
            }
        default:
            return state;
    }
}

export default authReducer