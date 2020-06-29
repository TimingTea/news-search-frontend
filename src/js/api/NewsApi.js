/* eslint-disable no-undef */
import Api from './Api';

export default class NewsApi extends Api {
  constructor(options) {
    super(options);
    this.endpoint = options.endpoint;
    this.pageSize = options.pageSize;
    this.sortBy = options.sortBy;
    this.apiKey = options.apiKey;
  }

  getNews([keyword]) {
    const { dates } = this._dependencies;

    const weekAgo = dates.getDateAgo(7);

    const today = dates.getDateAgo(0);


    return fetch(
      `${this.url}`
        + `${this.endpoint}?`
        + `q=${keyword}&`
        + `from=${weekAgo.getFullYear()}-${weekAgo.getMonth() + 1}-${weekAgo.getDate()}&`
        + `to=${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}&`
        + `sortBy=${this.sortBy}&`
        + `pageSize=${this.pageSize}&`
        + `apiKey=${this.apiKey}`,
    ).then((res) => res.json());
  }
}
