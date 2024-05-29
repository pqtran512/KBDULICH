import axiosConfig from '../axiosConfig'

// Tour
export const apiGetToursCondition = (query) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `/api/customer/tour/condition`,
            data: query // param: query
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiGetToursRating = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/customer/tour/highest_ratings',
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiGetTour = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/tour/get_by_id',
            data: id 
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiGetByName = (name) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/customer/tour/name',
            data: name 
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiGetTourByStaff = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/staff/tour/get_all',
            data: id 
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiGetTourByStaffID = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/manager/tour/staffID',
            data: id 
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiTourUpdate = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/manager/tour/update',
            data: payload
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiTourCancel = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/manager/tour/cancel',
            data: payload
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
// Place
export const apiGetAllPlaces = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/place/get_all'
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiGetPlaceCond = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/place/get_by_condition',
            data: payload 
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

