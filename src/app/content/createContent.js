import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  Spinner,
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
            placeholder="短信内容长度必须小于70。"
            onChange={(e) => setContent(e.target.value)}
          />
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
