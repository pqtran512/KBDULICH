import axios from '../axiosConfig'

export const apiGetCurrent = () => new Promise(async(resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/user/get-current'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetAllStaff = () => new Promise(async(resolve, reject) => {
    try {
        const response = await axios({
            method: 'post',
            url: '/api/staff/get_all'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})