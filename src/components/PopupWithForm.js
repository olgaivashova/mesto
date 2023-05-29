import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._form = this._popup.querySelector(".popup__form");
    this._inputs = this._form.querySelectorAll(".popup__input");
    this._submitButton = this._popup.querySelector(".popup__submit");
    this._loadingText = this._submitButton.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = `Сохранение...`;
      this._submitFunction(this._getInputValues());
    });
  }
  _getInputValues() {
    this._values = {};
    this._inputs.forEach((input) => {
      this._values[input.name] = input.value;
    });
    return this._values;
  }
  setInputValues(elements) {
    this._inputs.forEach((input) => {
      input.value = elements[input.name];
    });
  }
  reset() {
    this._form.reset();
  }
  setLoadingText() {
    this._submitButton.textContent = this._loadingText;
  }
}
