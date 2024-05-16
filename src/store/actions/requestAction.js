import actionTypes from './actionTypes'
import { apiGetAllRequests, apiGetRequest, apiGetRequestsByStaff, apiRequestAdd, apiRequestCancel, apiRequestEdit, apiRequestReply } from '../../services/requestService'

// Tour
export const getAllRequests = () => async (dispatch) => { // register func. returns a func
    try {
        const response = await apiGetAllRequests()
        dispatch({
            type: actionTypes.GET_ALL_REQUESTS,
            requests: response.data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.GET_ALL_REQUESTS,
            requests: null
        })
    }
}


export const getRequest = (id) => async (dispatch) => {
    try {
        const response = await apiGetRequest(id)
        dispatch({
            type: actionTypes.GET_REQUEST,
            request: response.data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.GET_REQUEST,
            tour: null
        })
    }
}

export const getRequestsByStaff = () => async (dispatch) => {
    try {
        const response = await apiGetRequestsByStaff()
        dispatch({
            type: actionTypes.GET_REQUESTS_STAFF,
            requests: response.data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.GET_REQUESTS_STAFF,
            requests: null
        })
    }
}

export const requestAdd = (payload) => async (dispatch) => {
    try {
        const response = await apiRequestAdd(payload)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.REQUEST_ADD,
                msg: 'success'
            })
        }
        else {
            dispatch({
                type: actionTypes.REQUEST_ADD,
                msg: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.REQUEST_ADD,
            msg: error
        })
    }
}

export const requestEdit = (payload) => async (dispatch) => {
    try {
        const response = await apiRequestEdit(payload)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.REQUEST_ADD,
                msg: 'success'
            })
        }
        else {
            dispatch({
                type: actionTypes.REQUEST_ADD,
                msg: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.REQUEST_ADD,
            msg: error
        })
    }
}

export const requestCancel = (payload) => async (dispatch) => {
    try {
        const response = await apiRequestCancel(payload)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.REQUEST_ADD,
                msg: 'success'
            })
        }
        else {
            dispatch({
                type: actionTypes.REQUEST_ADD,
                msg: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.REQUEST_ADD,
            msg: error
        })
    }
}


export const requestReply = (payload) => async (dispatch) => {
    try {
        const response = await apiRequestReply(payload)
        if (response?.data.err === 0) {
            if (payload.status === 1)
                dispatch({
                    type: actionTypes.REQUEST_REPLY,
                    msg: 'Đã cập nhật thay đổi mới'
                })
            else {
                dispatch({
                    type: actionTypes.REQUEST_REPLY,
                    msg: 'Phản hồi thành công'
                })
            }
        }
        else {
            dispatch({
                type: actionTypes.REQUEST_REPLY,
                msg: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.REQUEST_REPLY,
            msg: error
        })
    }
}