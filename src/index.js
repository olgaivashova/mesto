import "./pages/index.css";
import Card from "./components/Card.js";
import {
  editFormElement,
  addFormElement,
  validationConfig,
  FormValidator,
} from "./components/Validator.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Section from "./components/Section.js";
import { UserInfo, profileInfo } from "./components/UserInfo.js";
import PopupWithForm from "./components/PopupWithForm.js";

const initialCards = [
  {
    title: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    title: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    title: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    title: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    title: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    title: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const popupAddElement = document.querySelector(".popup_place_add");
const popupEditOpenButtonElement = document.querySelector(
  ".profile__edit-button"
);
const popupAddOpenButtonElement = document.querySelector(
  ".profile__add-button"
);

const addSubmitButton = popupAddElement.querySelector(
  ".popup__submit_type_add"
);

const imagePopup = new PopupWithImage(".popup_place_image");
imagePopup.setEventListeners();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (element) => {
      const card = new Card(
        element,
        ".elements__template",
        imagePopup.openImage
      );
      return card.generateCard();
    },
  },
  ".elements__container"
);
cardSection.addCard();

const userInfo = new UserInfo(profileInfo);
const editPopup = new PopupWithForm(".popup_place_edit", (data) => {
  userInfo.setUserInfo(data);
});
editPopup.setEventListeners();

const addPopup = new PopupWithForm(".popup_place_add", (data) => {
  cardSection.setItem(data);
});
addPopup.setEventListeners();

const editFormValidator = new FormValidator(validationConfig, editFormElement);
const addFormValidator = new FormValidator(validationConfig, addFormElement);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

popupEditOpenButtonElement.addEventListener("click", () => {
  editPopup.openPopup();
  editPopup.setInputValues(userInfo.getUserInfo());
  editFormValidator.resetErrorByOpening();
});

popupAddOpenButtonElement.addEventListener("click", () => {
  addPopup.openPopup();
  addPopup.reset();
  addFormValidator.resetErrorByOpening();
  addFormValidator.disableButton(addSubmitButton);
});
