import actionTypes from './actionTypes'
import { apiGetOrderOfTour, apiGetFeedbackByTourType, apiCountByTourType, apiGetOrderOfCustomer, apiGetOrder, apiOrderAdd, apiFeedbackAdd, apiOrderUpdate, apiOrderCancel } from '../../services/orderFeedbackService'

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

export const getOrderOfCustomer = () => async (dispatch) => {
    try {
        const response = await apiGetOrderOfCustomer()
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

export const getOrder = (id) => async (dispatch) => {
    try {
        const response = await apiGetOrder(id)
        dispatch({
            type: actionTypes.GET_ORDER,
            order: response.data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.GET_ORDER,
            order: null
        })
    }
}

export const orderAdd = (payload) => async (dispatch) => {
    try {
        const response = await apiOrderAdd(payload)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.ORDER_ADD,
                msg: 'success',
                order_data: response.data.msg
            })
        }
        else {
            dispatch({
                type: actionTypes.ORDER_ADD,
                msg: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.ORDER_ADD,
            msg: 'Lỗi hệ thống ! Vui lòng thử lại !'
        })
    }
}

export const orderUpdate = (payload) => async (dispatch) => {
    try {
        const response = await apiOrderUpdate(payload)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.ORDER_UPDATE,
                msg: 'success',
            })
        }
        else {
            dispatch({
                type: actionTypes.ORDER_UPDATE,
                msg: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.ORDER_UPDATE,
            msg: 'Lỗi hệ thống ! Vui lòng thử lại !'
        })
    }
}


export const orderCancel = (payload) => async (dispatch) => {
    try {
        const response = await apiOrderCancel(payload)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.ORDER_UPDATE,
                msg: 'success',
            })
        }
        else {
            dispatch({
                type: actionTypes.ORDER_UPDATE,
                msg: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.ORDER_UPDATE,
            msg: 'Lỗi hệ thống ! Vui lòng thử lại !'
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

export const feedbackAdd = (payload) => async (dispatch) => {
    try {
        const response = await apiFeedbackAdd(payload)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.ADD_FEEDBACK,
                msg: 'success'
            })
        }
        else {
            dispatch({
                type: actionTypes.ADD_FEEDBACK,
                msg: 'Lỗi hệ thống ! Vui lòng thử lại !'
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.ADD_FEEDBACK,
            msg: 'Lỗi hệ thống ! Vui lòng thử lại !'
        })
    }
}