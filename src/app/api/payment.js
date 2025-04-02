import axiosApi from "../../../utils/axios";

export const getAllDeposit = async () => {
  try {
    const response = await axiosApi.get("/payment/alldeposit");
    console.log("response:", response.data);
    return response.data;
  } catch (error) {
    console.log("error:", error.response.data);
    return error.response.data;
  }
};
