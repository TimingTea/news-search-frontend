import BaseComponent from './BaseComponent';

export default class ArticlesBlock extends BaseComponent {
  constructor(options) {
    super(options);
  }

  open() {
    const { articlesOpened } = this.props;

    this.container.classList.add(articlesOpened);
  }

  close() {
    const { articlesOpened } = this.props;

    this.container.classList.remove(articlesOpened);
  }

  renderArticles() {
    const { storage, articleCard } = this._dependencies;

    const { list } = this.elements;

    const articlesArray = JSON.parse(storage.getPropertyValue('articles'));

    const firstThree = articlesArray.splice(0, 3);

    const keyword = storage.getPropertyValue('keyword');

    storage.setPropertyValue('articles', JSON.stringify(articlesArray));

    firstThree.forEach((article) => {
      const card = articleCard.create(article, keyword, this.container);

      list.insertAdjacentHTML('beforeend', card);

      this._displayShowMoreButton();
    });
  }

  clearArticles() {
    const { list } = this.elements;

    while (list.lastChild) {
      list.removeChild(list.lastChild);
    }
  }

  _displayShowMoreButton() {
    const { showMoreButton } = this.elements;

    const { storage } = this._dependencies;

    const articles = JSON.parse(storage.getPropertyValue('articles'));

    if (articles.length === 0) {
      showMoreButton.style.display = 'none';
    } else {
      showMoreButton.style.display = 'block';
    }
  }


  setHandlers() {
    const { showMoreButton } = this.elements;

    const { articleCard } = this._dependencies;

    this._setHandlers([
      { element: showMoreButton, event: 'click', handler: this.renderArticles.bind(this) },
      { element: this.container, event: 'click', handler: articleCard.saveArticle.bind(articleCard) },
      { element: this.container, event: 'click', handler: articleCard.deleteArticle.bind(articleCard) },
      { element: this.container, event: 'mouseover', handler: articleCard.toggleActionDescription.bind(articleCard) },
      { element: this.container, event: 'mouseout', handler: articleCard.toggleActionDescription.bind(articleCard) },
    ]);
  }
}
