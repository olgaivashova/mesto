export default class Card {
  constructor(initialCards, templateSelector, openImagePopup) {
    this._data = initialCards;
    this._name = initialCards.title;
    this._link = initialCards.link;
    this._alt = initialCards.title;
    this._templateSelector = templateSelector;
    this._openImagePopup = openImagePopup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__grid-item")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._textElement = this._element.querySelector(".elements__grid-text");
    this._textElement.textContent = this._name;
    this._gridPhoto = this._element.querySelector(".elements__grid-photo");

    this._gridPhoto.src = this._link;
    this._gridPhoto.alt = this._name;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._gridPhoto.addEventListener("click", () => {
      this._handleOpenImagePopup();
    });
    this._element
      .querySelector(".elements__grid-vector")
      .addEventListener("click", (event) => {
        this._toggleLike(event);
      });
    this._element
      .querySelector(".elements__delete-icon")
      .addEventListener("click", () => {
        this._deleteCard();
      });
  }
  _handleOpenImagePopup() {
    this._openImagePopup(this._data);
  }

  _toggleLike(event) {
    event.target.classList.toggle("elements__grid-vector_active");
  }
  _deleteCard() {
    this._element.remove();
  }
}
