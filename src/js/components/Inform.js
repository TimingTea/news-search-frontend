/* eslint-disable max-len */
import BaseComponent from './BaseComponent';

export default class Inform extends BaseComponent {
  constructor(options) {
    super(options);
  }

  setInform(articles) {
    this.checkNumberContainer(articles);
    this.checkKeywordContainer(articles);
  }

  checkNumberContainer(articles) {
    const arr = `0${this.countArticles(articles)}`.split('');

    const { storage } = this._dependencies;

    const userName = storage.getPropertyValue('userName');

    const { numberString } = this.elements;

    if (
      this.countArticles(articles) === 0 || (this.countArticles(articles) >= 5 && this.countArticles(articles) <= 20)
    ) {
      numberString.textContent = `${userName}, у вас ${this.countArticles(articles)} сохранённых статей`;
    } else if (arr[arr.length - 1] === '1') {
      numberString.textContent = `${userName}, у вас ${this.countArticles(articles)} сохранённая статья`;
    } else if (arr[arr.length - 1] === '2' || arr[arr.length - 1] === '3' || arr[arr.length - 1] === '4') {
      numberString.textContent = `${userName}, у вас ${this.countArticles(articles)} сохранённые статьи`;
    }
  }

  checkKeywordContainer(articles) {
    const keywordsArr = this._sortKeywordsByPopularity(this._countKeywords(articles));

    const { keywordString } = this.elements;

    let resultString;

    if (keywordsArr.length <= 0) {
      resultString = '<p class="inform__keywords">По ключевым словам: ничего не найдено :(</p>';
    } else if (keywordsArr.length === 1) {
      resultString = `<p class="inform__keywords">По ключевым словам:
        <strong class="inform__accent">${keywordsArr[0][0]}</strong></p>`;
    } else if (keywordsArr.length === 2) {
      resultString = `<p class="inform__keywords">По ключевым словам:
       <strong class="inform__accent">${keywordsArr[0][0]}</strong> и <strong class="inform__accent">${keywordsArr[1][0]}</strong></p>`;
    } else if (keywordsArr.length === 3) {
      resultString = `<p class="inform__keywords">По ключевым словам:
       <strong class="inform__accent">${keywordsArr[0][0]}</strong>, <strong class="inform__accent">${keywordsArr[1][0]}</strong> и <strong class="inform__accent">${keywordsArr[2][0]}</strong></p>`;
    } else {
      resultString = `<p class="inform__keywords">По ключевым словам:
       <strong class="inform__accent">${keywordsArr[0][0]}</strong>, <strong class="inform__accent">${keywordsArr[1][0]}</strong> и <strong class="inform__accent">${keywordsArr.length - 2} другим</strong></p>`;
    }

    keywordString.insertAdjacentHTML('beforeend', resultString);
  }

  _countKeywords(articles) {
    const keywords = {};

    JSON.parse(articles).forEach((article) => {
      if (keywords[article.keyword]) {
        keywords[article.keyword] += 1;
      } else {
        keywords[article.keyword] = 1;
      }
    });

    return Object.entries(keywords);
  }

  countArticles(articles) {
    return JSON.parse(articles).length;
  }

  _sortKeywordsByPopularity(keywordsArray) {
    return keywordsArray.sort((a, b) => b[1] - a[1]);
  }
}
