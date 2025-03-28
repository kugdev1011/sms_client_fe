"use client";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();
  const { isAuth } = useSelector((state) => state.auth);
  useEffect(() => {
    router.push("/login");
  }, []);

  return <div></div>;
}
