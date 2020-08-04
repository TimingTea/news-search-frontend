/* eslint-disable no-undef */
import Popup from './Popup';

export default class PopupReg extends Popup {
  constructor(options) {
    super(options);
  }

  open() {
    this.removeFormErrors();
    this.disableButtons();
    this.resetForm();
    this._open();
  }

  close() {
    this._close();
  }

  submit(event) {
    event.preventDefault();

    const { email, password, name } = this.elements;

    const { mainApi, popupSuccess } = this._dependencies;

    const inputValues = this._getInputFormValues(event, email, password, name);

    this.disableFormInputs();

    this.disableButtons();

    mainApi
      .signup(inputValues)
      .then((res) => {
        if (res.status === '201') {
          this.close();

          popupSuccess.open();
        } else {
          throw new Error(res.message);
        }
      })
      .catch((err) => {
        const { buttonRegError } = this.elements;

        buttonRegError.textContent = err.message.match(/[а-яА-ЯёЁ]+\s?/g).join(' ');
      })
      .finally(() => {
        this.activateFormInputs();

        this.activateButtons();
      });
  }

  setHandlers() {
    const { subButtonLinkAuth, popupCloseButton } = this.elements;

    const { validation, popupAuth } = this._dependencies;

    this._setHandlers([
      { element: popupCloseButton, event: 'click', handler: this.close.bind(this) },
      { element: subButtonLinkAuth, event: 'click', handler: this.close.bind(this) },
      { element: subButtonLinkAuth, event: 'click', handler: popupAuth.open.bind(popupAuth) },
      { element: this.container, event: 'input', handler: validation.validateReg.bind(validation) },
      { element: this.container, event: 'submit', handler: this.submit.bind(this) },
      { element: this.container, event: 'mousedown', handler: this._closePopupOnClickOrEscape.bind(this) },
      { element: document, event: 'keydown', handler: this._closePopupOnClickOrEscape.bind(this) },
    ]);
  }
}
