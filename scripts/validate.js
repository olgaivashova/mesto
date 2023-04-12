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
  console.log(forms);
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
      //(у поля ввода надо валидировать данные)

      if (!hasInvalidInput(formInputs)) {
        disableButton(formButton, rest);
      } else {
        enableButton(formButton, rest);
      }
      checkInputValidity(input, rest);
    });
  });
};

const checkInputValidity = (input, { errorClass, ...rest }) => {
  const errorContainer = document.querySelector(`.${input.id}-error`);
  console.log(errorContainer);
  if (input.checkValidity()) {
    errorContainer.textContent = "";
    hideInputError(input, rest);
  } else {
    errorContainer.textContent = input.validationMessage;
    showInputError(input, rest);
  }
};

const showInputError = (input, { inputErrorClass, errorClass }) => {
  input.classList.add(inputErrorClass);
};

const hideInputError = (input, { inputErrorClass, errorClass }) => {
  input.classList.remove(inputErrorClass);
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

const enableButton = (button, { inactiveButtonClass, activeButtonClass }) => {
  button.classList.remove(inactiveButtonClass);
  button.classList.add(activeButtonClass);
  button.removeAttribute("disabled");
};

const disableButton = (button, { inactiveButtonClass, activeButtonClass }) => {
  button.classList.remove(activeButtonClass);
  button.classList.add(inactiveButtonClass);
  button.setAttribute("disabled", true);
};

function resetErrorWhileOpening(form) {
  document.querySelectorAll(validationConfig.inputSelector).forEach((input) => {
    const errorContainer = document.querySelector(`.${input.id}-error`);
    if (!input.validity.valid) {
      errorContainer.textContent = "";
      input.classList.remove(validationConfig.inputErrorClass);
    }
  });
}
enableValidation(validationConfig);
