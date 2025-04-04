import React, { useMemo, useState, useEffect } from "react";
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
import { useLocation } from "react-router-dom";
import { GetByIdServie } from "@/services/service.service";
import { Form, Formik } from "formik";
import {
  GetListBookingService,
  InsertBookingService,
} from "@/services/booking.service";

moment.locale("th");
const localizer = momentLocalizer(moment);

// **กำหนด Validation Schema**
const bookingSchema = yup.object().shape({
  customer_name: yup
    .string()
    .matches(
      /^[ก-๙a-zA-Z]+ [ก-๙a-zA-Z]+$/,
      "กรุณากรอกชื่อและนามสกุลโดยมีเว้นวรรค",
    )
    .required("กรุณากรอกชื่อและนามสกุล"),
  customer_email: yup
    .string()
    .email("รูปแบบอีเมลไม่ถูกต้อง")
    .required("กรุณากรอกอีเมล"),
  customer_phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก")
    .required("กรุณากรอกเบอร์โทรศัพท์"),
});

export function UserBooking() {
  const location = useLocation();
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [booking, setBooking] = useState(null);
  const [result, setResult] = useState(null);

  const service_id = location.state && location.state.service_id;

  useMemo(async () => {
    const res = await GetByIdServie(service_id);
    if (res) {
      setResult(res);
      return;
    }
    setResult(null);
  }, []);

    useEffect(() => {
      fetchDataBooking()
    }, [])
  
    const fetchDataBooking = async () => {
      const res = await GetListBookingService()
      if(res){
       const newEvents = res.map((item) => {
         return {
           title: item.status,
           allDay: true,
           start: moment(item.date).format('YYYY-MM-DD'),
           end: moment(item.date).format('YYYY-MM-DD'),
         };
       });
       setEvents(newEvents)
       return 
      }
      setEvents([])
    }

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(bookingSchema),
  // });
  const handleOpen = () => setOpen(!open);

  const handleBooking = (slotInfo) => {
    const now = moment(); // เวลาปัจจุบัน
    const selectedDateTime = moment(slotInfo.start);

    if (selectedDateTime.isBefore(now)) {
      alert("ไม่สามารถจองวันที่หรือเวลาที่ผ่านมาแล้วได้");
      return;
    }

    setBooking({
      ...booking,
      date: selectedDateTime.format("YYYY-MM-DD"),
      startTime: selectedDateTime.format("HH:00"),
    });

    handleOpen();
  };

  // const onSubmitBookingOg = async (formData) => {
  //   const now = moment();
  //   const selectedDateTime = moment(`${booking.date}T${booking.startTime}:00`);

  //   if (selectedDateTime.isBefore(now)) {
  //     alert("ไม่สามารถจองวันที่หรือเวลาที่ผ่านมาแล้วได้");
  //     return;
  //   }

  //   // const newBooking = {
  //   //   title: `จองแล้ว: ${data.name}`,
  //   //   start: selectedDateTime.toDate(),
  //   //   end: selectedDateTime.add(1, "hour").toDate(),
  //   // };

  //   // const isBooked = events.some(
  //   //   (event) => event.start.getTime() === newBooking.start.getTime(),
  //   // );
  //   // if (isBooked) {
  //   //   alert("เวลานี้ถูกจองแล้ว");
  //   //   return;
  //   // }

  //   // setEvents([...events, newBooking]);
  //   // setOpen(false);
  //   const res = await InsertBookingService(formData);
  //   if (res && res.status) {
  //     switch (res.status) {
  //       case "200":
  //         setOpen(false);
  //         return;
  //       default:
  //         console.log("", res.detail);
  //         return;
  //     }
  //   }
  // };
  const onSubmitBooking = async (formData) => {
    const now = moment();
    const selectedDateTime = moment(`${booking.date}T${booking.startTime}:00`);

    if (selectedDateTime.isBefore(now)) {
      alert("ไม่สามารถจองวันที่หรือเวลาที่ผ่านมาแล้วได้");
      return;
    }

    // ตรวจสอบว่ามีการจองในช่วงเวลานี้แล้วหรือไม่
    const isBooked = events.some(
      (event) => event.start.getTime() === selectedDateTime.toDate().getTime(),
    );
    if (isBooked) {
      alert("เวลานี้ถูกจองแล้ว");
      return;
    }

    const res = await InsertBookingService(formData);
    if (res && res.status === "200") {
      // เพิ่มข้อมูลการจองลงใน `events`
      const newBooking = {
        title: `จองแล้ว: ${formData.customer_name}`,
        start: selectedDateTime.toDate(),
        end: selectedDateTime
          .add(result?.service_duration ?? 60, "minutes")
          .toDate(),
      };

      setEvents([...events, newBooking]); // อัปเดต state
      setOpen(false);
    } else {
      console.log("เกิดข้อผิดพลาด: ", res?.detail);
    }
  };
  // const onSubmitBookingMail = async (formData) => {
  //   const now = moment();
  //   const selectedDateTime = moment(`${booking.date}T${booking.startTime}:00`);
  
  //   if (selectedDateTime.isBefore(now)) {
  //     alert("ไม่สามารถจองวันที่หรือเวลาที่ผ่านมาแล้วได้");
  //     return;
  //   }
  
  //   // ตรวจสอบว่ามีการจองในช่วงเวลานี้แล้วหรือไม่
  //   const isBooked = events.some(
  //     (event) => event.start.getTime() === selectedDateTime.toDate().getTime(),
  //   );
  //   if (isBooked) {
  //     alert("เวลานี้ถูกจองแล้ว");
  //     return;
  //   }
  
  //   // บันทึกข้อมูลการจอง
  //   const res = await InsertBookingService(formData);
  //   if (res && res.status === "200") {
  //     // เพิ่มข้อมูลการจองลงใน `events`
  //     const newBooking = {
  //       title: `จองแล้ว: ${formData.customer_name}`,
  //       start: selectedDateTime.toDate(),
  //       end: selectedDateTime
  //         .add(result?.service_duration ?? 60, "minutes")
  //         .toDate(),
  //     };
  
  //     setEvents([...events, newBooking]); // อัปเดต state
  //     setOpen(false);
  
  //     // **เรียก API ส่งอีเมล**
  //     await sendEmailConfirmation(formData);
  //   } else {
  //     console.log("เกิดข้อผิดพลาด: ", res?.detail);
  //   }
  // };
  // const sendEmailConfirmation = async (formData) => {
  //   try {
  //     const emailResponse = await fetch("/api/send-email", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         to: formData.customer_email,
  //         subject: "ยืนยันการจองบริการ",
  //         text: `เรียนคุณ ${formData.customer_name},
  
  // คุณได้ทำการจองบริการ: ${formData.service_name}
  // วันที่: ${formData.booking_date}
  // เวลา: ${formData.booking_time}
  
  // ขอบคุณที่ใช้บริการของเรา!
  
  // ทีมงาน`,
  //       }),
  //     });
  
  //     if (emailResponse.ok) {
  //       console.log("อีเมลถูกส่งเรียบร้อย");
  //     } else {
  //       console.error("เกิดข้อผิดพลาดในการส่งอีเมล");
  //     }
  //   } catch (error) {
  //     console.error("Error sending email:", error);
  //   }
  // };
  
  return (
    <div className="p-4">
      <Card className="w-full">
        <Calendar
          className="m-4"
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

      <Dialog open={open} handler={handleOpen} size="xs">
        <DialogHeader>
          <Typography variant="h4" color="blue-gray">
            กรอกข้อมูลการจอง
          </Typography>
        </DialogHeader>
        <DialogBody>
          <Card className="mx-auto w-full max-w-[24rem] shadow-none">
            <CardBody className="flex flex-col gap-4">
              <Formik
                enableReinitialize
                validationSchema={bookingSchema}
                initialValues={{
                  customer_name: "",
                  customer_email: "",
                  customer_phone: "",
                  booking_date: booking ? booking.date ?? "" : "",
                  booking_time: booking ? booking.startTime ?? "" : "",
                  service_id: result ? result.service_id ?? "" : "",
                  service_name: result ? result.name ?? "" : "",
                  service_duration: result ? result.duration ?? "999" : "999",
                }}
                onSubmit={onSubmitBooking}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <Form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input
                        label="ชื่อผู้จอง"
                        name="customer_name"
                        value={values.customer_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          touched &&
                          touched.customer_name &&
                          errors &&
                          errors.customer_name
                        }
                      />
                      {touched &&
                        touched.customer_name &&
                        errors &&
                        errors.customer_name && (
                          <p className="text-red-500 text-sm">
                            {errors.customer_name}
                          </p>
                        )}
                    </div>
                    <div>
                      <Input
                        label="อีเมลผู้จอง"
                        type="email"
                        name="customer_email"
                        value={values.customer_email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          touched &&
                          touched.customer_email &&
                          errors &&
                          errors.customer_email
                        }
                      />
                      {touched &&
                        touched.customer_email &&
                        errors &&
                        errors.customer_email && (
                          <p className="text-red-500 text-sm">
                            {errors.customer_email}
                          </p>
                        )}
                    </div>
                    <div>
                      <Input
                        label="เบอร์โทรศัพท์ผู้จอง"
                        name="customer_phone"
                        value={values.customer_phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          touched &&
                          touched.customer_phone &&
                          errors &&
                          errors.customer_phone
                        }
                      />
                      {touched &&
                        touched.customer_phone &&
                        errors &&
                        errors.customer_phone && (
                          <p className="text-red-500 text-sm">
                            {errors.customer_phone}
                          </p>
                        )}
                    </div>
                    <div>
                      <Input
                        type="time"
                        label="เวลาเข้าใช้บริการ"
                        name="booking_time"
                        value={values.booking_time}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          touched &&
                          touched.booking_time &&
                          errors &&
                          errors.booking_time
                        }
                      />
                      {touched &&
                        touched.booking_time &&
                        errors &&
                        errors.booking_time && (
                          <p className="text-red-500 text-sm">
                            {errors.booking_time}
                          </p>
                        )}
                    </div>
                    <Input
                      label="ชื่อบริการ"
                      value={values.service_name}
                      disabled
                    />
                    <Input
                      label="วันที่จอง"
                      value={values.booking_date}
                      disabled
                    />
                    <Input
                      label="เวลาที่จอง"
                      value={`${values.service_duration} นาที`}
                      disabled
                    />
                    <Button type="submit" variant="gradient" fullWidth>
                      ยืนยันการจอง
                    </Button>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </DialogBody>
      </Dialog>
    </div>
  );
}

export default UserBooking;
