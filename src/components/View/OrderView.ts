import { IEvents } from "components/base/events";
import { FormView } from "components/view/FormView";
import { ECheckoutFieldKey } from "types/index";

export class OrderView extends FormView {
  private paymentButtons: HTMLButtonElement[];

  constructor(template: HTMLTemplateElement, events: IEvents) {
    super(template, events, {
      formSelector: '.form',
      errorsSelector: '.form__errors',
      submitSelector: '.order__button',
      inputSelector: '.form__input',
      inputChangeEvent: 'order:fieldChange',
      submitEvent: 'contacts:open',
    });

    this.paymentButtons = Array.from(
      this.formEl.querySelectorAll('.button_alt')
    ) as HTMLButtonElement[];

    this.paymentButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.payment = btn.name;
        this.events.emit('order:fieldChange', {
          field: ECheckoutFieldKey.Payment,
          value: btn.name,
        });
        this.events.emit('order:paymentChange', btn);
      });
    });
  }

  set payment(paymentMethod: string) {
    this.paymentButtons.forEach((item) => {
      item.classList.toggle('button_alt-active', item.name === paymentMethod);
    });
  }

  clear() {
    super.clear();
    this.paymentButtons.forEach((item) => {
      item.classList.remove('button_alt-active');
    });
  }
}