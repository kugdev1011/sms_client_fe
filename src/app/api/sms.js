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
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
