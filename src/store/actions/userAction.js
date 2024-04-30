import actionTypes from './actionTypes'
import * as apis from '../../services'

export const getCurrent = () => async (dispatch) => { 
    try {
        const response = await apis.apiGetCurrent()
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_CURRENT,
                currentData: response.data.response // access response returned
            })
        } else {
            dispatch({
                type: actionTypes.GET_CURRENT,
                msg: response.data.msg,
                currentData: null
            })
        }
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