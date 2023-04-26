export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const popupImageElement = document.querySelector(".popup_place_image");
export const cardsContainer = document.querySelector(".elements__container");

export class Card {
  constructor(initialCards, templateSelector) {
    this._name = initialCards.name;
    this._link = initialCards.link;
    this._alt = initialCards.name;
    this._templateSelector = templateSelector;
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
    this._element.querySelector(".elements__grid-text").textContent =
      this._name;
    this._element.querySelector(".elements__grid-photo").src = this._link;
    this._element.querySelector(".elements__grid-photo").alt = this._name;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".elements__grid-photo")
      .addEventListener("click", () => {
        this._handleOpenImagePopup();
      });
    this._element
      .querySelector(".elements__grid-vector")
      .addEventListener("click", () => {
        this._toggleLike(event);
      });
    this._element
      .querySelector(".elements__delete-icon")
      .addEventListener("click", () => {
        this._deleteCard(event);
      });
  }
  _handleOpenImagePopup() {
    const popupImageScaleElement = document.querySelector(
      ".popup__image-scale"
    );
    const popupImageCaptionElement = document.querySelector(
      ".popup__image-caption"
    );
    popupImageScaleElement.src = this._link;
    popupImageScaleElement.alt = this._alt;
    popupImageCaptionElement.textContent = this._alt;
    popupImageElement.classList.add("popup_opened");
  }

  _toggleLike(event) {
    const cardLike = event.target.closest(".elements__grid-vector");
    cardLike.classList.toggle("elements__grid-vector_active");
  }
  _deleteCard(event) {
    const deleteItem = event.target.closest(".elements__grid-item");
    deleteItem.remove();
  }
}
