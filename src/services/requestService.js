import axiosConfig from '../axiosConfig'

// Tour
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
