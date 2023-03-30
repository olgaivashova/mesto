const popupEditElement = document.querySelector(".popup_place_edit");
const popupAddElement = document.querySelector(".popup_place_add");
const popupImageElement = document.querySelector(".popup_place_image");
const popupEditCloseButtonElement = document.querySelector(
  ".popup__close-icon_type_edit"
);
const popupAddCloseButtonElement = document.querySelector(
  ".popup__close-icon_type_add"
);
const popupImageCloseButtonElement = document.querySelector(
  ".popup__close-icon_type_image"
);
const editFormElement = document.querySelector(".popup__edit-form");
const addFormElement = document.querySelector(".popup__add-form");
const nameInput = editFormElement.querySelector(".popup__input_type_name");
const aboutInput = editFormElement.querySelector(".popup__input_type_job");
const nameInputNewValue = document.querySelector(".profile__name");
const aboutInputNewValue = document.querySelector(".profile__profession");
const popupEditOpenButtonElement = document.querySelector(
  ".profile__edit-button"
);
const popupAddOpenButtonElement = document.querySelector(
  ".profile__add-button"
);
const cardsContainer = document.querySelector(".elements__container");
const cardsTemplate = document.querySelector(".elements__template").content;
const titleInput = popupAddElement.querySelector(".popup__input_type_title");
const linkInput = popupAddElement.querySelector(".popup__input_type_link");

function createCard(item) {
  const initialCardElement = cardsTemplate.cloneNode(true);
  initialCardElement.querySelector(".elements__grid-text").textContent =
    item.name;
  const initialCardPhotoElement = initialCardElement.querySelector(
    ".elements__grid-photo"
  );
  initialCardPhotoElement.src = item.link;
  initialCardPhotoElement.alt = item.name;
  setCardEventListeners(initialCardElement);
  return initialCardElement;
}

const renderInitialCard = function (item) {
  const newCard = createCard(item);
  cardsContainer.append(newCard);
};
initialCards.forEach(renderInitialCard);

const openEditPopup = function () {
  nameInput.value = nameInputNewValue.textContent;
  aboutInput.value = aboutInputNewValue.textContent;
  popupEditElement.classList.add("popup_opened");
};
popupEditOpenButtonElement.addEventListener("click", openEditPopup);

function closeEditPopup() {
  popupEditElement.classList.remove("popup_opened");
}
popupEditCloseButtonElement.addEventListener("click", closeEditPopup);

const closeEditPopupByClickOverlay = function (event) {
  if (event.currentTarget === event.target) {
    closeEditPopup();
  }
};
popupEditElement.addEventListener("click", closeEditPopupByClickOverlay);

const handleEditFormSubmit = function (evt) {
  evt.preventDefault();
  nameInputNewValue.textContent = nameInput.value;
  aboutInputNewValue.textContent = aboutInput.value;
  closeEditPopup();
};
editFormElement.addEventListener("submit", handleEditFormSubmit);

const openAddPopup = function () {
  popupAddElement.classList.add("popup_opened");
};
popupAddOpenButtonElement.addEventListener("click", openAddPopup);

function closeAddPopup() {
  popupAddElement.classList.remove("popup_opened");
}
popupAddCloseButtonElement.addEventListener("click", closeAddPopup);

function toggleLike(event) {
  const cardLike = event.target.closest(".elements__grid-vector");
  cardLike.classList.toggle("elements__grid-vector_active");
}

function deleteItem(event) {
  const deleteCard = event.target.closest(".elements__grid-item");
  deleteCard.remove();
}

function setCardEventListeners(initialCardElement) {
  initialCardElement
    .querySelector(".elements__delete-icon")
    .addEventListener("click", deleteItem);
  initialCardElement
    .querySelector(".elements__grid-vector")
    .addEventListener("click", toggleLike);
  initialCardElement
    .querySelector(".elements__grid-photo")
    .addEventListener("click", (evt) => {
      popupImageElement.classList.add("popup_opened");
      const popupImageScaleElement = popupImageElement.querySelector(
        ".popup__image-scale"
      );
      const popupImageCaptionElement = popupImageElement.querySelector(
        ".popup__image-caption"
      );
      popupImageScaleElement.src = evt.target.src;
      popupImageScaleElement.alt = evt.target.alt;
      popupImageCaptionElement.textContent = evt.target.alt;
    });
}

const closeImagePopup = function () {
  popupImageElement.classList.remove("popup_opened");
};
popupImageCloseButtonElement.addEventListener("click", closeImagePopup);

const handleAddFormSubmit = function (evt) {
  evt.preventDefault();
  const cardData = { name: titleInput.value, link: linkInput.value };
  const newCard = createCard(cardData);
  cardsContainer.prepend(newCard);
  closeAddPopup();
  addFormElement.reset();
};
addFormElement.addEventListener("submit", handleAddFormSubmit);

