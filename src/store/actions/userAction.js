import actionTypes from './actionTypes'
import * as apis from '../../services'

export const getCurrent = () => async (dispatch) => { 
    try {
        const response = await apis.apiGetCurrent()
        dispatch({
            type: actionTypes.GET_CURRENT,
            currentData: response.data // access response returned
        })
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CURRENT,
            msg: error,
            currentData: null
        })
    }
}

export const getAllStaff = () => async (dispatch) => { 
    try {
        const response = await apis.apiGetAllStaff()
        dispatch({
            type: actionTypes.GET_ALL_STAFF,
            staffs: response.data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.GET_ALL_STAFF,
            staffs: null
        })
    }
}

export const getStaff = (id) => async (dispatch) => {
    try {
        const response = await apis.apiGetStaff(id)
        dispatch({
            type: actionTypes.GET_STAFF,
            staff: response.data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.GET_STAFF,
            staff: null
        })
    }
}

export const staffAdd = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiStaffAdd(payload)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.STAFF_ADD,
                msg: 'success',
                data: response.data.msg
            })
        }
        else {
            dispatch({
                type: actionTypes.STAFF_ADD,
                msg: 'fail'
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.STAFF_ADD,
            msg: error
        })
    }
}

export const staffUpdate = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiStaffUpdate(payload)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.STAFF_UPDATE,
                msg: 'success'
            })
        }
        else {
            dispatch({
                type: actionTypes.STAFF_UPDATE,
                msg: 'fail'
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.STAFF_UPDATE,
            msg: error
        })
    }
}

export const staffActivate = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiStaffActivate(payload)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.STAFF_UPDATE,
                msg: 'success'
            })
        }
        else {
            dispatch({
                type: actionTypes.STAFF_UPDATE,
                msg: 'fail'
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.STAFF_UPDATE,
            msg: error
        })
    }
}

export const stafChangePassFirstLogin = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiStaffChangePassFirstLogin(payload)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.STAFF_UPDATE,
                msg: 'success'
            })
        }
        else {
            dispatch({
                type: actionTypes.STAFF_UPDATE,
                msg: 'fail'
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.STAFF_UPDATE,
            msg: error
        })
    }
}

