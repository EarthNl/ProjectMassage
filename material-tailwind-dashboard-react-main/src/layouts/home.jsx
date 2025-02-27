import { Routes, Route, Navigate } from "react-router-dom";
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
      name: "Home",
      path: "/home",
      icon: ChartPieIcon,
    },
    // {
    //   name: "Service",
    //   path: "/userservice",
    //   icon: UserIcon,
    // },
    // {
    //   name: "Booking",
    //   path: "/userbooking",
    //   icon: UserPlusIcon,
    // },
    {
      name: "SignIn",
      path: "/sign-in",
      icon: ArrowRightOnRectangleIcon,
    },
  ];
  const dashRoutes = routes.find((fd) => fd.layout === "home");
  return (
    <div className="h-screen py-12 w-full overflow-scroll">
      <div className="absolute z-10 w-full top-0">
        <HomeNavbar brandName="ไม้งาม นวดเพื่อสุขภาพ" routes={navbarRoutes} />
      </div>
      <div className="pt-14">
        <Routes>
          {dashRoutes.pages.map(({ path, element }, key) => (
            <Route key={key} exact path={path} element={element} />
          ))}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    </div>
  );
}

Home.displayName = "/src/layout/Home.jsx";

export default Home;
