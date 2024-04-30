export const splitDate = (date) => {
    if (date) {
        const [y, m, d] = date.split('-');
        return [d,m,y]
    }
    return ['00', '00', '00']
}

export const splitDateTime = (datetime) => {
    let [day, time] = datetime.split('T')
    day = splitDate(day)[0]+'/'+splitDate(day)[1]+'/'+splitDate(day)[2]
    const [t, sec] = time.split('.')
    return [day, t]
}