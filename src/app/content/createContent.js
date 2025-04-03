import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { newUser } from "../api/user";
import CustomAlert from "../components/customAlert";
import { IoMdRefresh } from "react-icons/io";
import { IoCopyOutline } from "react-icons/io5";
import { createContent } from "../api/content";
export default function CreateContent({ addOpen, handleAddOpen, fetchData }) {
  const [content, setContent] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const showMessage = (msg) => {
    setAlertMessage(msg);
    setTimeout(() => setAlertMessage(""), 2000);
  };

  useEffect(() => {
    setContent("");
  }, []);
  const handleCreateContent = async () => {
    if (!content) {
      showMessage("正确输入所有信息。");
      return;
    }
    setIsLoading(true);
    try {
      await createContent(content);
      setContent("");
      setIsLoading(false);
      handleAddOpen();
      fetchData();
    } catch (error) {
      showMessage(error);
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Dialog open={addOpen} handler={handleAddOpen}>
        <DialogHeader>添加短信内容模板</DialogHeader>
        <DialogBody className="flex flex-col gap-4">
          <CustomAlert message={alertMessage} />
          <Input
            label="内容"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Typography color="blue-gray/10" className="self-start font-medium">
            模板的长度不能超过70，链接用[url]表示
            <br />
            例：如果你想发送“您的帳號涉及違規行為，請登陆 http://top-tele.com
            進行解除，否則將在4小時內註銷您的帳號！”,
            <br />
            得写成 “您的帳號涉及違規行為，請登陆 [url]
            進行解除，否則將在4小時內註銷您的帳號！”这样子的。
            然后发送的时候编辑链接就行
          </Typography>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleAddOpen}
            className="mr-1"
          >
            <span>取消</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleCreateContent}
            disabled={isLoading}
            className="flex flex-row items-center gap-2"
          >
            {isLoading && <Spinner className="h-4" />}
            <span>提交</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
