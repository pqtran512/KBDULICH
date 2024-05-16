import axiosConfig from '../axiosConfig'

export const apiGetAllRequests = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `/api/manager/request/get_all`
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

export const apiGetRequestsByStaff = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/staff/request/get_all'
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
            url: '/api/staff/request/add/add',
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
            url: '/api/staff/request/edit/add',
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
            url: '/api/staff/request/cancel/add',
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
            url: '/api/manager/request/reply',
            data: payload
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})