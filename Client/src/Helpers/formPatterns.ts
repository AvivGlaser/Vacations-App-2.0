export const simpleTextBoxPattern = {
    pattern: "[a-zA-Z]{2,20}",
    title: "A-Z Letters. 2-20 characters long.",
    minLength: 2,
    maxLength: 20,
}
export const textBoxPattern = {
    pattern: "[a-zA-Z]{2,20} ?[a-zA-Z]{0,20}",
    title: "A-Z Letters. 2-20 characters long.",
    minLength: 2,
    maxLength: 20,
}
export const creditCardNumberPattern = {
    pattern: "^[0-9]{13,16}",
    title: "Valid Credit Card number, Digits only, 13-16 long",
    minLength: 13,
    maxLength: 16,
}
export const longNamePattern = {
    pattern:
      "[a-zA-Z]{2,20} [a-zA-Z]{2,20} ?[a-zA-Z]{0,20} ?[a-zA-Z]{0,20}",
    title:
      "A-Z Letters. 2-4 words, 2-20 characters long each.",
  }
export const cvcPattern = {
    pattern: "[0-9]{3}",
    title: "Exactly 3 digits.",
    maxLength: 3,
  }
export const expDatePattern = {
    pattern: "[0-9]{2,2}",
    title: "Please select expiration month & year.",
  }
export const emailAddressPattern = {
    pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$"
}
export const passwordPattern = {
    pattern:"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,30}$",
  }
export const helperTitles = {
    password: `Minimum 8 characters, at least one uppercase & lowercase letter, at least one number.`,
    email: `A valid E-mail adress. Example: JohnDoe@gmail.com`
  }
