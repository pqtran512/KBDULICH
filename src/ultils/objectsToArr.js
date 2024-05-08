import { formatVietnameseToString } from "./formatVietnameseToString";

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
    const placeNames = places.sort((a, b) => 
            formatVietnameseToString(a['name']) > formatVietnameseToString(b['name']) ? 1 : -1
        ).map(place => ({
        value: place.place_ID,
        label: place.name,
    }));
    return placeNames
}

export const staffObjects = (staffs) => {
    const staffNames = staffs.map(member => ({
        value: member.staff_ID,
        label: `${member.lastName} ${member.firstName}`
    }));
    return staffNames
}

export const placeUniqueProvince = (places) => {
    const uniqueProvinces = [];
    const seenProvinces = new Set(); // Create a Set to track unique provinces
    // Iterate over the array of places
    places.forEach(place => {
        if (!seenProvinces.has(place.province)) {
            seenProvinces.add(place.province);
            uniqueProvinces.push(place);
        }
    });
    return uniqueProvinces
}

export const tourUniqueName = (tours) => {
    const uniqueNames = [];
    const seenNames = new Set(); // Create a Set to track unique provinces
    // Iterate over the array of places
    tours.forEach(t => {
        if (!seenNames.has(t.name)) {
            seenNames.add(t.name);
            uniqueNames.push(t);
        }
    });
    return uniqueNames
}

export const getProvinceTitle = (tour) => {
    let arr = []
    for (var i = 0; i < tour?.places?.length; i++) {
        if (!arr.includes(tour.places[i].province)) {
            arr = [...arr, tour.places[i].province]
        }
    }
    return arr
}
