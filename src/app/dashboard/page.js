"use client";

import { useEffect, useState } from "react";
import CustomAlert from "../components/customAlert";
import { getAllSms } from "../api/sms";
import { DialogWithForm } from "../components/customDialog";

export default function Home() {
  const [smsHistoryData, setSmsHistoryData] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [modalPhoneNumber, setModalPhoneNumber] = useState([]);
  const [modalSmsContent, setModalSmsContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let searchResult = await getAllSms();
      setSmsHistoryData(searchResult.data);
    };

    fetchData();
  }, []);

  const showMessage = (msg) => {
    setAlertMessage(msg);
    setTimeout(() => setAlertMessage(""), 2000);
  };

  const handleRowClick = (index) => {
    setModalPhoneNumber(smsHistoryData[index].phone);
    setModalSmsContent(smsHistoryData[index].content);
    setDetailModalOpen(true);
  };

  return (
    <div>
      <div className="content">
        <div className="w-full flex flex-col">
          <CustomAlert message={alertMessage} />

          <div className="w-full grid grid-cols-5 gap-4 p-5 text-[#CCC] font-bold border-b text-hoverblack border-b-hoverblack">
            <p>No</p>
            <p>Phone Numbers</p>
            <p>SMS content</p>
            <p>Success Count</p>
            <p>Time</p>
          </div>
          {smsHistoryData?.map((data, index) => (
            <div
              onClick={() => handleRowClick(index)}
              key={index}
              className="w-full grid grid-cols-5 items-center gap-4 p-5 text-[#777] border-b border-b-mainblack hover:bg-mainblack"
            >
              <p>{index + 1}</p>
              <p>{data.phone.slice(0, 10)}...</p>
              <p className="w-full break-words words-break break-all">
                {data.content.slice(0, 10)}...
              </p>
              <p>{data.count}</p>
              <p>{data.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
