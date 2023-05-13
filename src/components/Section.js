export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addCard() {
    this._items.forEach((element) => {
      this.setItem(element);
    });
  }

  setItem(item) {
    this._container.prepend(this._renderer(item));
  }
}
