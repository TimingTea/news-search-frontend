/* eslint-disable max-len */
/* eslint-disable no-undef */
export default class Validation {
  constructor(errors) {
    this.errors = errors;
  }

  validateReg(event) {
    const { emailreg, passwordreg, namereg } = this._getFormElements(event);

    if (!emailreg.validity.valid || !passwordreg.validity.valid || !namereg.validity.valid) {
      this._checkEmptyInput(event, passwordreg, namereg);
      this._checkLengthPassword(event, passwordreg);
      this._checkRangeName(event, namereg);
      this._checkCorrectInput(event, emailreg, passwordreg, namereg);
      this._checkEmail(event, emailreg);
      this._disableButton(event);
    } else {
      this._removeErrors(event);
      this._activateButton(event);
    }
  }

  validateAuth(event) {
    const { mailauth, passwordauth } = this._getFormElements(event);

    if (!mailauth.validity.valid || !passwordauth.validity.valid) {
      this._checkEmptyInput(event, passwordauth);
      this._checkLengthPassword(event, passwordauth);
      this._checkCorrectInput(event, mailauth, passwordauth);
      this._checkEmail(event, mailauth);
      this._disableButton(event);
    } else {
      this._removeErrors(event);
      this._activateButton(event);
    }
  }

  validateSearch(event) {
    const { searchinput } = this._getFormElements(event);

    if (!searchinput.validity.valid) {
      this._checkEmptyInput(event, searchinput);
      this._checkRangeName(event, searchinput);
      this._disableSearchButton(event);
    } else {
      this._removeErrors(event);
      this._activareSearchButton(event);
    }
  }

  _checkEmptyInput(event, ...inputs) {
    if (event.target.value.length === 0) {
      inputs.forEach((input) => {
        if (event.target.name === input.name) {
          document.querySelector(`#${input.name}`).textContent = this.errors.emptyInput;
        }
      });
    }
  }

  _checkLengthPassword(event, ...inputs) {
    if ((event.target.value.length >= 1 && event.target.value.length < 8) || event.target.value.length > 30) {
      inputs.forEach((input) => {
        if (event.target.name === input.name) {
          document.querySelector(`#${input.name}`).textContent = this.errors.outOfRangePassword;
        }
      });
    }
  }

  _checkRangeName(event, ...inputs) {
    if (event.target.value.length === 1 || event.target.value.length > 30) {
      inputs.forEach((input) => {
        if (event.target.name === input.name) {
          document.querySelector(`#${input.name}`).textContent = this.errors.outOfRangeName;
        }
      });
    }
  }

  _checkCorrectInput(event, ...inputs) {
    if (event.target.validity.valid) {
      inputs.forEach((input) => {
        if (event.target.name === input.name) {
          document.querySelector(`#${input.name}`).textContent = this.errors.correctInput;
        }
      });
    }
  }

  _checkEmail(event, ...inputs) {
    if (!event.target.validity.patternMismatch) {
      this._checkEmptyInput(event, ...inputs);
    } else {
      inputs.forEach((input) => {
        if (event.target.name === input.name) {
          document.querySelector(`#${input.name}`).textContent = this.errors.invalidEmail;
        }
      });
    }
  }

  _removeErrors(event) {
    event.currentTarget.querySelectorAll('.popup__error').forEach((error) => {
      error.textContent = '';
    });
  }

  _disableButton(event) {
    event.currentTarget.querySelector('.popup__button').setAttribute('disabled', true);
  }

  _disableSearchButton(event) {
    event.currentTarget.querySelector('.search__button').setAttribute('disabled', true);
  }

  _activateButton(event) {
    event.currentTarget.querySelector('.popup__button').removeAttribute('disabled');
  }

  _activareSearchButton(event) {
    event.currentTarget.querySelector('.search__button').removeAttribute('disabled');
  }

  _getFormElements(event) {
    return event.currentTarget.querySelector('.form').elements;
  }
}
