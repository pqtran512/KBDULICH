export const dataReportArr = (data, filterBy, key) => {
    // Months
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const currentMonthIndex = new Date().getMonth();
    const current_months = months.slice(0, currentMonthIndex + 1);
    // Quarters
    const currentQuarter = Math.ceil((new Date().getMonth() + 1) / 3);
    const quarters = [];
    for (let q = 1; q <= currentQuarter; q++) {
        quarters.push(q);
    }
    // Convert the array of objects into a map for easy access
    const arr = new Map(data.map(item => [item[filterBy], item[key]]));
    if (filterBy === 'month') {
        // Generate the array of counts, include 0 for months that are missing
        return current_months.map(month => arr.get(month) || 0)
    }
    else {
        return quarters.map(quarter => arr.get(quarter) || 0)
    }
}

export const getDataForCurrentTime = (data, key, filterBy) => {
    if (data) {
        // Array of month names to match the structure of your data
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let currentTime
        if (filterBy === 'month') {
            // Get the current month using the Date object
            currentTime = months[new Date().getMonth()];
        }
        else {  currentTime = Math.ceil((new Date().getMonth() + 1) / 3);}
        // Find the data for the current month
        const currentData = data.find(item => item[filterBy] === currentTime);
        return currentData ? currentData[key] : 0;  // Returns 0 if the current month is not found in data
    }   
};


export const increaseRate = (data, key, filterBy) => {
    if (data) {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let currentTime
        let lastTime
        if (filterBy === 'month') {
            // Get the current month using the Date object
            currentTime = months[new Date().getMonth()];
            lastTime = months[new Date().getMonth()-1];
        }
        else {  
            currentTime = Math.ceil((new Date().getMonth() + 1) / 3);
            lastTime = currentTime - 1
        }
        const currentData = data.find(item => item[filterBy] === currentTime);
        const lastData = data.find(item => item[filterBy] === lastTime);
        console.log(lastTime, currentData, key)
        if (!currentData) {
            return -100
        }
        if (lastData && lastData[key] !== 0) {
            return ((currentData[key] - lastData[key])/lastData[key]).toFixed(1)
        }
        return '-'
    }   
};

