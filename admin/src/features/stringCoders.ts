const invertString = (str: string) => {
    let result = '';
    for (let i = str.length-1; i>=0; i--) {
        result += str.at(i);
    }
    return result;
}

export const encodeString = (str: string) => {
    const b64 = btoa(encodeURIComponent(str));
    return invertString(b64.substring(0,b64.length-2));
}

export const decodeString = (code: string) => {
    const b64 = invertString(code);
    return decodeURIComponent(atob(b64));
}