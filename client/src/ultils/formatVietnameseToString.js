export const formatVietnameseToString = (keyword) => {
    return keyword
        .replace(/[đĐ]/g, "d")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .split(" ")
        .join("-")
}