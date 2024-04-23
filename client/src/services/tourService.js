import axiosConfig from '../axiosConfig'

export const apiGetToursCondition = (query) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `/api/tour/get_by_condition`,
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
            url: '/api/tour/highest_ratings',
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
            url: '/api/tour/get_by_name',
            data: name 
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiGetByStaff = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/tour/get_by_staffID',
            data: id 
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

