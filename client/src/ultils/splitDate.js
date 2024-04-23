export const splitDate = (date) => {
    if (date) {
        const [y, m, d] = date.split('-');
        return [d,m,y]
    }
    return ['00', '00', '00']
}