const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_type_inactive",
  activeButtonClass: "popup__submit_valid",
  inputErrorClass: "popup__input_type_error",
};

const enableValidation = ({ formSelector, ...rest }) => {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, rest);
  });
};

const setEventListeners = (
  form,
  { inputSelector, submitButtonSelector, ...rest }
) => {
  const formInputs = Array.from(form.querySelectorAll(inputSelector));

  const formButton = form.querySelector(submitButtonSelector);

  disableButton(formButton, rest);

  formInputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(form, input);
      if (hasInvalidInput(formInputs)) {
        disableButton(formButton, rest);
      } else {
        enableButton(formButton, rest);
      }
    });
  });
};

const checkInputValidity = (form, input, inputErrorClass) => {
  if (input.checkValidity()) {
    hideInputError(form, input, inputErrorClass);
  } else {
    showInputError(form, input, inputErrorClass);
  }
};
const showInputError = (form, input, inputErrorClass) => {
  const errorContainer = form.querySelector(`.${input.id}-error`);
  errorContainer.textContent = input.validationMessage;
  input.classList.add(inputErrorClass);
};

const hideInputError = (form, input, inputErrorClass) => {
  const errorContainer = form.querySelector(`.${input.id}-error`);
  errorContainer.textContent = "";
  input.classList.remove(inputErrorClass);
};

const hasInvalidInput = (formInputs) => {
  return formInputs.some((item) => !item.validity.valid);
};

const enableButton = (button, { activeButtonClass, inactiveButtonClass }) => {
  button.classList.remove(inactiveButtonClass);
  button.classList.add(activeButtonClass);
  button.removeAttribute("disabled");
};

const disableButton = (button, { activeButtonClass, inactiveButtonClass }) => {
  button.classList.remove(activeButtonClass);
  button.classList.add(inactiveButtonClass);
  button.setAttribute("disabled", true);
};

enableValidation(validationConfig);

function resetErrorByOpening(form, validationConfig) {
  form.querySelectorAll(validationConfig.inputSelector).forEach((input) => {
    if (!input.validity.valid || input.validity.valid) {
      hideInputError(form, input, validationConfig.inputErrorClass);
    }
  });
}
