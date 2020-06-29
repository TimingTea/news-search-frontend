/* eslint-disable no-undef */
const ARTICLE_CARD = {
  container: {
    article: document.querySelector('.articles'),
  },
  elements: {
    article: '.article',
    actionBlock: '.article__paragraph',
    notAddedIcon: 'article__button_not-bookmark',
    addedIcon: 'article__button_added-bookmark',
    deleteIcon: 'article__button_delete-art',
    mainArticle: 'articles_main',
  },
  props: {
    actionBlockOpened: 'article__paragraph_opened ',
  },
  description: {
    searchedArticlesDescription: 'Войдите, чтобы сохранять статьи',
    savedArticlesDescription: 'Убрать из сохранённых',
  },
};

export default ARTICLE_CARD;
