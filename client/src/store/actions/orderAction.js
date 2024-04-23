import actionTypes from './actionTypes'
import { apiGetOrderOfTour } from '../../services/orderService'

export const getOrderOfTour = (id) => async (dispatch) => {
    try {
        const response = await apiGetOrderOfTour(id)
        dispatch({
            type: actionTypes.GET_ORDER_OF_TOUR,
            orders: response.data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.GET_ORDER_OF_TOUR,
            orders: null
        })
    }
}