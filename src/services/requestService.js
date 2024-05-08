import axiosConfig from '../axiosConfig'

export const apiGetAllRequests = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `/api/request/get_all`
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiGetRequest = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/request/get_by_id',
            data: id 
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiGetRequestsByStaff = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/request/get_by_staffID',
            data: id 
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiRequestAdd = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/request/add_req/add',
            data: payload
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiRequestEdit = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/request/edit/add',
            data: payload
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiRequestCancel = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/request/cancel/add',
            data: payload
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiRequestReply = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/request/reply',
            data: payload
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})