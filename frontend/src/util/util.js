export function toTitleCase(str) {
    return str
        .toLowerCase()
        .replaceAll("_", " ")
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export function combineStrings(delimiter, ...strings) {
    return strings
        .filter(str => str !== undefined && str !== null && str !== '')
        .join(delimiter);
}

export function localStore(key, value) {
    try {
        localStorage.setItem(key, value)
    } catch (e) {
        localStorage.clear()
        localStorage.setItem(key, value)
    }
}