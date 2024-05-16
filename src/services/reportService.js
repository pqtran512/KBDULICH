import axiosConfig from '../axiosConfig'

export const apiReportTour = (year) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/report/tour/count',
            data: year
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiReportCustomer = (year) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/report/customer/count',
            data: year
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiReportIncome = (year) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/report/income/count',
            data: year
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})


