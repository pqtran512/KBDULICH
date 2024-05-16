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
            url: '/api/manager/staff/get_all'
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
            url: '/api/manager/staff/get_by_id',
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
            url: '/api/manager/staff/add',
            data: payload
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiStaffUpdate = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/manager/staff/update_info',
            data: payload
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiStaffActivate = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/manager/staff/change_active',
            data: payload
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiStaffChangePassFirstLogin = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/staff/update_pass_first_login',
            data: payload
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

