const popupEditElement = document.querySelector(".popup_place_edit");
const popupAddElement = document.querySelector(".popup_place_add");
const popupImageElement = document.querySelector(".popup_place_image");
const closeButtons = document.querySelectorAll(".popup__close-icon");
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
const addSubmitButton = popupAddElement.querySelector(
  ".popup__submit_type_add"
);
const editSubmitButton = popupEditElement.querySelector(
  ".popup__submit_type_edit"
);

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc);
}

popupEditOpenButtonElement.addEventListener("click", () => {
  openPopup(popupEditElement);
  nameInput.value = nameInputNewValue.textContent;
  aboutInput.value = aboutInputNewValue.textContent;
  resetErrorWhileOpening(editFormElement);
  disableButton(editSubmitButton, validationConfig);
});

function createCard(item) {
  const initialCardElement = cardsTemplate.cloneNode(true);
  initialCardElement.querySelector(".elements__grid-text").textContent =
    item.name;
  const initialCardPhotoElement = initialCardElement.querySelector(
    ".elements__grid-photo"
  );
  initialCardPhotoElement.src = item.link;
  initialCardPhotoElement.alt = item.name;
  initialCardElement
    .querySelector(".elements__delete-icon")
    .addEventListener("click", deleteItem);
  initialCardElement
    .querySelector(".elements__grid-vector")
    .addEventListener("click", toggleLike);
  initialCardElement
    .querySelector(".elements__grid-photo")
    .addEventListener("click", () => {
      const popupImageScaleElement = document.querySelector(
        ".popup__image-scale"
      );

      const popupImageCaptionElement = document.querySelector(
        ".popup__image-caption"
      );
      popupImageScaleElement.src = item.link;
      popupImageScaleElement.alt = item.name;
      popupImageCaptionElement.textContent = item.name;
      openPopup(popupImageElement);
    });

  return initialCardElement;
}

const renderInitialCard = function (item) {
  const newCard = createCard(item);
  cardsContainer.append(newCard);
};
initialCards.forEach(renderInitialCard);

const handleEditFormSubmit = function (evt) {
  evt.preventDefault();
  nameInputNewValue.textContent = nameInput.value;
  aboutInputNewValue.textContent = aboutInput.value;
  closePopup(popupEditElement);
  closePopupByEsc(popupEditElement);
};
editFormElement.addEventListener("submit", handleEditFormSubmit);

popupAddOpenButtonElement.addEventListener("click", () => {
  openPopup(popupAddElement);
  resetErrorWhileOpening(addFormElement);
  disableButton(addSubmitButton, validationConfig);
});

function toggleLike(event) {
  const cardLike = event.target.closest(".elements__grid-vector");
  cardLike.classList.toggle("elements__grid-vector_active");
}

function deleteItem(event) {
  const deleteCard = event.target.closest(".elements__grid-item");
  deleteCard.remove();
}

const handleAddFormSubmit = function (evt) {
  evt.preventDefault();
  const cardData = { name: titleInput.value, link: linkInput.value };
  const newCard = createCard(cardData);
  cardsContainer.prepend(newCard);
  closePopup(popupAddElement);
  closePopupByEsc(addFormElement);
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
