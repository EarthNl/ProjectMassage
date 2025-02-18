import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Dialog,
  DialogBody,
  DialogHeader,
  Button,
  Input,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("th");
const localizer = momentLocalizer(moment);

// **กำหนด Validation Schema**
const bookingSchema = yup.object().shape({
  name: yup.string().required("กรุณากรอกชื่อ"),
  email: yup.string().email("รูปแบบอีเมลไม่ถูกต้อง").required("กรุณากรอกอีเมล"),
  phone: yup.string()
    .matches(/^[0-9]{10}$/, "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก")
    .required("กรุณากรอกเบอร์โทรศัพท์"),
});

export function UserBooking() {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [booking, setBooking] = useState({
    service: "นวดไทย",
    date: "",
    startTime: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bookingSchema),
  });

  const handleBooking = (slotInfo) => {
    const selectedDate = moment(slotInfo.start).format("YYYY-MM-DD");
    const selectedTime = moment(slotInfo.start).format("HH:00");
    setBooking({ ...booking, date: selectedDate, startTime: selectedTime });
    setOpen(true);
  };

  const onSubmit = (data) => {
    const newBooking = {
      title: `จอง: ${data.name}`,
      start: new Date(`${booking.date}T${booking.startTime}:00`),
      end: new Date(`${booking.date}T${parseInt(booking.startTime.split(":")[0]) + 1}:00:00`),
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
        />
      </Card>

      <Dialog open={open} handler={() => setOpen(!open)} size="xs">
        <DialogHeader>
          <Typography variant="h4" color="blue-gray">
            กรอกข้อมูลการจอง
          </Typography>
        </DialogHeader>
        <DialogBody>
          <Card className="mx-auto w-full max-w-[24rem] shadow-none">
            <CardBody className="flex flex-col gap-4">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Input label="ชื่อผู้จอง" {...register("name")} />
                  <p className="text-red-500 text-sm">{errors.name?.message}</p>
                </div>
                <div>
                  <Input label="อีเมลผู้จอง" type="email" {...register("email")} />
                  <p className="text-red-500 text-sm">{errors.email?.message}</p>
                </div>
                <div>
                  <Input label="เบอร์โทรศัพท์ผู้จอง" {...register("phone")} />
                  <p className="text-red-500 text-sm">{errors.phone?.message}</p>
                </div>
                <Input label="ชื่อบริการ" value={booking.service} disabled />
                <Input label="วันที่จอง" value={booking.date} disabled />
                <Input label="เวลาที่จอง" value={booking.startTime} disabled />
                <Button type="submit" variant="gradient" fullWidth>
                  ยืนยันการจอง
                </Button>
              </form>
            </CardBody>
          </Card>
        </DialogBody>
      </Dialog>
    </div>
  );
}

export default UserBooking;
