export const updateObject = (oldObject, newValues) => {
  return {
    ...oldObject,
    ...newValues,
  }
}

export const checkValidity = (value, rules) => {
  let isValid = true
  let message = null

  if (rules.required) {
    isValid = value.trim() !== '' && isValid
    if (value.trim() === '') {
      message = 'This value is required.'
    }
  }
  if (rules.isEmail) {
    const regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g
    isValid = regex.test(value) && isValid
    if (regex.test(value) === false) {
      message = 'Enter correct e-mail adress.'
    }
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid
    if (!value.length < rules.minLength && !message) {
      message = 'Entered value is too short.'
    }
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid
    if (value.length > rules.maxLength) {
      message = 'Entered value is too long.'
    }
  }

  return {isValid, message}
}
