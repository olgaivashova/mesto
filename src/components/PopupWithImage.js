import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = document.querySelector(".popup__image-scale");
    this._caption = document.querySelector(".popup__image-caption");
  }

  openImage = (initialCards) => {
    super.openPopup();
    this._image.src = initialCards.link;
    this._image.alt = initialCards.title;
    this._caption.textContent = initialCards.title;
  };
}
