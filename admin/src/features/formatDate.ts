export const formatDate = (date: Date, format: string) => {
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const Y = date.getFullYear();
    const y = Y % 100;
    const h = String(date.getHours()).padStart(2, '0');
    const i = String(date.getMinutes()).padStart(2, '0');
    const s = String(date.getSeconds()).padStart(2, '0');

    return format
        .replace('d', d)
        .replace('m', m)
        .replace('Y', String(Y))
        .replace('y', String(y))
        .replace('h', h)
        .replace('i', i)
        .replace('s', s);
}