const popupEditElement = document.querySelector(".popup_place_edit");
const popupAddElement = document.querySelector(".popup_place_add");
const popupImageElement = document.querySelector(".popup_place_image");
const mainPopupElement = document.querySelectorAll(".popup");
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

const handleEditFormSubmit = function (evt) {
  evt.preventDefault();
  nameInput.value = nameInputNewValue.textContent;
  aboutInput.value = aboutInputNewValue.textContent;
  closePopup(popupEditElement);
  closePopupByEsc(popupEditElement);
};
editFormElement.addEventListener("submit", handleEditFormSubmit);

popupAddOpenButtonElement.addEventListener("click", (e) => {
  openPopup(e.target);
  resetErrorWhileOpening(addFormElement);
});

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
      openPopup(evt.target.parentElement);

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

const handleAddFormSubmit = function (evt) {
  evt.preventDefault();
  const cardData = { name: titleInput.value, link: linkInput.value };
  const newCard = createCard(cardData);
  cardsContainer.prepend(newCard);
  closePopup(addFormElement);
  closePopupByEsc(addFormElement);
  addFormElement.reset();
};
addFormElement.addEventListener("submit", handleAddFormSubmit);

const openPopup = function (popup) {
  if (popup.classList.contains("profile__add-button")) {
    popupAddElement.classList.add("popup_opened");
  } else if (popup.classList.contains("profile__edit-button")) {
    popupEditElement.classList.add("popup_opened");
  } else if (popup.tagName == "LI") {
    popupImageElement.classList.add("popup_opened");
  }
};
const closePopup = function (popup) {
  popup.classList.remove("popup_opened");
};

closeButtons.forEach((element) => {
  const popup = element.closest(".popup");
  element.addEventListener("click", () => closePopup(popup));
});

const openEditPopup = function (element) {
  openPopup(element);
};
popupEditOpenButtonElement.addEventListener("click", (e) => {
  openEditPopup(e.target);
  resetErrorWhileOpening(editFormElement);
});

const closePopupByEsc = function (e) {
  if (e.key === "Escape") {
    mainPopupElement.forEach((item) => {
      closePopup(item);
    });
  }
};

document.addEventListener("keydown", closePopupByEsc);

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
