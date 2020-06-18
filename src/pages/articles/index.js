import './index.css';
// eslint-disable-next-line no-undef
const header = document.querySelector('.header__menu');
// eslint-disable-next-line no-undef
document.querySelector('.header__mobile_buton-close-black').addEventListener('click', () => {
  header.classList.toggle('header__menu_open');
});
