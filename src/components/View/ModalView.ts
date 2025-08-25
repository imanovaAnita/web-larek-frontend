import { IEvents } from "components/base/events";

export class ModalView {
  protected modalContainer: HTMLElement;
  protected closeButton: HTMLButtonElement;
  protected content: HTMLElement;
  protected pageWrapper: HTMLElement;

  constructor(modalContainer: HTMLElement, protected events: IEvents) {
    this.pageWrapper = document.querySelector('.page__wrapper');
    this.modalContainer = modalContainer;
    this.content = modalContainer.querySelector('.modal__content');
    this.closeButton = modalContainer.querySelector('.modal__close');

    this.closeButton.addEventListener('click', this.close.bind(this));
    this.modalContainer.addEventListener('click', this.close.bind(this));
    this.modalContainer.querySelector('.modal__container').addEventListener('click', event => event.stopPropagation());
  }


  /** открывает модальное окно */
  open() {
    this.modalContainer.classList.add('modal_active');
    this.events.emit('modal:open')
  }

  /** Закрывает модальное окно */
  close() {
    this.setContent(null);
    this.modalContainer.classList.remove('modal_active');
    this.events.emit('modal:close')
  }

  /** Устанавливает контент модального окна */
  setContent(value: HTMLElement) {
    this.content.replaceChildren(value);
  }
}