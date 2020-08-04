export default class BaseComponent {
  constructor(options) {
    this.container = options.container;
    this.elements = options.elements;
    this.props = options.props;
    this.description = options.description;
  }

  _setHandlers(handlersOptions) {
    handlersOptions.forEach((handlerOption) => {
      const { element, event, handler } = handlerOption;

      element.addEventListener(event, handler);
    });
  }

  _getInputFormValues(event, ...args) {
    return args.map((arg) => event.currentTarget.querySelector(arg).value);
  }

  dependencies(dependencies) {
    this._dependencies = dependencies;
  }

  disableFormInputs() {
    const { allFormInputs } = this.elements;

    allFormInputs.forEach((input) => input.setAttribute('disabled', true));
  }

  activateFormInputs() {
    const { allFormInputs } = this.elements;

    allFormInputs.forEach((input) => input.removeAttribute('disabled'));
  }

  disableButtons() {
    this.container.querySelector('.button').setAttribute('disabled', true);
  }

  activateButtons() {
    this.container.querySelector('.button').removeAttribute('disabled');
  }
}
