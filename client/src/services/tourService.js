import axiosConfig from '../axiosConfig'
import axios from 'axios'

export const apiGetTours = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/tour/all',
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiGetToursLimit = (query) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/tour/limit`,
            params: query
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})