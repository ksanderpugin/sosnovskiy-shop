import { Words } from "../const/Words";
import { CheckOutMeta } from "../schimas/CheckOutSchema";
import type { Lang } from "../types/Lang";

export const validateCheckoutForm = (data: FormData, lang: Lang, keyOnly: string | false = false) => {
    
    const errors: Record<string, string | false> = keyOnly ? {} : {
        'first-name': false,
        'last-name': false,
        'phone': false
    };
    if (keyOnly) errors[keyOnly] = false;
    const rData: Record<string, string> = {};

    const testField = (name: string, value: string) => {
        switch(name) {
            case 'first-name':
                if (value.length < 3) errors[name] = Words.fieldMinError(CheckOutMeta.firstName.label[lang])[lang];
                else if (value.length > 32) errors[name] = Words.fieldMaxError(CheckOutMeta.firstName.label[lang])[lang];
                break;

            case 'last-name':
                if (value.length < 3) errors[name] = Words.fieldMinError(CheckOutMeta.lastName.label[lang])[lang];
                else if (value.length > 32) errors[name] = Words.fieldMaxError(CheckOutMeta.lastName.label[lang])[lang];
                break;

            case "phone":
                // eslint-disable-next-line no-case-declarations
                const pRE = /\+38 \(0\d{2}\) \d{3}-\d{2}-\d{2}/gm;
                if (!pRE.test(value)) errors[name] = Words.phoneError[lang];
                break;
        }
    }

    for (const [key, formValue] of data.entries()) {
        const value = formValue.toString().trim();
        if (!keyOnly || key == keyOnly) testField(key, value);
        rData[key] = value;
    }

    return [rData, errors];
}