import { Button, ButtonGroup, Card } from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };
  return (
    <div>
      {isAuth ? (
        <div className="p-2 flex justify-center items-center w-screen">
          <Card className="flex flex-row gap-4 justify-center items-center shadow-lg px-5 py-2">
            <Link href="/">
              <img src="/logo.png" className="w-[250px]" />
            </Link>
            <ButtonGroup variant="text">
              <Link href="/main">
                <Button
                  variant="outlined"
                  className="border-white whitespace-nowrap"
                >
                  <p className="text-3xl normal-case">短信发送</p>
                </Button>
              </Link>{" "}
              <Link href="/content">
                <Button
                  variant="outlined"
                  className="border-white whitespace-nowrap"
                >
                  <p className="text-3xl normal-case">短信内容管理</p>
                </Button>{" "}
              </Link>
              <Link href="/sms">
                <Button
                  variant="outlined"
                  className="border-white whitespace-nowrap"
                >
                  <p className="text-3xl normal-case">短信日志</p>
                </Button>{" "}
              </Link>{" "}
              <Link href="/payment">
                <Button
                  variant="outlined"
                  className="border-white whitespace-nowrap"
                >
                  <p className="text-3xl normal-case">充值日志</p>
                </Button>{" "}
              </Link>
            </ButtonGroup>
            <div className="flex flex-col gap-2 justify-center items-center">
              <p className="">短信数量: ${user.usdt}</p>
              <Button onClick={handleLogout} size="md" color="green">
                登出
              </Button>
            </div>
          </Card>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Header;
