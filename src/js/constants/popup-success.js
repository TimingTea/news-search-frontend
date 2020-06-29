/* eslint-disable no-undef */
const POPUP_SUCCESS = {
  container: document.querySelector('.success'),
  elements: {
    successAuthLink: document.querySelector('.success__link'),
    popupCloseButton: document.querySelector('.popup__close_success'),
  },
  props: {
    successPopupOpened: 'popup_is-opened',
  },
};

export default POPUP_SUCCESS;
