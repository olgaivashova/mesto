export const popupAddElement = document.querySelector(".popup_place_add");
export const popupEditOpenButtonElement = document.querySelector(
  ".profile__edit-button"
);
export const popupAddOpenButtonElement = document.querySelector(
  ".profile__add-button"
);

export const addSubmitButton = popupAddElement.querySelector(
  ".popup__submit_type_add"
);
export const avatarImage = document.querySelector(".profile__avatar");
export const avatarButton = document.querySelector(".profile__avatar-button");
export const avatarSubmitButton = document.querySelector(
  ".popup__submit_type_save"
);
export const profileInfo = {
  nameSelector: ".profile__name",
  professionSelector: ".profile__profession",
  avatarSelector: ".profile__avatar",
};
export const editFormElement = document.querySelector(".popup__edit-form");
export const addFormElement = document.querySelector(".popup__add-form");
export const avatarFormElement = document.querySelector(".popup__avatar-form");

export const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_type_inactive",
  activeButtonClass: "popup__submit_valid",
  inputErrorClass: "popup__input_type_error",
};
