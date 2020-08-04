/* eslint-disable no-undef */
const ARTICLES_BLOCK = {
  container: document.querySelector('.articles'),
  elements: {
    list: document.querySelector('.articles__list'),
    showMoreButton: document.querySelector('.articles__show-more'),
  },
  props: {
    articlesOpened: 'articles__visible',
  },

};

export default ARTICLES_BLOCK;
