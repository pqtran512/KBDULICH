import actionTypes from './actionTypes'
import { apiGetOrderOfTour, apiGetFeedbackByTourType, apiCountByTourType, apiGetOrderOfCustomer } from '../../services/orderFeedbackService'

export const getOrderOfTour = (id) => async (dispatch) => {
    try {
        const response = await apiGetOrderOfTour(id)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_ORDER_OF_TOUR,
                orders: response.data.row,
                count_order: response.data.count
            })
        }
        else {
            dispatch({
                type: actionTypes.GET_ORDER_OF_TOUR,
                orders: null,
                count_order: 0
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_ORDER_OF_TOUR,
            orders: null
        })
    }
}

export const countByTourType = (tourType_ID) => async (dispatch) => {
    try {
        const response = await apiCountByTourType(tourType_ID)
        dispatch({
            type: actionTypes.COUNT_ORDER_TOURTYPE,
            count_order_tourtype: response.data.count
        })
    } catch (error) {
        dispatch({
            type: actionTypes.COUNT_ORDER_TOURTYPE,
            count_order_tourtype: 0
        })
    }
}

export const getOrderOfCustomer = (id) => async (dispatch) => {
    try {
        const response = await apiGetOrderOfCustomer(id)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_ORDER_OF_CUSTOMER,
                orders_customer: response.data.row,
                count_order_customer: response.data.count
            })
        }
        else {
            dispatch({
                type: actionTypes.GET_ORDER_OF_CUSTOMER,
                orders_customer: null,
                count_order_customer: 0
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_ORDER_OF_CUSTOMER,
            orders_customer: null
        })
    }
}

// Feedback
export const getFeedbackByTourType = (type_id) => async (dispatch) => {
    try {
        const response = await apiGetFeedbackByTourType(type_id)
        dispatch({
            type: actionTypes.GET_FEEDBACK_OF_TOURTYPE,
            feedbacks: response.data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.GET_FEEDBACK_OF_TOURTYPE,
            feedbacks: null
        })
    }
}