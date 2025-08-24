/** Форматирует номер телефона */
export function phoneFormatter(value: string): string {
    if (value.startsWith('8')) {
        return '+7' + value.slice(1);
    }

    return value;
}

/** Форматирует цену для отображения */
export function formatPrice(price: number | null): string {
    return price === null ? 'Бесценно' : `${price} синапсов`;
}