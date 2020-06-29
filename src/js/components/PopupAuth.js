/* eslint-disable no-undef */
import Popup from './Popup';

export default class PopupAuth extends Popup {
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

    const { email, password } = this.elements;

    const { header, mainApi, storage } = this._dependencies;

    const inputValues = this._getInputFormValues(event, email, password);

    this.disableFormInputs();

    this.disableButtons();

    mainApi
      .signin(inputValues)
      .then((res) => {
        if (res.status === '200') {
          return mainApi.getUserData();
        }
        throw new Error(res.message);
      })
      .then((res) => {
        if (res.status === '200') {
          storage.setPropertyValue('userName', res.data.name);

          header.setLogHeaderNav(storage.getPropertyValue('userName'));

          this.close();
        } else {
          throw new Error(res.message);
        }
      })
      .catch((err) => {
        const { buttonAuthError } = this.elements;

        buttonAuthError.textContent = err.message;
      })
      .finally(() => {
        this.activateFormInputs();

        this.activateButtons();
      });
  }

  setHandlers() {
    const { subButtonLinkReg, popupCloseButton } = this.elements;

    const { validation, popupReg } = this._dependencies;

    this._setHandlers([
      { element: popupCloseButton, event: 'click', handler: this.close.bind(this) },
      { element: subButtonLinkReg, event: 'click', handler: this.close.bind(this) },
      { element: subButtonLinkReg, event: 'click', handler: popupReg.open.bind(popupReg) },
      { element: this.container, event: 'input', handler: validation.validateAuth.bind(validation) },
      { element: this.container, event: 'submit', handler: this.submit.bind(this) },
      { element: this.container, event: 'mousedown', handler: this._closePopupOnClickOrEscape.bind(this) },
      { element: document, event: 'keydown', handler: this._closePopupOnClickOrEscape.bind(this) },
    ]);
  }
}
