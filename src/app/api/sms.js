import axiosApi from "../../../utils/axios";

export const sendsms = async (phoneList, smsContent) => {
  try {
    const response = await axiosApi.post("/sms/send", {
      phoneList: phoneList,
      smsContent: smsContent,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllSms = async () => {
  try {
    const response = await axiosApi.get("/sms/allsms");
    console.log("response:", response.data);
    return response.data;
  } catch (error) {
    console.log("error:", error.response.data);
    return error.response.data;
  }
};
