export const validationSignIn = (username, password) => {
  if (username == "" || password == "") {
    return {
      result: false,
      message: "Please input all information.",
    };
  } else
    return {
      result: true,
      message: "",
    };
};

export const validationSendSMS = (phoneList, smsContent, sender) => {
  if (phoneList == "" || smsContent == "" || sender == "") {
    return {
      result: false,
      message: "Please input all information.",
    };
  } else if (smsContent.length >= 70) {
    return {
      result: false,
      message: "SMS content must be less than 70",
    };
  } else
    return {
      result: true,
      message: "",
    };
};
