"use client";

import { Button, Card, Typography } from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import CustomAlert from "../components/customAlert";
import { validationSendSMS } from "../signup/helper";
import { sendsms } from "../api/sms";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function NoviceCommunity() {
  const [phoneList, setPhoneList] = useState("");
  const [smsContent, setSmsContent] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const fileInputRef = useRef(null);
  const router = useRouter();

  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuth) {
      router.push("/login");
    }
  }, [isAuth]);

  const showMessage = (msg) => {
    setAlertMessage(msg);
    setTimeout(() => setAlertMessage(""), 2000);
  };

  const handleSendSMS = async () => {
    let checkValid = validationSendSMS(phoneList, smsContent);
    if (!checkValid.result) {
      showMessage(checkValid.message);
      return;
    }
    let result = await sendsms(phoneList.split(/\r?\n/), smsContent);
    showMessage(result.message);
    if (result.success) {
      setTimeout(() => router.push("/dashboard"), 2000);
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
