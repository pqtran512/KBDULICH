import actionTypes from './actionTypes'
import { apiGetAllRequests, apiGetRequest, apiGetRequestsByStaff } from '../../services/requestService'

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

export const getRequestsByStaff = (id) => async (dispatch) => {
    try {
        const response = await apiGetRequestsByStaff(id)
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
