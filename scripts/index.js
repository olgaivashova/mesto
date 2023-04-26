import {
  initialCards,
  popupImageElement,
  cardsContainer,
  Card,
} from "./card.js";

import {
  editFormElement,
  addFormElement,
  validationConfig,
  FormValidator,
} from "./validator.js";

const popupEditElement = document.querySelector(".popup_place_edit");
const popupAddElement = document.querySelector(".popup_place_add");
const closeButtons = document.querySelectorAll(".popup__close-icon");

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

const titleInput = popupAddElement.querySelector(".popup__input_type_title");
const linkInput = popupAddElement.querySelector(".popup__input_type_link");
const addSubmitButton = popupAddElement.querySelector(
  ".popup__submit_type_add"
);
const editSubmitButton = popupEditElement.querySelector(
  ".popup__submit_type_edit"
);

initialCards.forEach((item) => {
  const card = new Card(item, ".elements__template");
  const cardElement = card.generateCard();
  cardsContainer.append(cardElement);
});

const editFormValidator = new FormValidator(validationConfig, editFormElement);
const addFormValidator = new FormValidator(validationConfig, addFormElement);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc);
}

popupEditOpenButtonElement.addEventListener("click", () => {
  openPopup(popupEditElement);
  nameInput.value = nameInputNewValue.textContent;
  aboutInput.value = aboutInputNewValue.textContent;
  editFormValidator.resetErrorByOpening();
});

const handleEditFormSubmit = function (evt) {
  evt.preventDefault();
  nameInputNewValue.textContent = nameInput.value;
  aboutInputNewValue.textContent = aboutInput.value;
  closePopup(popupEditElement);
};
editFormElement.addEventListener("submit", handleEditFormSubmit);

popupAddOpenButtonElement.addEventListener("click", () => {
  openPopup(popupAddElement);
  addFormValidator.resetErrorByOpening();
});

const handleAddFormSubmit = function (evt) {
  evt.preventDefault();
  const cardData = { name: titleInput.value, link: linkInput.value };
  const newCard = new Card(cardData, ".elements__template");
  const cardElement = newCard.generateCard();
  cardsContainer.prepend(cardElement);
  closePopup(popupAddElement);
  addFormElement.reset();
};
addFormElement.addEventListener("submit", handleAddFormSubmit);

const closePopup = function (popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEsc);
};

closeButtons.forEach((element) => {
  const popup = element.closest(".popup");
  element.addEventListener("click", () => closePopup(popup));
});

const closePopupByEsc = function (e) {
  if (e.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
};

const closePopupsByClickOverlay = Array.from(
  document.querySelectorAll(".popup")
);
closePopupsByClickOverlay.forEach((overlay) => {
  const popup = overlay.closest(".popup");
  overlay.addEventListener("click", (event) => {
    if (event.currentTarget === event.target) {
      closePopup(popup);
    }
  });
});
