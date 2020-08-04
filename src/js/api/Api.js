export default class Api {
  constructor(options) {
    this.url = options.url;
  }

  dependencies(dependencies) {
    this._dependencies = dependencies;
  }
}
