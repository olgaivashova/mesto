export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addCard(items) {
    items.forEach((element) => {
      this._renderer(element);
    });
  }

  setItem(item) {
    this._container.prepend(item);
  }
}
