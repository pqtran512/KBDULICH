import actionTypes from './actionTypes'
import { apiReportTour, apiReportCustomer, apiReportIncome } from '../../services/reportService'

export const reportTour = (year) => async (dispatch) => { // register func. returns a func
    try {
        const response = await apiReportTour(year)
        dispatch({
            type: actionTypes.REPORT_TOUR,
            data: response.data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.REPORT_TOUR,
            data: null
        })
    }
}

export const reportCustomer = (year) => async (dispatch) => { // register func. returns a func
    try {
        const response = await apiReportCustomer(year)
        dispatch({
            type: actionTypes.REPORT_CUSTOMER,
            data: response.data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.REPORT_CUSTOMER,
            data: null
        })
    }
}

export const reportIncome = (year) => async (dispatch) => { // register func. returns a func
    try {
        const response = await apiReportIncome(year)
        dispatch({
            type: actionTypes.REPORT_INCOME,
            data: response.data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.REPORT_INCOME,
            data: null
        })
    }
}