import { IEvents } from "components/base/events";

export class ContactsView {
  private contactsEl: HTMLFormElement;
  private errorsEl: HTMLElement;
  private submitButton: HTMLButtonElement;
  private inputEls: HTMLInputElement[];

  constructor(template: HTMLTemplateElement, protected events: IEvents) {
    const formTemplate = template.content.querySelector('.form');

    this.contactsEl = formTemplate.cloneNode(true) as HTMLFormElement;
    this.errorsEl = this.contactsEl.querySelector('.form__errors');
    this.submitButton = this.contactsEl.querySelector('.button');
    this.inputEls = Array.from(this.contactsEl.querySelectorAll('.form__input')) as HTMLInputElement[]

    this.inputEls.forEach(input => {
      input.addEventListener('input', (event: Event) => {
        const target = event.target as HTMLInputElement;
        this.events.emit('contacts:fieldChange', {
          field: target.name,
          value: target.value
        });
      });
    });

    this.contactsEl.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      this.events.emit('success:open');
    });
  }

  set valid(value: boolean) {
    this.submitButton.disabled = !value;
  }

  get valid(): boolean {
    return !this.submitButton.disabled;
  }

  renderErrors(value: string) {
    this.errorsEl.textContent = value
  }

  render(): HTMLElement {
    return this.contactsEl;
  }

  clear() {
    this.renderErrors('')
    this.inputEls.forEach((input) => input.value = '')
    this.valid = false
  }
}
