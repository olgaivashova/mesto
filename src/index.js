import "./pages/index.css";
import Card from "./components/Card.js";
import {
  editFormElement,
  addFormElement,
  validationConfig,
  FormValidator,
  avatarFormElement,
} from "./components/Validator.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Section from "./components/Section.js";
import { UserInfo, profileInfo } from "./components/UserInfo.js";
import PopupWithForm from "./components/PopupWithForm.js";
import Api from "./components/Api.js";
import {
  popupEditOpenButtonElement,
  popupAddOpenButtonElement,
  addSubmitButton,
  avatarButton,
} from "./utils/utils.js";
import PopupDeleteForm from "./components/PopupDeleteForm";

const imagePopup = new PopupWithImage(".popup_place_image");
imagePopup.setEventListeners();

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: "ec6eb6f6-d349-455a-a729-a5d95d863e29",
    "Content-Type": "application/json",
  },
});

function createNewCard(element) {
  const card = new Card(
    element,
    ".elements__template",
    imagePopup.openImage,
    deletingCard.open,
    (like, cardId) => {
      if (like.classList.contains("elements__grid-vector_active")) {
        api.deleteLike(cardId).then((res) => {
          card.removeLikes(res.likes);
        });
      } else {
        api
          .addLike(cardId)
          .then((res) => {
            card.putLikes(res.likes);
          })
          .catch((error) => console.error(error));
      }
    }
  );
  return card.generateCard();
}

const cardSection = new Section(
  (element) => {
    cardSection.setItem(createNewCard(element));
  },

  ".elements__container"
);

const userInfo = new UserInfo(profileInfo);

Promise.all([api.getInfo(), api.getCards()])
  .then(([dataUser, dataCard]) => {
    dataCard.forEach((el) => {
      el.myid = dataUser._id;
    });
    userInfo.setUserInfo({
      username: dataUser.name,
      job: dataUser.about,
      avatar: dataUser.avatar,
    });
    cardSection.addCard(dataCard);
  })
  .catch((error) => console.error(error));

const deletingCard = new PopupDeleteForm(
  ".popup_place_delete",
  ({ card, cardId }) => {
    api
      .deleteCard(cardId)
      .then(() => {
        card.deleteCard();
        deletingCard.closePopup();
      })
      .catch((error) => console.error(error));
  }
);

deletingCard.setEventListeners();

const editPopup = new PopupWithForm(".popup_place_edit", (data) => {
  api
    .setInfo(data)
    .then((dataUser) => {
      userInfo.setUserInfo({
        username: dataUser.name,
        job: dataUser.about,
        avatar: dataUser.avatar,
      });
      editPopup.closePopup();
    })
    .catch((error) => console.error(error))
    .finally(() => editPopup.setLoadingText());
});
editPopup.setEventListeners();

const addPopup = new PopupWithForm(".popup_place_add", (data) => {
  //cardSection.setItem(createNewCard(data));
  Promise.all([api.getInfo(), api.addCard(data)])
    .then(([dataUser, dataCard]) => {
      dataCard.myid = dataUser._id;
      cardSection.setItem(createNewCard(dataCard));
      addPopup.closePopup();
    })
    .catch((error) => console.error(error))
    .finally(() => addPopup.setLoadingText());
});
addPopup.setEventListeners();

const avatarPopup = new PopupWithForm(".popup_place_save-avatar", (data) => {
  api
    .setAvatar(data)
    .then((dataUser) => {
      userInfo.setUserInfo({
        username: dataUser.name,
        job: dataUser.about,
        avatar: dataUser.avatar,
      });
      avatarPopup.closePopup();
    })
    .catch((error) => console.error(error))
    .finally(() => avatarPopup.setLoadingText());
});
avatarPopup.setEventListeners();

avatarButton.addEventListener("click", () => {
  avatarPopup.openPopup();
});

const editFormValidator = new FormValidator(validationConfig, editFormElement);
const addFormValidator = new FormValidator(validationConfig, addFormElement);
const avatarFormValidator = new FormValidator(
  validationConfig,
  avatarFormElement
);
editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();

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
