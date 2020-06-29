import BaseComponent from './BaseComponent';

export default class NotFound extends BaseComponent {
  constructor(options) {
    super(options);
  }

  open() {
    const { notFoundOpened } = this.props;

    this.container.classList.add(notFoundOpened);
  }

  close() {
    const { notFoundOpened } = this.props;

    this.container.classList.remove(notFoundOpened);
  }
}
