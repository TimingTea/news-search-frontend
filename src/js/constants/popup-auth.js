/* eslint-disable no-undef */
const POPUP_AUTH = {
  container: document.querySelector('.popup__page-auth'),
  elements: {
    form: document.querySelector('.popup__form_auth'),
    buttonAuthError: document.querySelector('.error-authorization'),
    allButtonErrors: document.querySelector('.popup__form_auth').querySelectorAll('.popup__error'),
    allFormInputs: document.querySelector('.popup__form_auth').querySelectorAll('.popup__input'),
    popupCloseButton: document.querySelector('.popup__close_auth'),
    subButtonLink: 'popup__sub-button',
    subButtonLinkReg: document.querySelector('.popup__sub-button-link_reg'),
    email: '.popup__input_email',
    password: '.popup__input_password',
  },
  props: {
    authPopupOpened: 'popup_is-opened',
  },
};

export default POPUP_AUTH;
