import { IEvents } from "components/base/events";
import { FormView } from "components/view/FormView";

export class ContactsView extends FormView {
  constructor(template: HTMLTemplateElement, events: IEvents) {
    super(template, events, {
      formSelector: '.form',
      errorsSelector: '.form__errors',
      submitSelector: '.button',
      inputSelector: '.form__input',
      inputChangeEvent: 'contacts:fieldChange',
      submitEvent: 'success:open',
    });
  }
}