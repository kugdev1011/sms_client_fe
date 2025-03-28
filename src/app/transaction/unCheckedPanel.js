import { Button, Input, TabPanel } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { getUnCheckedDeposit } from "../api/payment";
import CustomAlert from "../components/customAlert";

export default function UnCheckedPaymentPanel() {
  const [historyData, setHistoryData] = useState([]);

  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let searchResult = await getUnCheckedDeposit();
      setHistoryData(searchResult.data);
    };

    fetchData();
  }, []);

  const showMessage = (msg) => {
    setAlertMessage(msg);
    setTimeout(() => setAlertMessage(""), 2000);
  };

  return (
    <TabPanel value={2}>
      <div className="w-full flex flex-col">
        <CustomAlert message={alertMessage} />
        <p className="text-xl my-3">Unverified Deposit List</p>
        <div className="w-full grid grid-cols-6 gap-4 p-5 border-b border-b-hoverblack">
          <p>No</p>
          <p>UserName</p>
          <p>Transaction ID</p>
          <p>Amount</p>
          <p>Time</p>
          <p>Status</p>
        </div>
        {historyData?.map((data, index) => (
          <div
            key={index}
            className="w-full grid grid-cols-6 items-center gap-4 p-5 border-b border-b-mainblack hover:bg-mainblack"
          >
            <p>{index + 1}</p>
            <p>{data.userId?.username}</p>
            <p className="w-full break-words words-break break-all">{data.txID.slice(0,20)}</p>
            <p>{data.amount}</p>
            <p>{data.time}</p>
            <p>{data.status == "0" ? "Pending" : "Verified"}</p>
          </div>
        ))}
      </div>
    </TabPanel>
  );
}
