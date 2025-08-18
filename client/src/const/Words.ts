export const Words = {
    footerText: {
        uk: 'Інтернет магазин Сосновський',
        en: 'Online market Sosnovskiy',
        ru: 'Интернет магазин Сосновский'
    },
    main: {
        uk: 'Головна',
        en: 'Main',
        ru: 'Главная'
    },
    products: {
        uk: 'Продукція',
        en: 'Products',
        ru: 'Продукция'
    },
    aboutUs: {
        'uk': 'Про нас',
        'en': 'About us',
        'ru': 'О нас'
    },
    shipping: {
        'uk': 'Доставка і оплата',
        'en': 'Shipping and payment',
        'ru': 'Доставка и оплата'
    },
    contacts: {
        'uk': 'Контакти',
        'en': 'Contacts',
        'ru': 'Контакты'
    },
    login: {
        'uk': 'Вхід',
        'en': 'Login',
        'ru': 'Войти'
    },
    signup: {
        'uk': 'Реєстрація',
        'en': 'Sign up',
        'ru': 'Регистрация'
    },
    basket: {
        'uk': 'Кошик',
        'en': 'Basket',
        'ru': 'Корзина'
    },
    allProducts: {
        'uk': 'Вся продукція',
        'en': 'All products',
        'ru': 'Вся продукция'
    },
    toBasket: {
        'uk': 'Додати до кошика',
        'en': 'Add to basket',
        'ru': 'Добавить в корзину'
    },
    packNames: {
        'uk': [
            '',
            'Ціла',
            'Половина',
            '',
            'Упаковка'
        ],
        'ru': [
            '',
            'Палка',
            'Пол палки',
            '',
            'Упаковка'
        ],
        'en': [
            '',
            'Causage',
            'Half-causage',
            '',
            'Package'
        ]
    },
    ingredients: {
        'uk': 'Склад',
        'en': 'Ingredients',
        'ru': 'Состав'
    },
    dayNames: {
        'uk': ["Неділя","Понеділок","Вівторок","Середа","Четвер","Пʼятниця","Субота"],
        'en': ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
        'ru': ["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"]
    },
    monthNames: {
        'uk': ['',"січня","лютого","березня","квітня","травня","червня","липня","серпня","вересня","жовтня","листопада","грудня"],
        'en': ['',"January","February","March","April","May","June","July","August","September","October","November","December"],
        'ru': ['',"января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"]
    },
    orderStates: [
        {
            uk: 'Нове замовлення',
            en: 'New',
            ru: 'Новый заказ'
        },
        {
            uk: 'Обробляється',
            en: 'In progress',
            ru: 'Обрабатывается'
        },
        {
            uk: 'підтверджено',
            en: 'confirmed',
            ru: 'подтверждён'
        }
    ],
    deliveryTypes: [
        {
            uk: 'Самовивіз з магазину',
            en: 'Pick up from the store',
            ru: 'Самовывоз с магазина'
        },
        {
            uk: 'Відправка Новой Поштою',
            en: 'Sending by Nova Post',
            ru: 'Отправка Новой Почтой'
        }
    ],
    checkOut: {
        uk: 'Замовлення',
        en: 'Check Out',
        ru: 'Заказ'
    },
    uah: {
        uk: 'грн',
        ru: 'грн',
        en: 'UAH'
    },
    totalOrdreSum: (num: number, sum: number) => {
        return {
            uk: `Всього ${num} уп. на суму ${sum}* грн`,
            en: `A total of ${num} packages for ${sum}* UAH`,
            ru: `Всего ${num} уп на сумму ${sum}* грн`
        }
    },
    sumMessage: {
        uk: 'Сума замовлення вказана приблизно та може відрізнятись від підсумкової на 10 - 15%',
        ru: 'Сумма заказа указана приблизительно и может отличаться от итоговой на 10 - 15%',
        en: 'The order amount is approximate and may differ from the final amount by 10 - 15%'
    },
    weightMessage: {
        uk: 'Вага упаковки вказана приблизно та може відрізнятись від підсумкової на 10 - 15%',
        ru: 'Вес упаковки указан приблизительно и может отличаться от итогового на 10 - 15%',
        en: 'The weight of the package is approximate and may differ from the final amount by 10 - 15%'
    },
    phone: {
        uk: "Номер телефону",
        ru: "Номер телефона",
        en: "Phone"
    },
    npOffice: {
        uk: "Номер відділення",
        ru: "Номер отделения",
        en: "Post office"
    },
    npTerminal: {
        uk: "Номер поштомату",
        ru: "Номер почтомата",
        en: "Post terminal"
    },
    pricePerKg: {
        uk: "Ціна за кілограм",
        ru: "Цена за килограмм",
        en: "Price per kilogram"
    },
    packWeight: {
        uk: "Вага упаковки",
        ru: "Вес упаковки",
        en: "Package weight"
    },
    selectPack: {
        uk: "Виберіть упаковку",
        ru: "Выберите упаковку",
        en: "Select packaging"
    },
    orderStatus: {
        uk: "Статус замовлення",
        ru: "Статус заказа",
        en: "Order status"
    },
    customer: {
        uk: "Замовник",
        ru: "Заказчик",
        en: "Customer"
    },
    order: {
        uk: "Замовлення",
        ru: "Заказ",
        en: "Order"
    },
    contactCenter: {
        uk: "Контактний центр",
        ru: "Контактный центр",
        en: "Contact Center"
    },
    orderProcessing: {
        uk: "Обробка замовлень",
        ru: "Оброботка заказов",
        en: "Order processing"
    },
    processingTime: {
        uk: "Пн-Сб з 10:00 до 20:00",
        ru: "Пн-Сб с 10:00 до 20:00",
        en: "Mon-Sat from 10:00 to 20:00"
    },
    shopsMap: {
        uk: "Мапа наших офлайн магазинів",
        ru: "Карта наших офлайн магазинов",
        en: "Offline stores map"
    },
    feedbackForm: {
        uk: "Форма зворотного зв`язку",
        ru: "Форма обратной связи",
        en: "Feedback form"
    },
    submit: {
        uk: "Відправити",
        ru: "Отправить",
        en: "Submit"
    },
    sentMes: {
        uk: "Ваше повідомлення надіслано. Дякуємо!",
        ru: "Ваше сообщение отправлено. Спасибо!",
        en: "Your messege sent. Thanks!"
    },
    shopThanks: {
        uk: "Дякуємо за замовлення!",
        ru: "Спасибо за заказ!",
        en: "Thank you for shopping!"
    },
    fieldMinError: (fieldName: string) => {
        return {
            uk: `${fieldName} не може бути коротшим за 3 символи!`,
            ru: `${fieldName} не может быть короче 3 символов!`,
            en: `${fieldName} cannot be shorter than 3 characters!`
        }
    },
    fieldMaxError: (fieldName: string) => {
        return {
            uk: `${fieldName} не може бути довше за 32 символи!`,
            ru: `${fieldName} не может быть длиннее 32 символов!`,
            en: `${fieldName} cannot be longer than 32 characters!`
        }
    },
    phoneError: {
        uk: "Введіть дійсний номер телефону!",
        ru: "Введите действительный номер телефона!",
        en: "Enter valid phone number!"
    }
}