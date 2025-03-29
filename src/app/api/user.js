import axiosApi from "../../../utils/axios";

export const signin = async (email, password) => {
  try {
    const response = await axiosApi.post("/auth/signin", {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.log("error:", error.response.data);
    return error.response.data;
  }
};
