import BaseComponent from './BaseComponent';

export default class RequestError extends BaseComponent {
  constructor(options) {
    super(options);
  }

  open() {
    const { requestErrorOpened } = this.props;

    this.container.classList.add(requestErrorOpened);
  }

  close() {
    const { requestErrorOpened } = this.props;

    this.container.classList.remove(requestErrorOpened);
  }
}
