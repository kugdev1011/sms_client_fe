import axiosApi from "../../../utils/axios";

export const signin = async (username, password) => {
  try {
    const response = await axiosApi.post("/auth", {
      username: username,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.log("error:", error.response.data);
    return error.response.data;
  }
};
