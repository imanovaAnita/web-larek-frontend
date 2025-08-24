import { IEvents } from 'components/base/events';
import { CheckoutField, ECheckoutFieldKey, ECheckoutStep } from 'types'
import { phoneFormatter } from 'utils/formatters';
import { addressValidator, emailValidator, paymentValidator, phoneValidator } from 'utils/validators';

export class CheckoutModel {
    constructor(protected events: IEvents) { }

    private _totalAmount = 0;
    private orderIds: string[] = [];

    /** Поля формы (валидация и события) */
    private readonly fields: Record<ECheckoutFieldKey, CheckoutField> = {
        address: {
            validator: addressValidator,
            step: ECheckoutStep.Order,
            error: '',
            value: '',
        },
        payment: {
            validator: paymentValidator,
            step: ECheckoutStep.Order,
            error: '',
            value: '',
        },
        email: {
            validator: emailValidator,
            step: ECheckoutStep.Contacts,
            error: '',
            value: '',
        },
        phone: {
            validator: phoneValidator,
            formatter: phoneFormatter,
            step: ECheckoutStep.Contacts,
            error: '',
            value: '',
        }
    };

    /** Возвращает ошибки соответствующего шага */
    private getStepErrors(step: ECheckoutStep): string[] {
        return Object.values(this.fields)
            .filter((field) => field.step === step)
            .map((field) => field.error)
            .filter(Boolean)
    }

    /** Обновление поля */
    updateField(field: ECheckoutFieldKey, value: string) {
        const { formatter, step } = this.fields[field]
        const formattedValue = formatter ? formatter(value) : value;
        this.fields[field].value = formattedValue
        this.onUpdateField(step)
    }

    private onUpdateField(step: ECheckoutStep) {
        this.validateStepFields(step)
        this.events.emit(`checkout:${step}Errors`, this.getStepErrors(step));
    }

    /** Валидация поля */
    private validateField(field: CheckoutField) {
        field.error = field.validator(field.value);
    }

    /** Валидация полей шага */
    public validateStepFields(step: ECheckoutStep) {
        Object.values(this.fields).filter((field) => field.step === step).forEach((field) => this.validateField(field))
    }

    /** Устанавливает список заказов */
    public setOrderIds(value: string[]) {
        this.orderIds = value
    }

    /** Устанавливает список заказов */
    set totalAmount(value: number) {
        this._totalAmount = value
    }

    get totalAmount() {
        return this._totalAmount
    }

    /** Данные заказа */
    get orderData() {
        return {
            payment: this.fields.payment.value,
            address: this.fields.address.value,
            email: this.fields.email.value,
            phone: this.fields.phone.value,
            total: this._totalAmount,
            items: [...this.orderIds],
        };
    }
}
