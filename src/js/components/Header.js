/* eslint-disable no-undef */
import BaseComponent from './BaseComponent';

export default class Header extends BaseComponent {
  constructor(options) {
    super(options);
  }

  setLogHeaderNav(userName) {
    this._setLogHeaderNav();

    this._setButtonLoginText(userName);
  }

  setUnlogHeaderNav() {
    this._setUnlogHeaderNav();
  }

  _toggleBurgerMenu() {
    const { headerToggle, headerMain, headerSaved } = this.elements;

    const { toggleLightOpened, toggleDarkOpened } = this.props;

    if (this._isHeader(headerMain)) {
      headerToggle.classList.toggle(toggleLightOpened);

      this._toggleBurgerPopup();
    } else if (this._isHeader(headerSaved)) {
      headerToggle.classList.toggle(toggleDarkOpened);

      this._toggleBurgerPopup();
    }
  }

  _setLogHeaderNav() {
    const { buttonAuth, savedArticlesLink, buttonLogin } = this.elements;

    const { navItemVisible } = this.props;

    buttonAuth.classList.remove(navItemVisible);
    savedArticlesLink.classList.add(navItemVisible);
    buttonLogin.classList.add(navItemVisible);
  }

  _setUnlogHeaderNav() {
    const { buttonAuth, savedArticlesLink, buttonLogin } = this.elements;

    const { navItemVisible } = this.props;

    buttonAuth.classList.add(navItemVisible);
    savedArticlesLink.classList.remove(navItemVisible);
    buttonLogin.classList.remove(navItemVisible);
  }

  _setButtonLoginText(userName) {
    const { buttonLoginText } = this.elements;

    buttonLoginText.textContent = userName;
  }

  _isHeader(headerName) {
    return this.container.classList.contains(headerName);
  }

  _toggleBurgerPopup() {
    const { navLinks, popupNavLinks } = this.elements;

    const { navLinksOpened, headerPopupOpened } = this.props;

    navLinks.classList.toggle(navLinksOpened);
    popupNavLinks.classList.toggle(headerPopupOpened);
  }

  _logout() {
    const { headerSaved } = this.elements;

    const { mainApi, storage, redirectTo } = this._dependencies;

    mainApi
      .logout()
      .then((res) => {
        if (res.status === '200') {
          this.setUnlogHeaderNav();

          storage.resetProperties('userName', 'articles', 'keyword');

          if (this.container.classList.contains(headerSaved)) {
            redirectTo('../');
          }
        } else {
          throw new Error(res.message);
        }
      })
      .catch((err) => console.log(err));
  }

  _closeBurgerMenuOnClickOrEscape(event) {
    const { popupNavLinks } = this.elements;

    const { headerPopupOpened } = this.props;

    if (event.key === 'Escape' && popupNavLinks.classList.contains(headerPopupOpened)) {
      this._toggleBurgerMenu();
    }
  }

  setHandlers() {
    const {
      headerToggle, popupNavLinks, buttonLogin, headerMain, buttonAuth,
    } = this.elements;

    this._setHandlers([
      { element: headerToggle, event: 'click', handler: this._toggleBurgerMenu.bind(this) },
      { element: popupNavLinks, event: 'mousedown', handler: this._toggleBurgerMenu.bind(this) },
      { element: document, event: 'keydown', handler: this._closeBurgerMenuOnClickOrEscape.bind(this) },
      { element: buttonLogin, event: 'click', handler: this._logout.bind(this) },
    ]);

    if (this.container.classList.contains(headerMain)) {
      const { popupAuth } = this._dependencies;

      this._setHandlers([{ element: buttonAuth, event: 'click', handler: popupAuth.open.bind(popupAuth) }]);
    }
  }
}
