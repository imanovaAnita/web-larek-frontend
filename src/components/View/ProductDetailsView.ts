import { ProductView } from "components/View/ProductView";
import { IActions, IProductItem } from "types";
import { IEvents } from "components/base/events";
import { formatPrice } from "utils/formatters";

/** Модака с подробностями о товаре */
export class ProductDetailsView extends ProductView {
  private textEl: HTMLElement;
  private buttonEl: HTMLButtonElement;

  constructor(
    template: HTMLTemplateElement,
    protected events: IEvents,
    actions?: IActions
  ) {
    super(template, events, actions);

    this.textEl = this.productEl.querySelector('.card__text') as HTMLElement;;
    this.buttonEl = this.productEl.querySelector('.card__button') as HTMLButtonElement;

    this.buttonEl.addEventListener('click', () => {
      this.events.emit('product:addToCart');
    });
  }

  private updateButtonState(product: IProductItem, inCart: boolean): void {
    if (!product.price) {
      this.buttonEl.textContent = 'Не продается';
      this.buttonEl.setAttribute('disabled', 'true');
      return
    }

    if (inCart) {
      this.buttonEl.textContent = 'Уже в корзине';
      this.buttonEl.setAttribute('disabled', 'true');
      return
    }

    this.buttonEl.textContent = 'Купить';
    this.buttonEl.removeAttribute('disabled');
  }

  /** Заполняет карточку товара деталями и возвращает готовый элемент карточки */
  render(product: IProductItem, cartItems: IProductItem[] = []): HTMLElement {
    this.textEl.textContent = product.description;
    this.setProductCategory(product.category);
    this.productTitle.textContent = product.title;
    this.productImage.src = product.image;
    this.productImage.alt = product.title;
    this.productPrice.textContent = formatPrice(product.price);

    const inCart = cartItems.some(item => item.id === product.id);
    this.updateButtonState(product, inCart);

    return this.productEl;
  }
}
