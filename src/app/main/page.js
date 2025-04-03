"use client";

import {
  Button,
  Card,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import CustomAlert from "../components/customAlert";
import { validationSendSMS } from "./helper";
import { sendSMS } from "../api/sms";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { getContent } from "../api/content";
import { FaRegFolder } from "react-icons/fa";
import { logout } from "../../../redux/authSlice";
export default function SendingSMS() {
  const [sender, setSender] = useState("");
  const [phoneList, setPhoneList] = useState("");
  const [smsContent, setSmsContent] = useState("");
  const [contentListData, setContentListData] = useState([]);
  const [url, setURL] = useState("https://");
  const [alertMessage, setAlertMessage] = useState("");
  const fileInputRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getContent();
      if (response.status === 401) {
        dispatch(logout());
        router.push("/login");
        return;
      }
      if (response.status === 200) {
        setContentListData(
          response.data.data.filter((data) => data.state == 1)
        );
        setSmsContent(response.data.data[0].content);
        return;
      }
      showMessage(response.data);
    };
    fetchData();
  }, []);

  const showMessage = (msg) => {
    setAlertMessage(msg);
    setTimeout(() => setAlertMessage(""), 2000);
  };
  const handleSendSMS = async () => {
    const real_content = smsContent.replace("[url]", url);
    let checkValid = validationSendSMS(phoneList, real_content, sender);
    if (!checkValid.result) {
      showMessage(checkValid.message);
      return;
    }
    try {
      const result = await sendSMS(
        sender,
        phoneList.split(/\r?\n/),
        real_content
      );
      if (result.status === 401) {
        dispatch(logout());
        router.push("/login");
      }
      if (result.status === 200) {
        window.location.reload();
      }
      showMessage(result.data.message);
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
              className="bg-white"
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
              <IconButton onClick={handleLoadFile} color="white">
                <FaRegFolder />
              </IconButton>
            </div>
            <textarea
              value={phoneList}
              onChange={(e) => setPhoneList(e.target.value)}
              className="w-full h-48 overflow-auto outline-none border border-gray-500 rounded-md p-3 resize-none"
            />
          </div>
          <div className="w-full">
            <div>
              <Typography
                variant="h6"
                color="blue-gray/10"
                className="self-end"
              >
                选择模板
              </Typography>
            </div>
            <select
              value={smsContent}
              onChange={(event) => setSmsContent(event.target.value)}
              className="bg-white w-full p-2 border border-gray-500 rounded-md"
            >
              {contentListData.map((data) => (
                <option key={data.content} value={data.content}>
                  {data.content}
                </option>
              ))}
            </select>
          </div>
          <Input
            label="URL"
            value={url}
            onChange={(e) => setURL(e.target.value)}
            className="bg-white"
          />
          <textarea
            value={smsContent.replace("[url]", url)}
            readOnly
            className="w-full h-auto overflow-auto outline-none border border-gray-500 rounded-md p-3 resize-none"
          />
          <div className="flex justify-end w-full">
            <Button onClick={handleSendSMS} color="blue">
              发送
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
