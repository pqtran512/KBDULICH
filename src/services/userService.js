import axios from '../axiosConfig'
import axiosConfig from '../axiosConfig'

export const apiGetCurrent = () => new Promise(async(resolve, reject) => {
    try {
        const response = await axios({
            method: 'post',
            url: '/api/get_current'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

// Staff
export const apiGetAllStaff = () => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/staff/get_all'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetStaff = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/staff/get_by_id',
            data: id 
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiStaffAdd = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/staff/add',
            data: payload
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

