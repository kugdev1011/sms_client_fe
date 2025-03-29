"use client";

import {
  Button,
  Card,
  Input,
  Popover,
  PopoverContent,
  PopoverHandler,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { BiCopyAlt } from "react-icons/bi";
import CustomAlert from "../components/customAlert";
import { validationDeposit } from "../signup/helper";
import { deposit } from "../api/payment";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function NoviceCommunity() {
  const router = useRouter();

  const [depositAmt, setDepositAmt] = useState(0);
  const [txID, setTxID] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageShow, setErrorMessageShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const WALLET_ADDRESS = process.env.NEXT_PUBLIC_WALLET_ADDRESS;

  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuth) {
      router.push("/login");
    }
  }, [isAuth]);

  const copyToClipboard = async () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(WALLET_ADDRESS);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };
  const showMessage = (msg) => {
    setAlertMessage(msg);
    setTimeout(() => setAlertMessage(""), 2000);
  };

  const handleDeposit = async () => {
    setErrorMessageShow(false);
    let checkValid = validationDeposit(depositAmt, txID);
    if (!checkValid.result) {
      setErrorMessage(checkValid.message);
      setErrorMessageShow(!checkValid.result);
      return;
    }
    let result = await deposit(depositAmt, txID);
    showMessage(result.message);
    if (result.success) {
      console.log("result", result);
      setTimeout(() => router.push("/main"), 2000);
    }
  };
  return (
    <div className="content">
      <div className="content justify-center items-center flex">
        <CustomAlert message={alertMessage} />

        <Card
          color="transparent"
          shadow={false}
          className="w-[500px] flex items-start gap-3"
        >
          <Typography variant="h4" color="blue-gray">
            充值
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
                color="blue-gray"
                className="self-end flex items-center gap-3"
              >
                <Image
                  src={"/coin/USDT.png"}
                  width={20}
                  height={20}
                  alt="logo"
                />
                TRON TRC20 USDT
              </Typography>
              <div onClick={() => copyToClipboard()}>
                <Popover>
                  <PopoverHandler>
                    <button>
                      <BiCopyAlt />
                    </button>
                  </PopoverHandler>
                  <PopoverContent className="bg-inherit p-2 outline-none border-none">
                    Copied!
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <p variant="h8" color="blue-gray" className="w-full break-words">
              {WALLET_ADDRESS}
            </p>
          </div>
          <div className="w-full flex flex-col items-end">
            <Typography variant="h6" color="blue-gray" className="self-start">
              充值金额
            </Typography>
            <Input
              type="number"
              value={depositAmt}
              onChange={(e) => setDepositAmt(e.target.value)}
              inputMode="numeric"
              className="w-full text-xl appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          </div>
          <div className="w-full flex flex-col items-end">
            <Typography variant="h6" color="blue-gray" className="self-start">
              交易编号
            </Typography>
            <Textarea
              value={txID}
              onChange={(e) => setTxID(e.target.value)}
              className="w-full"
            />
          </div>
          <Button onClick={handleDeposit} className="mt-6" fullWidth>
            确认
          </Button>
        </Card>
      </div>
    </div>
  );
}
