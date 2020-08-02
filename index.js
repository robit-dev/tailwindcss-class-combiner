function mergeClasses(defaultClasses, className) {
    // Only attempt to merge classes if both strings are passed
    if (className && defaultClasses) {
        return mergeClassesAlgorithm(defaultClasses, className)
    }

    return defaultClasses
}

// This function contains the algorithm used to merge classes.
function mergeClassesAlgorithm(defaultClasses, className) {
    // Split both sets of classes into arrays to work with
    let newClasses = className.split(" ")
    let oldClasses = defaultClasses.split(" ")

    // Split the classes on hyphen to make merging tailwind classes possible
    const newClassesClassPrefix = getClassPrefix(newClasses)
    const oldClassesClassPrefix = getClassPrefix(oldClasses)

    // Loop for the length of newClasses and replace any that match
    // on tailwind utility prefixes to allow for overrides.
    // All others are appended to the oldClasses array.
    for (let index = 0; index < newClasses.length; index++) {
        let searchIndex = oldClassesClassPrefix.indexOf(newClassesClassPrefix[index])
        if (matchFound(searchIndex)) {
            oldClasses[searchIndex] = newClasses.slice(index, index + 1)[0]
            continue
        }
        oldClasses.push(newClasses.slice(index, index + 1)[0])
    }

    return oldClasses.join(" ")
}

// Determine if a match was found. This tests the result
// of the indexOf javascript function.
const matchFound = ( searchIndex = -1) => {
    if (searchIndex !== -1) {
        return true
    }
    return false
}

// Get the class prefix (tailwindcss specific) by splitting
// on "-" and returning the first element in the array.
const getClassPrefix = ( classes ) => {
    if (classes.length > 0) {
        return classes.map((className, index) => {
            return className.split("-")[0]
        })
    }
    return classes
}

export default mergeClasses