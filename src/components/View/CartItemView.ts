import { IActions, IProductItem } from "types";
import { IEvents } from "components/base/events";
import { formatPrice } from "utils/formatters";

export class CartItemView {
  private cartItem: HTMLElement;
  private title: HTMLElement;
  private index: HTMLElement;
  private price: HTMLElement;
  private deleteButton: HTMLButtonElement;

  constructor(template: HTMLTemplateElement, protected events: IEvents, actions?: IActions) {
    this.cartItem = template.content.querySelector('.basket__item').cloneNode(true) as HTMLElement;
    this.index = this.cartItem.querySelector('.basket__item-index');
    this.title = this.cartItem.querySelector('.card__title');
    this.price = this.cartItem.querySelector('.card__price');
    this.deleteButton = this.cartItem.querySelector('.basket__item-delete');

    if (actions?.onClick) {
      this.deleteButton.addEventListener('click', actions.onClick);
    }
  }

  /** Заполняет DOM-элемент данными и возвращает готовый элемент корзины */
  render(product: IProductItem, index: number): HTMLElement {
    this.index.textContent = String(index);
    this.title.textContent = product.title;
    this.price.textContent = formatPrice(product.price);
    return this.cartItem;
  }
}