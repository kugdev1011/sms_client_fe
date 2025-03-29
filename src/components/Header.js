import { Button, Card } from "@material-tailwind/react";
import Link from "next/link";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const { isAuth } = useSelector((state) => state.auth);

  return (
    <div>
      {isAuth ? (
        <div>
          <Card className="m-4 grid grid-cols-3 p-4 justify-center items-center bg-blue-500 bg-opacity-50 backdrop-blur-md shadow-lg">
            <img
              src="/logo.png"
              className="animate-pulse drop-shadow-[0_0_15px_rgb(0,255,255)] whitespace-nowrap w-[40%]"
            />
            <div className="flex flex-row gap-4">
              <Link href="/main">
                <Button variant="outlined" className="border-white">
                  <h1 className="text-4xl text-white animate-pulse drop-shadow-[0_0_15px_rgb(0,255,255)] whitespace-nowrap">
                    Send SMS
                  </h1>
                </Button>
              </Link>
              <Link href="/payment">
                <Button>
                  <h1 className="text-4xl text-white animate-pulse drop-shadow-[0_0_15px_rgb(0,255,255)] whitespace-nowrap">
                    Depost
                  </h1>
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button>
                  <h1 className="text-4xl text-white animate-pulse drop-shadow-[0_0_15px_rgb(0,255,255)] whitespace-nowrap">
                    SMS History
                  </h1>
                </Button>
              </Link>
              <Link href="/transaction">
                <Button>
                  <h1 className="text-4xl text-white animate-pulse drop-shadow-[0_0_15px_rgb(0,255,255)] whitespace-nowrap">
                    Deposit History
                  </h1>
                </Button>
              </Link>
            </div>

            <p className="justify-self-center mt-10 ">
              SMS Count: {user?.remainSMS ? user?.remainSMS : null}
            </p>
          </Card>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Header;
