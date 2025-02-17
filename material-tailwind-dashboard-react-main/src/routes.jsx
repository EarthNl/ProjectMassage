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
import SignUp from '@/pages/auth/sign-up'
import {
  Home,
  Profile,
  BookingTable,
  UserTable,
  ServiceTable,
  StaffTable,
  ReviewTable,UserHome,UserService,UserBooking
} from "@/pages/dashboard";


const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    role: "1",
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
      {
        icon: <HomeIcon {...icon} />,
        name: "UserHome",
        path: "/userhome",
        element: <UserHome />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "UserService",
        path: "/userservice",
        element: <UserService />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "UserBooking",
        path: "/userbooking",
        element: <UserBooking />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [

      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
  
];

export default routes;
