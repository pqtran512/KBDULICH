export const provinceObjects = (places, customer) => {
    const provinceNames = places.map(place => place.province); // transform the array of objects into an array of province names
    const uniqueProvinces = new Set(provinceNames); // extract unique names
    const uniqueProvinceArray = Array.from(uniqueProvinces).sort();
    let province_arr = uniqueProvinceArray.map(p => ({
        value: p,
        label: p
    }));
    if (customer) province_arr = [{ value: '', label: 'Chọn ...' }, ...province_arr]
    return province_arr
}

export const placeObjects = (places) => {
    const placeNames = places.map(place => place.name); // transform the array of objects into an array of place names
    const uniquePlaces = new Set(placeNames); // extract unique names
    const uniqueStaffArray = Array.from(uniquePlaces).sort();
    let arr = uniqueStaffArray.map(p => ({
        value: p,
        label: p
    }));
    return arr
}

export const staffObjects = (staffs) => {
    const staffNames = staffs.map(member => ({
        value: member.staff_ID,
        label: `${member.lastName} ${member.firstName}`
    }));
    return staffNames
}
