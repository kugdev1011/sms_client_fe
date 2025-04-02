import axiosApi from "../../../utils/axios";

export const getContent = async () => {
  try {
    const response = await axiosApi.get("/content");
    return response;
  } catch (error) {
    return error.response;
  }
};
export const createContent = async (content) => {
  try {
    const response = await axiosApi.post("/content", { content: content });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
