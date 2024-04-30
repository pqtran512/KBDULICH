import actionTypes from './actionTypes'
import { apiRegister, apiLogin, apiForgotPassword, apiChangePassword, apiStaffLogin } from '../../services/authService'

export const register = (payload) => async (dispatch) => { // register func. returns a func
    try {
        const response = await apiRegister(payload)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.REGISTER_SUCESS,
                msg: response.data.msg
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
            data: null
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
    type: actionTypes.LOGOUT
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