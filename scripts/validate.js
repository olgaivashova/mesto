const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_type_inactive",
  activeButtonClass: "popup__submit_valid",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_activ",
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
  const formInputs = Array.from(document.querySelectorAll(inputSelector));
  const formButton = form.querySelector(submitButtonSelector);

  disableButton(formButton, rest);

  formInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      if (!hasInvalidInput(formInputs)) {
        disableButton(formButton, rest);
      } else {
        enableButton(formButton, rest);
      }
      checkInputValidity(input, rest);
    });
  });
};

const checkInputValidity = (
  input,
  { inputErrorClass, errorClass, ...rest }
) => {
  if (input.checkValidity()) {
    hideInputError(input, rest);
  } else {
    showInputError(input, rest);
  }
};

const showInputError = (input, { inputErrorClass, errorClass }) => {
  const errorContainer = document.querySelector(`.${input.id}-error`);
  console.log(errorContainer);
  input.classList.add(inputErrorClass);
  errorContainer.classList.add(errorClass);
  errorContainer.textContent = input.validationMessage;
};

const hideInputError = (input, { inputErrorClass, errorClass }) => {
  const errorContainer = document.querySelector(`.${input.id}-error`);
  input.classList.remove(inputErrorClass);
  errorContainer.classList.remove(errorClass);
  errorContainer.textContent = "";
};

const hasInvalidInput = (formInputs) => {
  if (
    Array.from(formInputs)[0].checkValidity() &&
    Array.from(formInputs)[1].checkValidity()
  ) {
    return true;
  } else if (
    Array.from(formInputs)[2].checkValidity() &&
    Array.from(formInputs)[3].checkValidity()
  ) {
    return true;
  }
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

function resetErrorByOpening(form) {
  document.querySelectorAll(validationConfig.inputSelector).forEach((input) => {
    const errorContainer = document.querySelector(`.${input.id}-error`);
    if (!input.validity.valid) {
      errorContainer.textContent = "";
      input.classList.remove(validationConfig.inputErrorClass);
    }
  });
}
enableValidation(validationConfig);
