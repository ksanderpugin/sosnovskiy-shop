import { Words } from "../const/Words";
import type { Lang } from "../types/Lang";

export const isoDateToString = (date: string, lang: Lang) => {
    const d = new Date(date);
    return lang === 'en'
        ? `${Words.dayNames[lang][d.getDay()]}, ${Words.monthNames[lang][d.getMonth()+1]} ${d.getDate()}`
        : `${Words.dayNames[lang][d.getDay()]}, ${d.getDate()} ${Words.monthNames[lang][d.getMonth()+1]}`
}