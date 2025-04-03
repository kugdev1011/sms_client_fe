"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getContent } from "../api/content";
import CustomAlert from "../components/customAlert";
import { Button, Typography } from "@material-tailwind/react";
import { logout } from "../../../redux/authSlice";
import CreateContent from "./createContent";

export default function ContentManagement() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [contentData, setContentData] = useState([]);
  const [addOpen, setAddOpen] = useState(false);
  const handleAddOpen = () => {
    setAddOpen(!addOpen);
  };
  const [alertMessage, setAlertMessage] = useState("");
  const showMessage = (msg) => {
    setAlertMessage(msg);
    setTimeout(() => setAlertMessage(""), 2000);
  };
  const fetchData = async () => {
    const searchResult = await getContent();
    if (searchResult.status === 401) {
      dispatch(logout());
      router.push("/login");
      return;
    }
    if (searchResult.status === 200) {
      setContentData(searchResult.data.data);
      return;
    }
    showMessage(searchResult);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const statusString = (status) => {
    switch (status) {
      case 0:
        return "待办的";
      case 1:
        return "批准";
      case 2:
        return "衰退";
    }
  };
  const TABLE_HEAD = ["内容", "地位", "时间"];
  return (
    <div className="p-10 w-[80%] justify-center flex flex-col">
      <CustomAlert message={alertMessage} />
      <div>
        <Button color="blue" onClick={handleAddOpen}>
          添加短信内容模板
        </Button>
      </div>

      <table className="w-full table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {contentData.map((data, index) => {
            const isLast = index === contentData.length - 1;
            const classes = isLast ? "p-2" : "p-2 border-b border-blue-gray-50";
            let tdclass;
            if (data.state == 0) tdclass = "hover:bg-gray-500";
            if (data.state == 1) tdclass = "bg-green-200 hover:bg-gray-500";
            if (data.state == 2) tdclass = "bg-red-200 hover:bg-gray-500";
            return (
              <tr key={index} className={tdclass}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {data.content}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {statusString(data.state)}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {data.t_time.slice(0, 10)}
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <CreateContent
        addOpen={addOpen}
        handleAddOpen={() => handleAddOpen()}
        fetchData={() => fetchData()}
      />
    </div>
  );
}
