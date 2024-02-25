import actionTypes from './actionTypes'
import { apiGetTours, apiGetToursLimit } from '../../services/tourService'

export const getTours = () => async (dispatch) => { // register func. returns a func
    try {
        const response = await apiGetTours()
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_TOURS,
                tours: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_TOURS,
                msg: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_TOURS,
            tours: null
        })
    }
}

export const getToursLimit = (query) => async (dispatch) => {
    try {
        const response = await apiGetToursLimit(query)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_TOURS_LIMIT,
                tours: response.data.response?.rows,
                count: response.data.response?.count
            })
        } else {
            dispatch({
                type: actionTypes.GET_TOURS_LIMIT,
                msg: response.data.msg
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_TOURS_LIMIT,
            tours: null
        })
    }
}