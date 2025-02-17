import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Dialog,
  DialogBody,
  DialogHeader,
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
// ตั้งค่าภาษาไทย
moment.locale("th"); // กำหนดให้ใช้ภาษาไทย
const localizer = momentLocalizer(moment);

export function UserBooking() {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [booking, setBooking] = useState({
    name: "",
    email: "",
    phone: "",
    service: "นวดไทย",
    date: "",
    startTime: "",
  });

  const handleBooking = (slotInfo) => {
    const selectedDate = moment(slotInfo.start).format("YYYY-MM-DD");
    const selectedTime = moment(slotInfo.start).format("HH:00");
    setBooking({ ...booking, date: selectedDate, startTime: selectedTime });
    setOpen(true);
  };

  const handleSubmit = () => {
    const newBooking = {
      title: `จอง: ${booking.name}`,
      start: new Date(`${booking.date}T${booking.startTime}:00`),
      end: new Date(
        `${booking.date}T${
          parseInt(booking.startTime.split(":")[0]) + 1
        }:00:00`,
      ),
    };
    const isBooked = events.some(
      (event) => event.start.getTime() === newBooking.start.getTime(),
    );
    if (isBooked) {
      alert("เวลานี้ถูกจองแล้ว");
      
      return;
    }
    setEvents([...events, newBooking]);
    setOpen(false);
  };

  return (
    <div className="p-4">
      <Card className="w-full">
        <CardHeader floated={false} shadow={false}>
          <h2 className="text-xl">ปฏิทินการจองคิว</h2>
        </CardHeader>
        <CardBody>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            onSelectSlot={handleBooking}
            selectable
            min={new Date(2025, 0, 1, 10, 0)}
            max={new Date(2025, 0, 1, 22, 0)}
            messages={{
              month: "เดือน",
              week: "สัปดาห์",
              day: "วัน",
              today: "วันนี้",
              previous: "ก่อนหน้า",
              next: "ถัดไป",
              date: "วันที่",
            }}
          />
        </CardBody>
      </Card>
      <Dialog open={open} handler={() => setOpen(!open)} size="xs">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            กรอกข้อมูลการจอง
          </Typography>
        </DialogHeader>
        <DialogBody>
          <Card className="mx-auto w-full max-w-[24rem] shadow-none">
            <CardBody className="flex flex-col gap-4">
              <Input
                label="ชื่อผู้จอง"
                value={booking.name}
                onChange={(e) =>
                  setBooking({ ...booking, name: e.target.value })
                }
              />
              <Input
                label="อีเมลผู้จอง"
                type="email"
                value={booking.email}
                onChange={(e) =>
                  setBooking({ ...booking, email: e.target.value })
                }
              />
              <Input
                label="เบอร์โทรศัพท์ผู้จอง"
                value={booking.phone}
                onChange={(e) =>
                  setBooking({ ...booking, phone: e.target.value })
                }
              />
              <Input label="ชื่อบริการ" value={booking.service} disabled />
              <Input label="วันที่จอง" value={booking.date} disabled />
              <Input label="เวลาที่จอง" value={booking.startTime} disabled />
              <Button variant="gradient" onClick={handleSubmit} fullWidth>
                ยืนยันการจอง
              </Button>
            </CardBody>
          </Card>
        </DialogBody>
      </Dialog>
    </div>
  );
}

export default UserBooking;
