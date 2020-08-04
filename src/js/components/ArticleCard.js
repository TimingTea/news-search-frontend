/* eslint-disable max-len */
import BaseComponent from './BaseComponent';

export default class ArticleCard extends BaseComponent {
  constructor(options) {
    super(options);
  }

  create(article, searchKeyword, articlesContainer) {
    const {
      checkImageUrl, dates, deleteListTags, MONTHS,
    } = this._dependencies;

    const {
      text, date, source, title, link, image, keyword, id = ' ',
    } = this._getArticlesProps(
      articlesContainer,
      article,
      searchKeyword,
    );

    return `<div class="article" id="${id}">
        <div class="article__container">
        <p class="article__search-keyword" style="display: ${this._setKeywordVisibility(articlesContainer)};">${keyword}</p>
          <p class="article__paragraph">${this._setActionDescription(articlesContainer)}</p>
          <button type="button" class="article__button_bookmark ${this._setActionButton(articlesContainer)}"></button>
        </div>
        <a href="${link}" class="article__link" target="_blank">
          <img src="${checkImageUrl(image)}" alt="" class="article__image">
          <div class="article__description">
            <time class="article__date" datetime="${dates.parseDate(date, MONTHS).attributeDate}">${dates.parseDate(date, MONTHS).textDate}</time>
            <h3 class="article__title">${title}</h3>
            <p class="article__text">${deleteListTags(text, articlesContainer)}</p>
            <p class="article__source">${source}</p>
          </div>
        </a>
      </div>`;
  }


  _getArticlesProps(articlesContainer, article, searchKeyword) {
    const { articleProps } = this._dependencies;

    if (this._isSearchedArticles(articlesContainer)) {
      return articleProps.getSearchedProps(article, searchKeyword);
    }

    return articleProps.getSavedProps(article);
  }

  _isSearchedArticles(articlesContainer) {
    const { mainArticle } = this.elements;

    return articlesContainer.classList.contains(mainArticle);
  }

  _setIdToArticle(event, id) {
    event.target.parentNode.parentNode.id = id;
  }

  _removeIdFromArticle(event) {
    event.target.parentNode.parentNode.id = ' ';
  }

  _setActionDescription(articlesContainer) {
    const { searchedArticlesDescription, savedArticlesDescription } = this.description;

    if (this._isSearchedArticles(articlesContainer)) {
      return searchedArticlesDescription;
    }

    return savedArticlesDescription;
  }

  toggleActionDescription(event) {
    const { notAddedIcon, deleteIcon, actionBlock } = this.elements;


    const { storage } = this._dependencies;

    const userName = storage.getPropertyValue('userName');

    if ((event.target.classList.contains(notAddedIcon) && !userName) || event.target.classList.contains(deleteIcon)) {
      event.target.parentNode.querySelector(actionBlock).classList.toggle('article__paragraph_opened');
    }
  }

  _setActionButton(articlesContainer) {
    const { notAddedIcon, deleteIcon } = this.elements;

    if (this._isSearchedArticles(articlesContainer)) {
      return notAddedIcon;
    }

    return deleteIcon;
  }

  _toggleMainPageIconOnClick(event) {
    const { addedIcon, notAddedIcon } = this.elements;

    if (event.target.classList.contains(addedIcon)) {
      event.target.classList.remove(addedIcon);

      event.target.classList.add(notAddedIcon);
    } else if (event.target.classList.contains(notAddedIcon)) {
      event.target.classList.remove(notAddedIcon);

      event.target.classList.add(addedIcon);
    }
  }

  _setKeywordVisibility(articlesContainer) {
    if (this._isSearchedArticles(articlesContainer)) {
      return 'none';
    }

    return 'block';
  }

  saveArticle(event) {
    const { notAddedIcon } = this.elements;

    const { storage, mainApi } = this._dependencies;

    const userName = storage.getPropertyValue('userName');

    if (event.target.classList.contains(notAddedIcon) && userName) {
      const article = this._getArticleInfo(event.target.parentNode.parentNode);

      mainApi
        .createArticle(article)
        .then((res) => {
          if (res.status === '201') {
            this._toggleMainPageIconOnClick(event);

            this._setIdToArticle(event, res.data.id);
          } else {
            throw new Error(res.message);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  deleteArticle(event) {
    const { addedIcon, deleteIcon } = this.elements;

    const { storage, mainApi } = this._dependencies;

    const userName = storage.getPropertyValue('userName');

    if ((event.target.classList.contains(addedIcon) && userName) || event.target.classList.contains(deleteIcon)) {
      mainApi
        .deleteArticle(event.target.parentNode.parentNode.id)
        .then((res) => {
          if (res.status === '200') {
            this._toggleMainPageIconOnClick(event);

            this._removeIdFromArticle(event);

            this._removeArticleCardFromPage(event);
          } else {
            throw new Error(res.message);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  _removeArticleCardFromPage(event) {
    const { deleteIcon, article } = this.elements;

    if (event.target.classList.contains(deleteIcon)) {
      event.target.closest(article).remove();
    }
  }

  _getArticleInfo(article) {
    const keyword = article.querySelector('.article__search-keyword').textContent;
    const title = article.querySelector('.article__title').textContent.slice(0, 30);
    const text = article.querySelector('.article__text').textContent;
    const date = article.querySelector('.article__date').dateTime;
    const source = article.querySelector('.article__source').textContent;
    const link = article.querySelector('.article__link').href;
    const image = article.querySelector('.article__image').src;

    return [keyword, title, text, date, source, link, image];
  }
}
