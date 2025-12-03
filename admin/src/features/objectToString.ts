export const objectToString = (obj: Record<string, string>) => {
    const arr: string[] = Object.keys(obj).map( key => {
        return `${key}: ${obj[key]}`;
    });
    return arr.join(' | ');
}