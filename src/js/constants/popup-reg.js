/* eslint-disable no-undef */
const POPUP_REG = {
  container: document.querySelector('.popup__page-reg'),
  elements: {
    form: document.querySelector('.popup__form_reg'),
    buttonRegError: document.querySelector('.error-registration'),
    allButtonErrors: document.querySelector('.popup__form_reg').querySelectorAll('.popup__error'),
    allFormInputs: document.querySelector('.popup__form_reg').querySelectorAll('.popup__input'),
    popupCloseButton: document.querySelector('.popup__close_reg'),
    subButtonLink: 'popup__sub-button',
    subButtonLinkAuth: document.querySelector('.popup__sub-button-link_auth'),
    email: '.popup__input_email',
    password: '.popup__input_password',
    name: '.popup__input_name',
  },
  props: {
    regPopupOpened: 'popup_is-opened',
  },
};

export default POPUP_REG;
