export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(".popup__close-icon");
    this._form = this._popup.querySelector(".popup__form");
  }

  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      this.closePopup();
    }
  };

  _handleClickByOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.closePopup();
    }
  };

  openPopup() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  closePopup() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  setEventListeners() {
    this._popup.addEventListener("click", this._handleClickByOverlay);
    this._closeButton.addEventListener("click", () => this.closePopup());
  }
}
