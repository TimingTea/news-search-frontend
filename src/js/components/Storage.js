export default class Storage {
  constructor(storage) {
    this.storage = storage;
  }

  getPropertyValue(property) {
    return this.storage[property];
  }

  setPropertyValue(property, value) {
    this.storage[property] = value;
  }

  resetProperties(...properties) {
    properties.forEach((property) => delete this.storage[property]);
  }
}
