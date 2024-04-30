export const ratingClassifier = (rating) => {
    if (rating) {
        const r = rating.toFixed(1)
        if (r >= 4.0) return 1
        else if (r >= 3.0) return 2
        else if (r >= 2.0) return 3
        else return 4
    }
    return 4
}