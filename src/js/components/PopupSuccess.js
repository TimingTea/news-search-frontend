/* eslint-disable no-undef */
import Popup from './Popup';

export default class PopupSuccess extends Popup {
  constructor(options) {
    super(options);
  }

  open() {
    this._open();
  }

  close() {
    this._close();
  }

  setHandlers() {
    const { successAuthLink, popupCloseButton } = this.elements;

    const { popupAuth } = this._dependencies;

    this._setHandlers([
      { element: popupCloseButton, event: 'click', handler: this.close.bind(this) },
      { element: successAuthLink, event: 'click', handler: this.close.bind(this) },
      { element: successAuthLink, event: 'click', handler: popupAuth.open.bind(popupAuth) },
      { element: this.container, event: 'mousedown', handler: this._closePopupOnClickOrEscape.bind(this) },
      { element: document, event: 'keydown', handler: this._closePopupOnClickOrEscape.bind(this) },
    ]);
  }
}
