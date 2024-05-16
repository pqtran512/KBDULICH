import axiosConfig from '../axiosConfig'

export const apiGetOrderOfTour = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `/api/tour/order/get_all`,
            data: id
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiGetOrderOfCustomer = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `/api/customer/order/get_all`
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiGetOrder = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/order/get_by_id',
            data: id 
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiCountByTourType = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `/api/tour/type/order/count`,
            data: id
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiOrderAdd = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/order/add',
            data: payload
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiOrderUpdate = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/order/update',
            data: payload
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiOrderCancel = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/order/cancel',
            data: payload
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

// Feedback
export const apiGetFeedbackByTourType = (type_id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `/api/tour/type/feedback/get_all`,
            data: type_id
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiFeedbackAdd = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/feedback/add',
            data: payload
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

