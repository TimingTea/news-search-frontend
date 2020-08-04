import BaseComponent from './BaseComponent';

export default class Popup extends BaseComponent {
  constructor(options) {
    super(options);
  }

  removeFormErrors() {
    const { allButtonErrors } = this.elements;

    allButtonErrors.forEach((error) => {
      error.textContent = '';
    });
  }

  resetForm() {
    const { form } = this.elements;

    form.reset();
  }

  _open() {
    this.container.classList.add('popup_is-opened');
  }

  _close() {
    this.container.classList.remove('popup_is-opened');
  }

  _getInputFormValues(event, ...args) {
    return args.map((arg) => event.currentTarget.querySelector(arg).value);
  }

  _closePopupOnClickOrEscape(event) {
    if (event.key === 'escape' || event.target.classList.contains('popup')) {
      this.close();
    }
  }
}
