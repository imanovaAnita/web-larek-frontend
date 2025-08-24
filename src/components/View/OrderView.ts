import { ECheckoutFieldKey } from "types/index";
import { IEvents } from "../base/events";

export class OrderView {
  orderEl: HTMLFormElement;
  errorsEl: HTMLElement;
  paymentButtons: HTMLButtonElement[];
  submitButton: HTMLButtonElement;
  inputEls: HTMLInputElement[];

  constructor(template: HTMLTemplateElement, protected events: IEvents) {
    this.orderEl = template.content.querySelector('.form').cloneNode(true) as HTMLFormElement;
    this.errorsEl = this.orderEl.querySelector('.form__errors');
    this.paymentButtons = Array.from(this.orderEl.querySelectorAll('.button_alt'));
    this.submitButton = this.orderEl.querySelector('.order__button');

    this.paymentButtons.forEach(item => {
      item.addEventListener('click', () => {
        this.payment = item.name;
        events.emit('order:fieldChange', { field: ECheckoutFieldKey.Payment, value: item.name });
        events.emit('order:paymentChange', item);
      });
    });

    this.inputEls = Array.from(this.orderEl.querySelectorAll('.form__input')) as HTMLInputElement[]

    this.inputEls.forEach(input => {
      input.addEventListener('input', (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.events.emit('contacts:fieldChange', {
          field: target.name,
          value: target.value
        });
      });
    });

    this.orderEl.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      this.events.emit('contacts:open');
    });
  }


  set payment(paymentMethod: string) {
    this.paymentButtons.forEach(item => {
      item.classList.toggle('button_alt-active', item.name === paymentMethod);
    })
  }

  set valid(value: boolean) {
    this.submitButton.disabled = !value;
  }

  render() {
    return this.orderEl
  }

  renderErrors(value: string) {
    this.errorsEl.textContent = value
  }

  clear() {
    this.renderErrors('')
    this.paymentButtons.forEach(item => {
      item.classList.remove('button_alt-active');
    })
    this.inputEls.forEach((input) => input.value = '')
    this.valid = false
  }
}