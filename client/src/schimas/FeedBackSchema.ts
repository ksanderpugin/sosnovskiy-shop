import { z } from "zod";
import type { IFormField } from "../types/IFormField.types";
import type { Lang } from "../types/Lang";

const errors = {
    nameMin: {
        uk: "Ім'я має містити щонайменше 3 символи",
        ru: "Имя должно содержать не менее 3 символа.",
        en: "Name must contain at least 3 characters"
    },
    nameMax: {
        uk: "Ім'я повинно містити щонайбільше 32 символи",
        ru: "Имя должно содержать не более 32 символа.",
        en: "Name must contain at most 32 characters"
    },
    email: {
        uk: "Недійсна електронна адреса",
        ru: "Неверный адрес электронной почты",
        en: "Invalid email"
    },
    mesMin: {
        uk: "Повідомлення має містити щонайменше 15 символів",
        ru: "Сообщение должно содержать не менее 15 символов.",
        en: "Message must contain at least 15 characters"
    },
    mesMax: {
        uk: "Повідомлення повинно містити щонайбільше 512 символів",
        ru: "Сообщение должно содержать не более 512 символов.",
        en: "Message must contain at most 512 characters"
    }
}


export const FeedBackSchema = (lang: Lang) => z.object({
    name: z.string().min(3, errors.nameMin[lang]).max(32, errors.nameMax[lang]),
    email: z.string().email(errors.email[lang]).max(64),
    message: z.string().min(15, errors.mesMin[lang]).max(512, errors.mesMax[lang])
});



const nameMeta = (lang: Lang) => {
    switch (lang) {
        case 'en':
            return {
                label: 'Your name:',
                placeholder: 'Enter your name'
            };

        case 'ru':
            return {
                label: 'Ваше имя:',
                placeholder: 'Введите ваше имя'
            };

        default:
            return {
                label: 'Ваше ім\'я:',
                placeholder: 'Введіть своє ім\'я'
            }
    }
}

const emailMeta = (lang: Lang) => {
    switch(lang) {
        case 'en':
            return {placeholder: 'Enter your e-mail'}
        
        case 'ru':
            return {placeholder: 'Введите свой адрес электронной почты'}

        default:
            return {placeholder: 'Введіть свою електронну адресу'}
    }
}

const mesMeta = (lang: Lang) => {
    switch(lang) {
        case 'en':
            return {label: 'Your message:'}
        
        case 'ru':
            return {label: 'Ваше сообщение:'}

        default:
            return {label: 'Ваше повідомлення:'}
    }
}

export const FeedBackMeta = (lang: Lang): Record<string, IFormField> => {

    return {
        name: {
            type: 'text',
            ... nameMeta(lang)
        },
        email: {
            type: 'email',
            label: 'E-mail:',
            ...emailMeta(lang)
        },
        message: {
            type: 'textarea',
            placeholder: '',
            ...mesMeta(lang)
        }
    }
}