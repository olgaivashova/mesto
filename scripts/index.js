const elementsContainer = document.querySelector('.elements__container');
const popupElement = document.querySelectorAll('.popup')
const popupEditElement = document.querySelector('.popup__edit');
const popupAddElement = document.querySelector('.popup__add');
const popupCloseButtonElement = document.querySelector('.popup__close-icon');
const popupCloseAddElement = document.querySelector('.popup__close-icon_type_add');
const popupImageElement = document.querySelector('.popup__image');
const formElement =document.querySelector('.popup__form');
let nameInput = formElement.querySelector ('.popup__input_type_name');
let aboutInput = formElement.querySelector('.popup__input_type_job');
let nameInputNewValue = document.querySelector('.profile__name');
let aboutInputNewValue = document.querySelector('.profile__profession');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupAddButtonElement = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.elements__container');
const cardsTemplate = document.querySelector('.elements__template').content;
const addFormButton = document.querySelector('.popup__submit_type_add');
let titleInput = popupAddElement.querySelector('.popup__input_type_title');
let linkInput = popupAddElement.querySelector('.popup__input_type_link');
const popupCloseImageElement = document.querySelector('.popup__close-icon_type_image');


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


function createCard(item) {
  const initialCardElement = cardsTemplate.cloneNode(true);
  initialCardElement.querySelector('.elements__grid-text').textContent = item.name;
  initialCardElement.querySelector('.elements__grid-photo').src = item.link;
  initialCardElement.querySelector('.elements__grid-photo').alt = item.name;
  setEventListeners(initialCardElement);
  return initialCardElement;
}

const renderCard = function(item) {
const funсCreate = createCard(item);
cardsContainer.append(funсCreate);
}
initialCards.forEach(renderCard);

const openEditPopup = function() {
  nameInput.value = nameInputNewValue.textContent;
  aboutInput.value = aboutInputNewValue.textContent;
  popupEditElement.classList.add('popup_opened');
}
popupOpenButtonElement.addEventListener('click', openEditPopup);

function closePopup() {
  popupEditElement.classList.remove('popup_opened');
}
popupCloseButtonElement.addEventListener('click', closePopup);

const closePopupByClickOverlay = function(event) {
  if (event.currentTarget === event.target) {
    closePopup();
  }
}
popupEditElement.addEventListener('click', closePopupByClickOverlay);

const openAddPopup = function() {
  popupAddElement.classList.add('popup_opened');
}
popupAddButtonElement.addEventListener('click', openAddPopup);

function closeAddPopup() {
  popupAddElement.classList.remove('popup_opened');
}
popupCloseAddElement.addEventListener('click', closeAddPopup);

const handleFormSubmit = function(evt) {
  evt.preventDefault();
  nameInputNewValue.textContent = nameInput.value;р
  aboutInputNewValue.textContent = aboutInput.value;
  closePopup();
}
formElement.addEventListener('submit', handleFormSubmit);

function colorLike (event) {
  const cardLike = event.target.closest('.elements__grid-vector');
  cardLike.classList.toggle('elements__grid-vector_active');
}

function deleteItem (event) {
  const deleteCard = event.target.closest('.elements__grid-item');
  deleteCard.remove();
}

const closeImagePopup = function () {
  popupImageElement.classList.remove('popup_opened')
}
popupCloseImageElement.addEventListener('click', closeImagePopup);

function setEventListeners(initialCardElement) {
initialCardElement.querySelector('.elements__delete-icon').addEventListener('click', deleteItem);
initialCardElement.querySelector('.elements__grid-vector').addEventListener('click', colorLike);
initialCardElement.querySelector('.elements__grid-photo').addEventListener('click', (evt) => {
  popupImageElement.classList.add('popup_opened');
  const popupImageScaleElement = popupImageElement.querySelector('.popup__image-scale');
  const popupImageCaptionElement = popupImageElement.querySelector('.popup__image-caption');
  popupImageScaleElement.src = evt.target.src;
  popupImageCaptionElement.textContent = evt.target.alt;
})
}
const resetForm = function() {
titleInput.value = '';
linkInput.value = '';
}

const handleAddFormSubmit = function() {
const a = {name: titleInput.value, link: linkInput.value};
const funсCreate = createCard(a);
cardsContainer.prepend(funсCreate);
    closeAddPopup();
    resetForm();
}
addFormButton.addEventListener('click', handleAddFormSubmit);
