import axiosApi from "../../../utils/axios";

export const signup = async (name, email, password) => {
  try {
    const response = await axiosApi.post("/auth/signup", {
      username: name,
      email: email,
      password: password,
    });
    console.log("response:", response.data);
    return response.data;
  } catch (error) {
    console.log("error:", error.response.data);
    return error.response.data;
  }
};

export const signin = async (email, password) => {
  try {
    const response = await axiosApi.post("/auth/signin", {
      email: email,
      password: password,
    });
    console.log("response:", response.data);
    return response.data;
  } catch (error) {
    console.log("error:", error.response.data);
    return error.response.data;
  }
};
