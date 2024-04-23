import axiosConfig from '../axiosConfig'

export const apiGetOrderOfTour = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `/api/order/of_tour`,
            data: id
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})


