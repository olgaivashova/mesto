export const editFormElement = document.querySelector(".popup__edit-form");
export const addFormElement = document.querySelector(".popup__add-form");

export const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_type_inactive",
  activeButtonClass: "popup__submit_valid",
  inputErrorClass: "popup__input_type_error",
};

export class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._activeButtonClass = config.activeButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._formInputs = this._form.querySelectorAll(this._inputSelector);
    this._formButton = this._form.querySelector(this._submitButtonSelector);
  }
  _enableButton = (button) => {
    button.classList.remove(this._inactiveButtonClass);
    button.classList.add(this._activeButtonClass);
    button.removeAttribute("disabled");
  };

  _disableButton = (button) => {
    button.classList.remove(this._activeButtonClass);
    button.classList.add(this._inactiveButtonClass);
    button.setAttribute("disabled", true);
  };

  _hasInvalidInput() {
    return Array.from(this._formInputs).some((item) => !item.validity.valid);
  }

  _showInputError = (input, errorContainer) => {
    errorContainer.textContent = input.validationMessage;
    input.classList.add(this._inputErrorClass);
  };

  _hideInputError = (input, errorContainer) => {
    errorContainer.textContent = "";
    input.classList.remove(this._inputErrorClass);
  };

  _checkInputValidity = (input) => {
    const errorContainer = document.querySelector(`.${input.id}-error`);
    if (input.validity.valid) {
      return this._hideInputError(input, errorContainer);
    } else {
      return this._showInputError(input, errorContainer);
    }
  };
  _setEventListeners = () => {
    this._disableButton(this._formButton);

    this._formInputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        if (this._hasInvalidInput()) {
          this._disableButton(this._formButton);
        } else {
          this._enableButton(this._formButton);
        }
      });
    });
  };

  enableValidation() {
    this._setEventListeners();
  }

  resetErrorByOpening() {
    this._formInputs.forEach((input) => {
      const errorContainer = document.querySelector(`.${input.id}-error`);
      if (!input.validity.valid || input.validity.valid) {
        this._hideInputError(input, errorContainer);
      }
    });
  }
}
