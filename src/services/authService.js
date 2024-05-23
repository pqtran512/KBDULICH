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
            url: '/api/customer/login/',
            data: payload // payload: email, password
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiRefreshToken = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/auth/refreshToken',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiForgotPassword = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/customer/forget_pass/',
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
            url: '/api/customer/change_pass/',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

// STAFF
export const apiStaffLogin = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/staff/login',
            data: payload // payload: email, password
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

// MANAGER
export const apiManagerLogin = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/manager/login',
            data: payload // payload: email, password
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})