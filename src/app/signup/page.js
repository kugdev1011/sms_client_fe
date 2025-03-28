"use client";

import {
  Button,
  Card,
  Checkbox,
  Typography,
  Input,
} from "@material-tailwind/react";

import { useState } from "react";
import { validation, validationSignUp } from "./helper";
import { signup } from "../api/user";
import CustomAlert from "../components/customAlert";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageShow, setErrorMessageShow] = useState(false);

  const [alertMessage, setAlertMessage] = useState("");

  const showMessage = (msg) => {
    setAlertMessage(msg);
    setTimeout(() => setAlertMessage(""), 2000);
  };

  const handleSignUp = async () => {
    let checkValid = validationSignUp(name, email, password, confirmPassword);
    if (!checkValid.result) {
      setErrorMessage(checkValid.message);
      setErrorMessageShow(!checkValid.result);
      return;
    }
    let result = await signup(name, email, password);
    showMessage(result.message);
    if (result.success) {
      router.push("/login");
    }
  };

  return (
    <div className="content">
      <CustomAlert message={alertMessage} />
      <div className="w-full mt-24 flex items-center justify-center">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Nice to meet you! Enter your details to register.
          </Typography>
          <Typography
            color="red"
            variant="h6"
            className={`mt-1  w-80 max-w-screen-lg sm:w-96 font-normal ${errorMessageShow ? "opacity-100" : "opacity-0"}`}
          >
            {errorMessage}&nbsp;
          </Typography>
          <form className="mt-3 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Name
              </Typography>
              <Input
                size="lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Email
              </Typography>
              <Input
                size="lg"
                placeholder="Tom@google.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Confirm Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree the
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-gray-900"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <Button onClick={handleSignUp} className="mt-6" fullWidth>
              sign up
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-gray-900">
                Sign In
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
    </div>
  );
}
