"use client";

import {
  Button,
  Card,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import CustomAlert from "../components/customAlert";
import { validationSendSMS } from "./helper";
import { sendSMS } from "../api/sms";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { getUser } from "../api/payment";
import { updateUser } from "../../../redux/authSlice";

export default function SendingSMS() {
  const [sender, setSender] = useState("");
  const [phoneList, setPhoneList] = useState("");
  const [smsContent, setSmsContent] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const fileInputRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const searchResult = await getUser();
      if (searchResult.status === 401) {
        dispatch(logout());
        router.push("/login");
      }
      if (searchResult.status === 200) {
        dispatch(updateUser(searchResult.data));
      }
      return;
    };
    fetchData();
  }, []);

  const showMessage = (msg) => {
    setAlertMessage(msg);
    setTimeout(() => setAlertMessage(""), 2000);
  };

  const handleSendSMS = async () => {
    let checkValid = validationSendSMS(phoneList, smsContent, sender);
    if (!checkValid.result) {
      showMessage(checkValid.message);
      return;
    }
    try {
      const result = await sendSMS(
        sender,
        phoneList.split(/\r?\n/),
        smsContent
      );
      if (result.status === 401) {
        dispatch(logout());
        router.push("/login");
      }
      if (result.status === 200) {
        setSender("");
        setPhoneList("");
        setSmsContent("");
        showMessage("短信发送成功。");
      }
      return;
    } catch (error) {
      showMessage(error);
    }
  };

  const handleLoadFile = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoneList(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <div className="h-full py-10 justify-center items-center flex">
        <CustomAlert message={alertMessage} />

        <Card
          color="transparent"
          shadow={false}
          className="w-[500px] flex items-start gap-2"
        >
          <Typography variant="h4" color="blue-gray/10">
            发送短信
          </Typography>
          <div>
            <Input
              label="发件人 ID"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col items-end gap-1">
            <div className="w-full flex justify-between">
              <Typography
                variant="h6"
                color="blue-gray/10"
                className="self-end"
              >
                电话号码列表
              </Typography>
              <input
                type="file"
                ref={fileInputRef}
                accept=".txt, .csv"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button onClick={handleLoadFile} className="p-2 normal-case">
                从文件加载
              </Button>
            </div>
            <textarea
              value={phoneList}
              onChange={(e) => setPhoneList(e.target.value)}
              className="w-full h-48 overflow-auto outline-none rounded-md p-3 resize-none bg-gray-800"
            />
          </div>
          <div className="w-full flex flex-col items-end gap-1">
            <div className="w-full flex justify-between">
              <Typography
                variant="h6"
                color="blue-gray/10"
                className="self-start"
              >
                短信内容
              </Typography>
            </div>
            <textarea
              value={smsContent}
              onChange={(e) => setSmsContent(e.target.value)}
              className="w-full h-36 overflow-auto outline-none rounded-md resize-none p-3 bg-gray-800"
              maxLength={70}
              placeholder="短信内容长度必须小于70。"
            />
          </div>
          <div className="w-full">
            <Select label="Select Version">
              <Option>Material Tailwind HTML</Option>
              <Option>Material Tailwind React</Option>
              <Option>Material Tailwind Vue</Option>
              <Option>Material Tailwind Angular</Option>
              <Option>Material Tailwind Svelte</Option>
            </Select>
          </div>
          <Button
            onClick={handleSendSMS}
            className="mt-6 normal-case"
            fullWidth
          >
            发送
          </Button>
        </Card>
      </div>
    </div>
  );
}
