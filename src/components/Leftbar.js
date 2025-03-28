import { Button } from "@material-tailwind/react";
import Link from "next/link";
import { useSelector } from "react-redux";

const Leftbar = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="w-64 h-screen bg-gray-900 text-white fixed top-0 left-0 p-5">
      <img src="/logo.png" />
      <p className="justify-self-center mt-10 ">
        SMS Count: {user.remainSMS ? user.remainSMS : null}
      </p>
      <ul className="mt-10 border-t border-white">
        <li className="mb-3">
          <Link href="/main">
            <Button className="w-full text-xl normal-case">Send SMS</Button>
          </Link>
        </li>
        <li className="mb-3">
          <Link href="/payment">
            <Button className="w-full text-xl normal-case">Deposit</Button>
          </Link>
        </li>
        <li className="mb-3">
          <Link href="/dashboard">
            <Button className="w-full text-xl normal-case">SMS History</Button>
          </Link>
        </li>
        <li className="mb-3">
          <Link href="/transaction">
            <Button className="w-full text-xl whitespace-nowrap normal-case">
              Deposit History
            </Button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Leftbar;
