import React, { useEffect, useMemo, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import {
  CalendarDaysIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { bookingsData, statusBooking } from "@/data";
import { CubeIcon } from "@heroicons/react/24/solid";
import {
  ReportBookingService,
  ReportCountService,
} from "@/services/report.service";

export function Home() {
  const [repCount, setRepCount] = useState(null);
  const [booking, setBooking] = useState([]);

  useMemo(async () => {
    const resRC = await ReportCountService();
    if (resRC) {
      setRepCount(resRC);
      return;
    }
  }, []);

  useEffect(() => {
    fetchDataBooking();
  }, []);

  const fetchDataBooking = async () => {
    const res = await ReportBookingService();
    if (res) {
      setBooking(res);
    }
  };

  return (
    <div className="mt-12">
      {/* สถิติการจองคิว */}
      {repCount && (
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
          <StatisticsCard
            title="การจองวันนี้"
            value={repCount.countBooking ? repCount.countBooking : 0}
            icon={<CalendarDaysIcon className="w-6 h-6 text-white" />}
          />
          <StatisticsCard
            title="การบริการทั้งหมด"
            value={repCount.countService ? repCount.countService : 0}
            icon={<CubeIcon className="w-6 h-6 text-white" />}
          />
          <StatisticsCard
            title="พนักงานทั้งหมด"
            value={repCount.countStaff ? repCount.countStaff : 0}
            icon={<UserGroupIcon className="w-6 h-6 text-white" />}
          />
          <StatisticsCard
            title="รายได้เดือนนี้"
            value={repCount.incomeMonth ? repCount.incomeMonth : 0}
            icon={<CurrencyDollarIcon className="w-6 h-6 text-white" />}
          />
        </div>
      )}

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
                {["ชื่อผู้จอง", "บริการ", "วันที่", "เวลาเข้าใช้บริการ", "สถานะ"].map(
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
              {booking &&
                booking.length > 0 &&
                booking.map(
                  (
                    {
                      name,
                      service_name,
                      date,
                      time,
                      status,
                    },
                    key,
                  ) => {
                    const className = `py-3 px-5 ${
                      key === bookingsData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;
                    return (
                      <tr key={key}>
                        <td className={className}>{name}</td>
                        <td className={className}>{service_name}</td>
                        <td className={className}>{date}</td>
                        <td className={className}>
                          {time}
                        </td>
                        <td className={className}>
                          {statusBooking.map((item) => {
                            if (item.name === status) {
                              return (
                                <Typography
                                  variant="small"
                                  color={item.color}
                                >
                                  {item.name}
                                </Typography>
                              );
                            }
                          })}
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
