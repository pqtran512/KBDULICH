import axiosConfig from '../axiosConfig'

export const apiRegister = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/customer/add/',
            data: payload // payload: email, password
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiLogin = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/customer/get/',
            data: payload // payload: email, password
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiForgotPassword = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/customer/forgot-password',
            data: payload // payload: email
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiChangePassword = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/customer/forgot-password',
            data: payload // payload: email
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})