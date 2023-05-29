export default class Card {
  constructor(
    object,
    templateSelector,
    openImagePopup,
    openDeletePopup,
    changeLike
  ) {
    this._data = object;
    this._name = object.name;
    this._link = object.link;
    this._alt = object.title;
    this._myId = object.myid;
    this._ownerId = object.owner._id;
    this._cardId = object._id;
    this._likes = object.likes;
    this._likesLength = object.likes.length;
    this._templateSelector = templateSelector;
    this._openImagePopup = openImagePopup;
    this._openDeletePopup = openDeletePopup;
    this._changeLike = changeLike;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__grid-item")
      .cloneNode(true);

    return cardElement;
  }

  _checkCardOwnership() {
    if (this._myId !== this._ownerId) {
      this._trash.classList.add("elements__delete-icon_type_inactive");
    }
  }
  _isLiked() {
    this._likes.forEach((element) => {
      if (element._id === this._myId) {
        this._likeIcon.classList.add("elements__grid-vector_active");
        return;
      }
    });
    this._counter.textContent = this._likesLength;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._textElement = this._element.querySelector(".elements__grid-text");
    this._textElement.textContent = this._name;
    this._trash = this._element.querySelector(".elements__delete-icon");
    this._likeIcon = this._element.querySelector(".elements__grid-vector");
    this._counter = this._element.querySelector(".elements__counter");
    this._gridPhoto = this._element.querySelector(".elements__grid-photo");
    this._gridPhoto.src = this._link;
    this._gridPhoto.alt = this._name;
    this._setEventListeners();
    this._checkCardOwnership();
    this._isLiked();
    return this._element;
  }

  _setEventListeners() {
    this._gridPhoto.addEventListener("click", () => {
      this._openImagePopup(this._data);
    });
    this._likeIcon.addEventListener("click", () => {
      this._changeLike(this._likeIcon, this._cardId);
    });
    this._trash.addEventListener("click", () => {
      this._openDeletePopup({ card: this, cardId: this._cardId });
    });
  }

  toggleLikes(likes) {
    this._likeIcon.classList.toggle("elements__grid-vector_active");
    this._counter.textContent = likes.length;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }
}
