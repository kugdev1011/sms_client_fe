"use client";

import { Button, Card, Typography, Input } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { validationSignIn } from "../signup/helper";
import CustomAlert from "../components/customAlert";
import { signin } from "../api/user";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/authSlice";

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageShow, setErrorMessageShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const dispatch = useDispatch();

  const showMessage = (msg) => {
    setAlertMessage(msg);
    setTimeout(() => setAlertMessage(""), 2000);
  };

  const handleSignin = async () => {
    setErrorMessageShow(false);
    let checkValid = validationSignIn(email, password);
    if (!checkValid.result) {
      setErrorMessage(checkValid.message);
      setErrorMessageShow(!checkValid.result);
      return;
    }
    let result = await signin(email, password);
    showMessage(result.message);
    if (result.success) {
      let token = result.token;
      let user = result.user;
      dispatch(login({ token, user }));
      console.log("result", result);
      setTimeout(() => router.push("/main"), 2000);
    }
  };

  return (
    <div
      className="content bg-cover bg-center h-screen"
      style={{ backgroundImage: "url(./bg_sms.jpg)" }}
    >
      <CustomAlert message={alertMessage} />
      <div className="flex items-center justify-center h-screen">
        <Card className="p-4 bg-white" shadow={true}>
          <p className="text-4xl text-gray-900 font-medium justify-center flex">
            Sign In
          </p>
          <form className="w-80 max-w-screen-lg sm:w-96 py-10">
            <div className="mb-1 flex flex-col gap-6">
              <div className="flex flex-row items-center justify-self-center gap-4">
                <Input
                  value={email}
                  variant="standard"
                  label="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-row items-center gap-4">
                <Input
                  type="password"
                  variant="standard"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {errorMessageShow ? (
              <Typography
                color="red"
                variant="h6"
                className="font-normal justify-self-end"
              >
                {errorMessage}&nbsp;
              </Typography>
            ) : (
              <div></div>
            )}
            <Button
              onClick={handleSignin}
              className="font-medium mt-6 text-sm w-[30%] justify-self-end"
              fullWidth
            >
              sign in
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
