import { IEvents } from "components/base/events";

export class MainView {
  private pageWrapperEl: HTMLElement;
  private openCartBtn: HTMLButtonElement;
  private cartCounterEl: HTMLElement;
  private galeryEl: HTMLElement;

  constructor(protected events: IEvents) {
    this.pageWrapperEl = document.querySelector('.page__wrapper');

    this.openCartBtn = this.pageWrapperEl.querySelector('.header__basket');
    this.cartCounterEl = this.pageWrapperEl.querySelector('.header__basket-counter');
    this.galeryEl = this.pageWrapperEl.querySelector('.gallery');

    this.openCartBtn.addEventListener('click', () => { this.events.emit('cart:open') });

  }

  setItems(productElements: HTMLElement[]) {
    this.galeryEl.replaceChildren(...productElements);
  }

  updateCounter(count: number) {
    this.cartCounterEl.textContent = String(count);
  }

  lock(value: boolean) {
    if (value) {
      this.pageWrapperEl.classList.add('page__wrapper_locked');
      return
    }

    this.pageWrapperEl.classList.remove('page__wrapper_locked');
  }
}