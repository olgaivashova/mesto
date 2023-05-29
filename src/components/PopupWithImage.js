import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = document.querySelector(".popup__image-scale");
    this._caption = document.querySelector(".popup__image-caption");
  }

  openImage = (cards) => {
    super.openPopup();
    this._image.src = cards.link;
    this._image.alt = cards.name;
    this._caption.textContent = cards.name;
  };
}
