import { createElement } from "utils/utils";
import { IEvents } from "components/base/events";

export class CartView {
  private cartRoot: HTMLElement;
  private titleEl: HTMLElement;
  private itemListEl: HTMLElement;
  private checkoutBtn: HTMLButtonElement;
  private totalEl: HTMLElement;


  constructor(template: HTMLTemplateElement, protected events: IEvents) {
    const cartRoot = template.content.querySelector('.basket').cloneNode(true) as HTMLElement;
    this.cartRoot = cartRoot;
    this.itemListEl = cartRoot.querySelector('.basket__list');
    this.totalEl = cartRoot.querySelector('.basket__price');
    this.titleEl = cartRoot.querySelector('.modal__title');
    this.checkoutBtn = cartRoot.querySelector('.basket__button');

    this.checkoutBtn.addEventListener('click', () => { this.events.emit('order:open') });
    this.setItems([]);
  }

  setItems(items: HTMLElement[]) {
    if (items.length) {
      this.itemListEl.replaceChildren(...items);
      this.checkoutBtn.removeAttribute('disabled');
      return
    }

    this.checkoutBtn.setAttribute('disabled', 'disabled');
    this.itemListEl.replaceChildren(
      createElement<HTMLParagraphElement>('p', { textContent: 'Корзина пуста' })
    );
  }

  updateTotal(amount: number) {
    this.totalEl.textContent = `${amount} синапсов`;
  }

  render() {
    this.titleEl.textContent = 'Корзина';
    return this.cartRoot;
  }
}
