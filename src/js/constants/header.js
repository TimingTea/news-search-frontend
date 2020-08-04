/* eslint-disable no-undef */
const HEADER = {
  container: document.querySelector('.header'),
  elements: {
    navLinks: document.querySelector('.header__menu'),
    popupNavLinks: document.querySelector('.popup__mobile'),
    savedArticlesLink: document.querySelector('.header__menu_item_articles'),
    buttonAuth: document.querySelector('.header__nav-item_auth'),
    buttonLogin: document.querySelector('.header__menu_item-login'),
    buttonLoginText: document.querySelector('.header__button_white-logout'),
    buttonItemAuth: 'header__button_auth',
    headerMain: 'header_main',
    headerSaved: 'header_saved',
    headerToggle: document.querySelector('.header__mobile_buton'),
    header__popup: 'header__popup',
  },
  props: {
    navItemVisible: 'header__menu_item-mobile',
    toggleLightOpened: 'header__mobile_buton-open',
    toggleDarkOpened: 'header__mobile_buton-open-black',
    navLinksOpened: 'header__menu_open',
    headerPopupOpened: 'popup_is-opened',
  },
};

export default HEADER;
