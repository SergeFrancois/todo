const pattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/


export function checkEmailInvalid(value) {
  return pattern.test(value) ? false : 'Invalid email format'
}

export function checkIsEmpty(value) {
  return value && value.length > 0 ? false : 'Must be nonempty'
}

export function checkTooShort(value, minLength) {
  return value && value.length >= minLength ? false : 'Too short'
}
