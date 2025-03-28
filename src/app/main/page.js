"use client";

import { Button, Card, Typography } from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import CustomAlert from "../components/customAlert";
import { validationSendSMS } from "../signup/helper";
import { sendsms } from "../api/sms";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Leftbar from "@/components/Leftbar";

export default function NoviceCommunity() {
  const [phoneList, setPhoneList] = useState("");
  const [smsContent, setSmsContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageShow, setErrorMessageShow] = useState(false);
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
    setErrorMessageShow(false);
    let checkValid = validationSendSMS(phoneList, smsContent);
    if (!checkValid.result) {
      setErrorMessage(checkValid.message);
      setErrorMessageShow(!checkValid.result);
      return;
    }
    let result = await sendsms(phoneList.split(/\r?\n/), smsContent);
    showMessage(result.message);
    if (result.success) {
      setTimeout(() => router.push("/main"), 2000);
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
      <Leftbar />
      <div className="content ml-64 h-screen justify-center items-center flex">
        <CustomAlert message={alertMessage} />
        <div className="brands container mx-auto my-2 overflow-hidden  drop-shadow-md">
          <div className="w-full flex items-center justify-center mt-9">
            <div className="flex flex-col items-center">
              <Card
                color="transparent"
                shadow={false}
                className="w-[500px] flex items-start gap-2"
              >
                <Typography variant="h4" color="blue-gray/10">
                  Send SMS message
                </Typography>
                <Typography
                  color="red"
                  variant="h6"
                  className={`mt-1  w-80 max-w-screen-lg sm:w-96 font-normal ${errorMessageShow ? "opacity-100" : "opacity-0"}`}
                >
                  {errorMessage}&nbsp;
                </Typography>
                <div className="w-full flex flex-col items-end gap-1">
                  <div className="w-full flex justify-between">
                    <Typography
                      variant="h6"
                      color="blue-gray/10"
                      className="self-end"
                    >
                      Phone Number List
                    </Typography>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept=".txt, .csv"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <Button onClick={handleLoadFile} className="p-2">
                      Load From File
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
                      SMS Content
                    </Typography>
                  </div>
                  <textarea
                    value={smsContent}
                    onChange={(e) => setSmsContent(e.target.value)}
                    className="w-full h-36 overflow-auto outline-none rounded-md resize-none p-3 bg-gray-800"
                    maxLength={700}
                    placeholder="SMS content length must be less than 700"
                  />
                </div>
                <Button onClick={handleSendSMS} className="mt-6" fullWidth>
                  Send
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
