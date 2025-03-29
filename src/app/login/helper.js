export const validationSignIn = (email, password) => {
  if (email == "" || password == "") {
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
