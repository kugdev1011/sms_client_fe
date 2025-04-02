"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function SMSManagement() {
  const router = useRouter();
  const [alertMessage, setAlertMessage] = useState("");

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

  return <div></div>;
}
