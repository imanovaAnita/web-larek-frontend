import { createElement } from "utils/utils";
import { IEvents } from "components/base/events";

export class CartView {
  private cartRoot: HTMLElement;
  private titleEl: HTMLElement;
  private itemListEl: HTMLElement;
  private checkoutBtn: HTMLButtonElement;
  private totalEl: HTMLElement;
  private openCartBtn: HTMLButtonElement;
  private cartCounterEl: HTMLElement;

  constructor(template: HTMLTemplateElement, protected events: IEvents) {
    const cartRoot = template.content.querySelector('.basket').cloneNode(true) as HTMLElement;
    this.cartRoot = cartRoot;
    this.itemListEl = cartRoot.querySelector('.basket__list');
    this.totalEl = cartRoot.querySelector('.basket__price');
    this.titleEl = cartRoot.querySelector('.modal__title');
    this.checkoutBtn = cartRoot.querySelector('.basket__button');

    this.openCartBtn = document.querySelector('.header__basket');
    this.cartCounterEl = document.querySelector('.header__basket-counter');

    this.openCartBtn.addEventListener('click', () => { this.events.emit('cart:open') });
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

  updateCounter(count: number) {
    this.cartCounterEl.textContent = String(count);
  }

  updateTotal(amount: number) {
    this.totalEl.textContent = `${amount} синапсов`;
  }

  render() {
    this.titleEl.textContent = 'Корзина';
    return this.cartRoot;
  }
}
