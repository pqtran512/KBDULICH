import actionTypes from "../actions/actionTypes";

const initState = {
    isRegister: false,
    isLoggedIn: false,
    role: '',
    token: null,
    refresh_token: null,
    msg: '',
    update: false // in case same msg is received
}
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_SUCESS:
            return {
                ...state,
                isRegister: true,
                msg: 'Đăng ký thành công'
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
        case actionTypes.REGISTER_FAIL:
            return {
                ...state,
                isRegister: false,
                role: '',
                msg: action.msg,
                update: !state.update
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
                msg: ''
            }
        case actionTypes.STAFF_LOGIN_SUCESS:
            return {
                ...state,
                isLoggedIn: true,
                role:'staff',
                token: action.data,
                refresh_token: action.refresh_token,
                msg: ''
            }
        default:
            return state;
    }
}

export default authReducer