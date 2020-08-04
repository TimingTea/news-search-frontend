import BaseComponent from './BaseComponent';

export default class Preloader extends BaseComponent {
  constructor(options) {
    super(options);
  }

  open() {
    const { preloaderIsOpen } = this.props;

    this.container.classList.add(preloaderIsOpen);
  }

  close() {
    const { preloaderIsOpen } = this.props;

    this.container.classList.remove(preloaderIsOpen);
  }
}
