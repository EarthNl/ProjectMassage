import { Routes, Route } from "react-router-dom";
import {
  ChartPieIcon,
  UserIcon,
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { Footer, HomeNavbar } from "@/widgets/layout";
import routes from "@/routes";

export function Home() {
  const navbarRoutes = [
    {
      name: "UserBooking",
      path: "/home/userhome",
      icon: ChartPieIcon,
    },
    {
      name: "UserBooking",
      path: "/home/userservice",
      icon: UserIcon,
    },
    {
      name: "UserBooking",
      path: "/home/userbooking",
      icon: UserPlusIcon,
    },
    {
      name: "SignIn",
      path: "/home/sign-in",
      icon: ArrowRightOnRectangleIcon,
    },
  ];
  const pages = routes.find((fd) => fd.layout === "home")?.pages;
  return (
    <div className="relative min-h-screen w-full">
      <HomeNavbar brandName="ไม้งาม นวดเพื่อสุขภาพ" routes={navbarRoutes} />
      <Routes>
        {pages.map(({ path, element },key) => (
          <Route key={key} exact path={path} element={element} />
        ))}
      </Routes>
    </div>
  );
}

Home.displayName = "/src/layout/Home.jsx";

export default Home;
