import axiosConfig from '../axiosConfig'

export const apiRegister = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/customer/create/',
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
            url: '/api/customer/get',
            data: payload // payload: email, password
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})