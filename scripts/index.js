console.log("Hallo, world");
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = document.querySelector('.popup__close-icon');
const formElement =document.querySelector('.popup__form');
let nameInput = formElement.querySelector ('.popup__input-name');
let aboutInput = formElement.querySelector('.popup__input-about');
let nameInputNewValue = document.querySelector('.profile__name');
let aboutInputNewValue = document.querySelector('.profile__profession');
const popupOpenButtonElement = document.querySelector('.profile__edit-botton');


const openPopup = function() {
  nameInput.value = nameInputNewValue.textContent;
  aboutInput.value = aboutInputNewValue.textContent;
  popupElement.classList.add('popup_opened');
}
popupOpenButtonElement.addEventListener('click', openPopup);

const closePopup = function() {
  popupElement.classList.remove('popup_opened');
}

popupCloseButtonElement.addEventListener('click', closePopup);


const closePopupByClickOverlay = function(event) {
  if (event.currentTarget === event.target) {
    closePopup();
  }
}

popupElement.addEventListener('click', closePopupByClickOverlay);

const handleFormSubmit = function(evt) {
  evt.preventDefault();
  nameInputNewValue.textContent = nameInput.value;
  aboutInputNewValue.textContent = aboutInput.value;
  closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);
