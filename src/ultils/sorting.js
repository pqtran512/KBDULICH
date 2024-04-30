import { formatVietnameseToString } from "./formatVietnameseToString";

export const sorting = (col, data, setData, order, setOrder) => {
    if (typeof data[0][col] === 'string') {
        if (order === "asc") {
            const sorted = [...data].sort((a, b) => 
                formatVietnameseToString(a[col]) < formatVietnameseToString(b[col]) ? 1 : -1
            );
            setData(sorted)
            setOrder('dsc')
        }
        if (order === "dsc") {
            const sorted = [...data].sort((a, b) => 
                formatVietnameseToString(a[col]) > formatVietnameseToString(b[col]) ? 1 : -1
            );
            setData(sorted)
            setOrder('asc')
        }
    }
    else {
        if (order === "asc") {
            const sorted = [...data].sort((a, b) => 
                a[col] < b[col] ? 1 : -1
            );
            setData(sorted)
            setOrder('dsc')
        }
        if (order === "dsc") {
            const sorted = [...data].sort((a, b) => 
                a[col] > b[col] ? 1 : -1
            );
            setData(sorted)
            setOrder('asc')
        }
    }
}