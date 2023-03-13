console.log("Hallo, world");
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = document.querySelector('.popup__close-icon');
const formElement =document.querySelector('.popup__form');
let nameInput = formElement.querySelector ('.popup__input_theme_name');
console.log(nameInput);
let aboutInput = formElement.querySelector('.popup__input_theme_job');
let nameInputNewValue = document.querySelector('.profile__name');
let aboutInputNewValue = document.querySelector('.profile__profession');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');


const openPopup = function() {
  nameInput.value = nameInputNewValue.textContent;
  aboutInput.value = aboutInputNewValue.textContent;
  popupElement.classList.add('popup_opened');
}


const closePopup = function() {
  popupElement.classList.remove('popup_opened');
}



const closePopupByClickOverlay = function(event) {
  if (event.currentTarget === event.target) {
    closePopup();
  }
}


const handleFormSubmit = function(evt) {
  evt.preventDefault();
  nameInputNewValue.textContent = nameInput.value;
  aboutInputNewValue.textContent = aboutInput.value;
  closePopup();
}
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);
popupElement.addEventListener('click', closePopupByClickOverlay);
