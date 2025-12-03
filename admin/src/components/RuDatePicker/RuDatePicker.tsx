import DatePicker, { registerLocale } from "react-datepicker";
import { enUS } from "date-fns/locale";
import type { Locale } from "date-fns";
import type {Dispatch, SetStateAction} from "react";
import "react-datepicker/dist/react-datepicker.css";

type PropTypes = {
    selected: Date | null,
    onChange?: Dispatch<SetStateAction<Date | null>>,
    dateFormat?: string,
    placeholderText?: string
}

const ruLocale: Locale = {
    ...enUS,
    localize: {
        ...enUS.localize,
        day: (n) => ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'][n],
        month: (n) => ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'][n]
    },
    options: {
        ...enUS.options,
        weekStartsOn: 1
    }
}

registerLocale("ruLocale", ruLocale);

export const RuDatePicker = ({selected = null,onChange,dateFormat,placeholderText}: PropTypes) => {
    return (
        <DatePicker
            locale="ruLocale"
            selected={selected}
            onChange={onChange}
            dateFormat={dateFormat}
            placeholderText={placeholderText}
        />
    )
}