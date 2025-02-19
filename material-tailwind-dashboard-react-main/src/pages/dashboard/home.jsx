import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { statisticsCardsData, bookingsData } from "@/data";
import { CubeIcon } from "@heroicons/react/24/solid";

export function Home() {
  return (
    <div className="mt-12">
      {/* สถิติการจองคิว */}
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        <StatisticsCard
          title="การจองวันนี้"
          value="15"
          icon={<CalendarDaysIcon className="w-6 h-6 text-white" />}
        />
        <StatisticsCard
          title="การบริการทั้งหมด"
          value="15"
          icon={<CubeIcon className="w-6 h-6 text-white" />}
        />
        <StatisticsCard
          title="ลูกค้าทั้งหมด"
          value="120"
          icon={<UserGroupIcon className="w-6 h-6 text-white" />}
        />
        <StatisticsCard
          title="รายได้เดือนนี้"
          value="฿25,000"
          icon={<CurrencyDollarIcon className="w-6 h-6 text-white" />}
        />
      </div>

      {/* ตารางการจองล่าสุด */}
      <Card className="overflow-hidden border border-blue-gray-100 shadow-sm">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 flex items-center justify-between p-6"
        >
          <Typography variant="h6" color="blue-gray">
            การจองล่าสุด
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-auto px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["ชื่อผู้จอง", "บริการ", "วันที่", "เวลา", "สถานะ"].map(
                  (el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-6 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-medium uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {bookingsData.map(
                ({ name, service, date, startTime, endTime, status }, key) => {
                  const className = `py-3 px-5 ${
                    key === bookingsData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;
                  return (
                    <tr key={key}>
                      <td className={className}>{name}</td>
                      <td className={className}>{service}</td>
                      <td className={className}>{date}</td>
                      <td className={className}>
                        {startTime + "-" + endTime + " น."}
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className={`text-xs font-medium ${
                            status === "สำเร็จ"
                              ? "text-green-500"
                              : "text-yellow-500"
                          }`}
                        >
                          {status}
                        </Typography>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Home;
