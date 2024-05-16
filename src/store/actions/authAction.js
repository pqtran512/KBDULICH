import actionTypes from './actionTypes'
import { apiRegister, apiLogin, apiForgotPassword, apiChangePassword, apiStaffLogin, apiRefreshToken, apiManagerLogin } from '../../services/authService'

export const register = (payload) => async (dispatch) => { // register func. returns a func
    try {
        const response = await apiRegister(payload)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.REGISTER_SUCESS,
                msg: 'success'
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
            msg: error
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
                msg: ''
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

export const refreshToken = (payload) => async (dispatch) => { // register func. returns a func
    try {
        const response = await apiRefreshToken(payload)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.REFRESH_TOKEN,
                token: response.data.token,
                refresh_token: response.data.refresh_token,
                role: payload.role,
                refresh_msg: ''
            })
        } else {
            dispatch({
                type: actionTypes.LOGOUT,
                token: null,
                refresh_token: null,
                refresh_msg: response.data.msg,
                role: ''
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.LOGOUT,
            token: null,
            refresh_token: null,
            refresh_msg: 'Lỗi hệ thống ! Vui lòng đăng nhập lại !',
            role: ''
        })
    }
}

export const forgotPassword = (payload) => async (dispatch) => { // register func. returns a func
    try {
        const response = await apiForgotPassword(payload)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.CHANGEPASS_SUCESS,
                msg: response.data.msg
            })
        } else {
            dispatch({
                type: actionTypes.CHANGEPASS_FAIL,
                msg: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.CHANGEPASS_FAIL,
            msg: error
        })
    }
}

export const changePassword = (payload) => async (dispatch) => { // register func. returns a func
    try {
        const response = await apiChangePassword(payload)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.CHANGEPASS_SUCESS,
                msg: response.data.msg
            })
        } else {
            dispatch({
                type: actionTypes.CHANGEPASS_FAIL,
                msg: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.CHANGEPASS_FAIL,
            msg: error
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
                refresh_token: response.data.refresh_token
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
            msg: 'Lỗi hệ thống ! Vui lòng thử lại !'
        })
    }
}

// Manager
export const managerLogin = (payload) => async (dispatch) => { // register func. returns a func
    try {
        const response = await apiManagerLogin(payload)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.MANAGER_LOGIN_SUCESS,
                token: response.data.token,
                refresh_token: response.data.refresh_token
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
            msg: 'Lỗi hệ thống ! Vui lòng thử lại !'
        })
    }
}