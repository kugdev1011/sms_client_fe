"use client";

export default function ContentManagement() {
  const showMessage = (msg) => {
    setAlertMessage(msg);
    setTimeout(() => setAlertMessage(""), 2000);
  };

  return <div></div>;
}
