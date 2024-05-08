export const requestStatus = (status) => {
    if (status === -1)
        return 'Từ chối'
    else if (status === 0)
        return 'Đang chờ phản hồi'
    else return 'Đồng ý'
}

export const requestStatusBg = (status) => {
    if (status === -1)
        return 'from-background-2 to-background-3 text-accent-3'
    else if (status === 0)
        return 'from-background-4 to-background-5 text-accent-5'
    else return 'from-background-7 to-background-6 text-accent-8'
}