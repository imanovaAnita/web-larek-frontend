import { CATTEGORIES_MAP } from "constants/index";
import { IActions, IProductItem } from "types";
import { IEvents } from "components/base/events";
import { formatPrice } from "utils/formatters";

export class ProductView {
  protected productEl: HTMLElement;
  protected productCategory: HTMLElement;
  protected productTitle: HTMLElement;
  protected productImage: HTMLImageElement;
  protected productPrice: HTMLElement;

  constructor(template: HTMLTemplateElement, protected events: IEvents, actions?: IActions) {
    this.productEl = template.content.querySelector('.card').cloneNode(true) as HTMLElement;
    this.productCategory = this.productEl.querySelector('.card__category');
    this.productTitle = this.productEl.querySelector('.card__title');
    this.productImage = this.productEl.querySelector('.card__image');
    this.productPrice = this.productEl.querySelector('.card__price');

    if (actions?.onClick) {
      this.productEl.addEventListener('click', actions.onClick);
    }
  }

  setProductCategory(value: string) {
    this.productCategory.textContent = value;
    this.productCategory.className = `card__category card__category_${CATTEGORIES_MAP[value]}`
  }

  render(product: IProductItem): HTMLElement {
    this.setProductCategory(product.category);
    this.productTitle.textContent = product.title;
    this.productImage.alt = product.title;
    this.productImage.src = product.image;
    this.productPrice.textContent = formatPrice(product.price);

    return this.productEl;
  }
}