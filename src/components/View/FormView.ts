import { IEvents } from "components/base/events";

type FormOptions = {
    formSelector: string;
    errorsSelector: string;
    submitSelector: string;
    inputSelector: string;
    inputChangeEvent: string;
    submitEvent: string;
};

export class FormView {
    protected formEl: HTMLFormElement;
    protected errorsEl: HTMLElement;
    protected submitButton: HTMLButtonElement;
    protected inputEls: HTMLInputElement[];

    constructor(
        template: HTMLTemplateElement,
        protected events: IEvents,
        {
            formSelector,
            errorsSelector,
            submitSelector,
            inputSelector,
            inputChangeEvent,
            submitEvent,
        }: FormOptions
        
    ) {
        const formTemplate = template.content.querySelector(formSelector);
        this.formEl = formTemplate!.cloneNode(true) as HTMLFormElement;

        this.errorsEl = this.formEl.querySelector(errorsSelector)!;
        this.submitButton = this.formEl.querySelector(submitSelector)!;
        this.inputEls = Array.from(this.formEl.querySelectorAll(inputSelector)) as HTMLInputElement[];

        this.inputEls.forEach((input) => {
            input.addEventListener('input', (event: Event) => {
                const target = event.target as HTMLInputElement;
                this.events.emit(inputChangeEvent, {
                    field: target.name,
                    value: target.value,
                });
            });
        });

        this.formEl.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            this.events.emit(submitEvent);
        });
    }

    set valid(value: boolean) {
        this.submitButton.disabled = !value;
    }

    renderErrors(value: string) {
        this.errorsEl.textContent = value;
    }

    render(): HTMLElement {
        return this.formEl;
    }

    clear() {
        this.renderErrors('');
        this.inputEls.forEach((input) => (input.value = ''));
        this.valid = false;
    }
}