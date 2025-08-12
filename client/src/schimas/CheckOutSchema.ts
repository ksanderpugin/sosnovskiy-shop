export const CheckOutSchema = {
    firstName: {
        id: "firstName",
        type: "text",
        name: "first-name",
        label: {
            uk: "Ім'я",
            ru: "Имя",
            en: "First name"
        },
        placeholder: {
            uk: "Введіть своє ім'я",
            ru: "Введите ваше имя",
            en: "Enter your first name"
        },
        require: true
    },

    lastName: {
        id: "lastName",
        type: "text",
        name: "last-name",
        label: {
            uk: "Прізвище",
            ru: "Фамилия",
            en: "Last name"
        },
        placeholder: {
            uk: "Введіть своє прізвище",
            ru: "Введите вашу фамилию",
            en: "Enter your last name"
        },
        require: true
    },

    contactBy: {
        name: "contact-by",
        label: {
            uk: "Як з вами зв`язатися?",
            ru: "Как с вами связаться?",
            en: "How to contact you?"
        },
        options: [
            {
                value: "call",
                title: {
                    uk: "Зателефонувати",
                    ru: "Позвонить",
                    en: "Call"
                }
            },
            {
                value: "viber",
                title: {
                    uk: "Написати у Viber",
                    ru: "Написать в Viber",
                    en: "Contact on Viber"
                }
            },
            {
                value: "telegram",
                title: {
                    uk: "Написати у Telegram",
                    ru: "Написать в Telegram",
                    en: "Contact on Telegram"
                }
            }
        ]
    },

    deliveryBy: {
        label: {
            uk: "Спосіб доставки",
            ru: "Способ доставки",
            en: "Delivery method"
        },
        options: [
            {
                value: 'npo',
                title: {
                    uk: "Відправка на відділення Нової пошти",
                    ru: "Отправка на отделение Новой почты",
                    en: "Sending to the Nova Post office"
                }
            },
            {
                value: 'npp',
                title: {
                    uk: "Відправка у поштомат Нової пошти",
                    ru: "Отправка в почтомат Новой почты",
                    en: "Sending to the Nova Post parcel terminal"
                }
            },
            {
                value: 'npa',
                title: {
                    uk: "Адресна доставка кур'єром Нової пошти",
                    ru: "Адресная доставка курьером Новой почты",
                    en: "Address delivery by courier Nova Post"
                }
            },
            {
                value: 'pu',
                title: {
                    uk: "Самовивіз",
                    ru: "Самовывоз",
                    en: "Pickup"
                }
            }
        ]
    },

    city: {
        id: "city",
        type: "text",
        name: "city",
        label: {
            uk: "Вкажіть населений пункт України",
            ru: "Укажите населенный пункт Украины",
            en: "Specify the settlement in Ukraine"
        },
        placeholder: {
            uk:"Введіть своє місто/селище",
            en:"Enter your city",
            ru:"Введите ваш город/село"
        },
        require: false
    },

    address: {
        id: "address",
        type: "text",
        name: "address",
        label: {
            uk: "Ваша адреса",
            ru: "Ваш адрес",
            en: "Your address"
        },
        placeholder: {
            uk:"",en:"",ru:""
        },
        require: false
    },

    pickUpPoint: {
        label: {
            uk: "Точка самовивозу",
            ru: "Точка самовывоза",
            en: "Pick-up point"
        }
    },
}