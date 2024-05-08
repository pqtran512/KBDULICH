import actionTypes from './actionTypes'
import { apiGetToursRating, apiGetToursCondition, apiGetTour, apiGetByName, apiGetTourByStaffID, apiGetTourByStaff, apiGetAllPlaces, apiGetPlaceCond } from '../../services/tourPlaceService'

// Tour
export const getToursRating = () => async (dispatch) => { // register func. returns a func
    try {
        const response = await apiGetToursRating()
        dispatch({
            type: actionTypes.GET_TOURS_RATING,
            tours_rating: response.data.row,
            count_rating: response.data.count
        })
    } catch (error) {
        dispatch({
            type: actionTypes.GET_TOURS_RATING,
            tours_rating: null
        })
    }
}

export const getToursCondition = (query) => async (dispatch) => {
    try {
        const response = await apiGetToursCondition(query)
        dispatch({
            type: actionTypes.GET_TOURS_CONDITION,
            tours_cond: response.data.row,
            count_cond: response.data.count
        })
    } catch (error) {
        dispatch({
            type: actionTypes.GET_TOURS_CONDITION,
            tours_cond: null
        })
    }
}

export const getTour = (id) => async (dispatch) => {
    try {
        const response = await apiGetTour(id)
        dispatch({
            type: actionTypes.GET_TOUR,
            tour: response.data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.GET_TOUR,
            tour: null
        })
    }
}

export const getTourByName = (name) => async (dispatch) => {
    try {
        const response = await apiGetByName(name)
        dispatch({
            type: actionTypes.GET_TOURS_NAME,
            tours_name: response.data.row,
            count_name: response.data.count
        })
    } catch (error) {
        dispatch({
            type: actionTypes.GET_TOURS_NAME,
            tours_name: null
        })
    }
}

export const getTourByStaff = () => async (dispatch) => {
    try {
        const response = await apiGetTourByStaff()
        dispatch({
            type: actionTypes.GET_TOURS_STAFF,
            tours_staff: response.data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.GET_TOURS_STAFF,
            tours_staff: null
        })
    }
}

export const getTourByStaffID = (id) => async (dispatch) => {
    try {
        const response = await apiGetTourByStaffID(id)
        dispatch({
            type: actionTypes.GET_TOURS_STAFF,
            tours_staff: response.data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.GET_TOURS_STAFF,
            tours_staff: null
        })
    }
}

// Place
export const getAllPlaces = () => async (dispatch) => {
    try {
        const response = await apiGetAllPlaces()
        dispatch({
            type: actionTypes.GET_PLACES,
            places: response.data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PLACES,
            places: null
        })
    }
}

export const getPlaceCond = (payload) => async (dispatch) => {
    try {
        const response = await apiGetPlaceCond(payload)
        dispatch({
            type: actionTypes.GET_PLACE_COND,
            place_cond: response.data.row,
            count_cond: response.data.count
        })
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PLACE_COND,
            place_cond: null
        })
    }
}