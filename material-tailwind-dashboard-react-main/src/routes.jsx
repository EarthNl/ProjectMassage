import {
  HomeIcon,
  CalendarDaysIcon,
  UsersIcon,
  CubeIcon,
  UserIcon,
  StarIcon,
  UserCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";

import {
  Home,
  Profile,
  BookingTable,
  UserTable,
  ServiceTable,
  StaffTable,
  ReviewTable,
} from "@/pages/dashboard";
import {
  SignIn,
  UserHome,
  UserService,
  UserBooking,
  Review,
  ReviewList,
} from "./pages/home";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    title: "Dashboard",
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "หน้าหลัก",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "โปรไฟล์",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <CalendarDaysIcon {...icon} />,
        name: "ตารางการจอง",
        path: "/bookingtable",
        element: <BookingTable />,
      },
      {
        icon: <UsersIcon {...icon} />,
        name: "ตารางผู้ใช้งาน",
        path: "/usertable",
        element: <UserTable />,
      },
      {
        icon: <CubeIcon {...icon} />,
        name: "ตารางบริการ",
        path: "/servicetable",
        element: <ServiceTable />,
      },
      {
        icon: <UserIcon {...icon} />,
        name: "ตารางพนักงาน",
        path: "/stafftable",
        element: <StaffTable />,
      },
      {
        icon: <StarIcon {...icon} />,
        name: "ตารางรีวิว",
        path: "/reviewtable",
        element: <ReviewTable />,
      },
    ],
  },
  {
    layout: "home",

    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "UserHome",
        path: "/home",
        element: <UserHome />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "UserService",
        path: "/home/userservice",
        element: <UserService />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "UserBooking",
        path: "/home/userservice/userbooking",
        element: <UserBooking />,
      },

      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        name: "review",
        path: "/review",
        element: <Review />,
      },
      {
        name: "reviewList",
        path: "/reviewList",
        element: <ReviewList />,
      },
    ],
  },
];

export default routes;
