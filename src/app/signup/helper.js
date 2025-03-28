function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function isValidPassword(password) {
  const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
  return regex.test(password);
}

export const validationSignUp = (name, email, password, confirmPassword) => {
  if (name == "" || email == "" || password == "" || confirmPassword == "") {
    return {
      result: false,
      message: "Please input all information.",
    };
  } else if (password != confirmPassword) {
    return {
      result: false,
      message: "Password not match",
    };
  } else if (!isValidEmail(email)) {
    return {
      result: false,
      message: "Invalid email",
    };
  } else if (!isValidPassword(password)) {
    return {
      result: false,
      message:
        "Password at least 8 chareaters with one special character, one number",
    };
  } else
    return {
      result: true,
      message: "",
    };
};

export const validationSignIn = (email, password) => {
  if (email == "" || password == "") {
    return {
      result: false,
      message: "Please input all information.",
    };
  } else if (!isValidEmail(email)) {
    return {
      result: false,
      message: "Invalid email",
    };
  } else
    return {
      result: true,
      message: "",
    };
};

export const validationSendSMS = (phoneList, smsContent) => {
  if (phoneList == "" || smsContent == "") {
    return {
      result: false,
      message: "Please input all information.",
    };
  } else if (smsContent.length >= 700) {
    return {
      result: false,
      message: "SMS content must be less than 700",
    };
  } else
    return {
      result: true,
      message: "",
    };
};

export const validationDeposit = (depositAmt, txID) => {
  if (depositAmt <= 0 || txID == "") {
    return {
      result: false,
      message: "Please input all information correctly.",
    };
  } else {
    return {
      result: true,
      message: "",
    };
  }
};
