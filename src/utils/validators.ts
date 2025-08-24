/** Валидатор адреса доставки */
export function addressValidator(value: string) {
    const addressRegexp = /^[а-яА-ЯёЁa-zA-Z0-9\s\/.,-]{7,}$/;

    if (!value) {
        return 'Необходимо указать адрес';
    }

    if (!addressRegexp.test(value)) {
        return 'Укажите настоящий адрес';
    }

    return ''
}

/** Валидатор способа оплаты */
export function paymentValidator(value: string) {
    if (!value) {
        return 'Выберите способ оплаты';
    }

    return '';
}

/** Валидатор email */
export function emailValidator(value: string) {
    const emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!value) {
        return 'Необходимо указать email';
    }

    if (!emailRegexp.test(value)) {
        return 'Некорректный адрес электронной почты';
    }

    return '';
}

/** Валидатор номера телефона */
export function phoneValidator(value: string) {
    const phoneRegexp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10}$/;

    if (!value) {
        return 'Необходимо указать телефон';
    }

    if (!phoneRegexp.test(value)) {
        return 'Некорректный формат номера телефона';
    }

    return '';
}