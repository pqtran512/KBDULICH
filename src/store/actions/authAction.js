import actionTypes from './actionTypes'
import { apiRegister, apiLogin, apiForgotPassword, apiChangePassword, apiStaffLogin, apiRefreshToken } from '../../services/authService'

export const register = (payload) => async (dispatch) => { // register func. returns a func
    try {
        const response = await apiRegister(payload)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.REGISTER_SUCESS,
                msg: 'Đăng ký thành công'
            })
        } else {
            dispatch({
                type: actionTypes.REGISTER_FAIL,
                msg: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.REGISTER_FAIL,
            msg: null
        })
    }
}

export const login = (payload) => async (dispatch) => { // register func. returns a func
    try {
        const response = await apiLogin(payload)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.LOGIN_SUCESS,
                token: response.data.token,
                refresh_token: response.data.refresh_token,
                msg: response.data.msg
            })
        } else {
            dispatch({
                type: actionTypes.LOGIN_FAIL,
                token: null,
                refresh_token: null,
                msg: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.LOGIN_FAIL,
            token: null,
            refresh_token: null,
            msg: ''
        })
    }
}

export const refreshToken = (refresh_token) => async (dispatch) => { // register func. returns a func
    try {
        const response = await apiRefreshToken(refresh_token)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.LOGIN_SUCESS,
                token: response.data.token,
                refresh_token: response.data.refresh_token,
                msg: ''
            })
        } else {
            dispatch({
                type: actionTypes.LOGOUT,
                token: null,
                refresh_token: null,
                msg: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.LOGOUT,
            token: null,
            refresh_token: null,
            msg: 'Token đã hết hạn !'
        })
    }
}

export const forgotPassword = (payload) => async (dispatch) => { // register func. returns a func
    try {
        const response = await apiForgotPassword(payload)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.MAIL_SUCESS,
                data: response.data.msg
            })
        } else {
            dispatch({
                type: actionTypes.MAIL_FAIL,
                data: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.MAIL_FAIL,
            data: null
        })
    }
}

export const changePassword = (payload) => async (dispatch) => { // register func. returns a func
    try {
        const response = await apiChangePassword(payload)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.CHANGEPASS_SUCESS,
                data: response.data.token
            })
        } else {
            dispatch({
                type: actionTypes.CHANGEPASS_FAIL,
                data: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.CHANGEPASS_FAIL,
            data: null
        })
    }
}

export const logout = () => ({
    type: actionTypes.LOGOUT,
    msg: ''
})

// Staff
export const staffLogin = (payload) => async (dispatch) => { // register func. returns a func
    try {
        const response = await apiStaffLogin(payload)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.STAFF_LOGIN_SUCESS,
                token: response.data.token,
                refresh_token: response.data.refresh_token,
                msg: response.data.msg
            })
        } else {
            dispatch({
                type: actionTypes.LOGIN_FAIL,
                token: null,
                refresh_token: null,
                msg: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.LOGIN_FAIL,
            token: null,
            refresh_token: null,
            msg: ''
        })
    }
}