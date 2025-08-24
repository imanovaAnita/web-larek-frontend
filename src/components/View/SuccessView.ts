import { IEvents } from "../base/events";

/** Отображает модальное окно успешного завершения заказа */
export class SuccessView {
  successEl: HTMLElement;
  descriptionEl: HTMLElement;
  closeButton: HTMLButtonElement;

  constructor(template: HTMLTemplateElement, protected events: IEvents) {
    this.successEl = template.content.querySelector('.order-success').cloneNode(true) as HTMLElement;
    this.descriptionEl = this.successEl.querySelector('.order-success__description');
    this.closeButton = this.successEl.querySelector('.order-success__close');

    this.closeButton.addEventListener('click', () => { events.emit('success:close') });
  }

  render(totalAmount: number) {
    this.descriptionEl.textContent = String(`Списано ${totalAmount} синапсов`);
    return this.successEl
  }
}

