import axiosApi from "../../../utils/axios";

export const deposit = async (depositAmt, txID) => {
  try {
    const response = await axiosApi.post("/payment/deposit", {
      depositAmt: depositAmt,
      txID: txID,
    });
    console.log("response:", response.data);
    return response.data;
  } catch (error) {
    console.log("error:", error.response.data);
    return error.response.data;
  }
};

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

export const getCheckedDeposit = async () => {
  try {
    const response = await axiosApi.get("/payment/checkeddeposit");
    console.log("response:", response.data);
    return response.data;
  } catch (error) {
    console.log("error:", error.response.data);
    return error.response.data;
  }
};

export const getUnCheckedDeposit = async () => {
  try {
    const response = await axiosApi.get("/payment/uncheckeddeposit");
    console.log("response:", response.data);
    return response.data;
  } catch (error) {
    console.log("error:", error.response.data);
    return error.response.data;
  }
};

