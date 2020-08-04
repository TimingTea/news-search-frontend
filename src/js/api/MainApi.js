/* eslint-disable no-undef */
import Api from './Api';

export default class MainApi extends Api {
  constructor(options) {
    super(options);
    // this.headers = options.headers;
    this.roots = options.roots;
  }

  signup([email, password, name]) {
    return fetch(`${this.url}${this.roots.signup}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    }).then((res) => res.json());
  }

  signin([email, password]) {
    return fetch(`${this.url}${this.roots.signin}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => res.json());
  }

  logout() {
    return fetch(`${this.url}${this.roots.logout}`, {
      method: 'POST',
      credentials: 'include',
    }).then((res) => res.json());
  }

  getUserData() {
    return fetch(`${this.url}${this.roots.userData}`, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => res.json());
  }

  getArticles() {
    return fetch(`${this.url}${this.roots.articles}`, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => res.json());
  }

  createArticle([keyword, title, text, date, source, link, image]) {
    return fetch(`${this.url}${this.roots.articles}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
      }),
    }).then((res) => res.json());
  }

  deleteArticle(articleId) {
    return fetch(`${this.url}${this.roots.articles}/${articleId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
  }
}
