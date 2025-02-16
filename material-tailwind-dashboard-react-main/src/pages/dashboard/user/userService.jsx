import React from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Rating,
  CardFooter, Dialog, Input, Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { Footer } from "@/widgets/layout";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";


export function UserService() {
  const data = [
    {
      imgelink:
        "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
    {
      imgelink:
        "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    },
    {
      imgelink:
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    },
    {
      imgelink:
        "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
    },
    {
      imgelink:
        "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80",
    },
  ];

  const [active, setActive] = React.useState(
    "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  );
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [date, setDate] = React.useState(new Date());
  return (
    <>
      <section className="bg-white px-4 pb-20 pt-4">
        <div className="mt-32 flex flex-wrap items-center">
          <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-7/12 lg:mt-0">
            <div className="grid gap-4">
              <div>
                <img
                  className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px]"
                  src={active}
                  alt=""
                />
              </div>
              <div className="grid grid-cols-5 gap-4">
                {data.map(({ imgelink }, index) => (
                  <div key={index}>
                    <img
                      onClick={() => setActive(imgelink)}
                      src={imgelink}
                      className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center"
                      alt="gallery-image"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
          <div className="mx-auto -mt-8 w-full px-4 md:w-4/12">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-gray-900 p-2 text-center shadow-lg">
              <CalendarDaysIcon className="h-8 w-8 text-white " />
            </div>

            <Card className="shadow-lg border shadow-gray-500/10 rounded-lg">
              <CardBody>
                <Typography
                  variant="h3"
                  className="mb-3 font-bold"
                  color="blue-gray"
                >
                  นวดไทย
                </Typography>
                <Typography variant="small" color="blue-gray" className="font-normal">คะแนนรีวิว</Typography>
                <Rating value={4} readonly />
                <Typography className="mb-8 font-normal text-blue-gray-500">
                  ใช้เทคนิคการกดจุด การบีบ การดัดของนวดไทย ผสมผสานกับอาสนะของโยคะ โดยจะเน้นการยืดเหยียดเพื่อคลายกล้ามเนื้อทีละส่วนทั่วร่างกาย ช่วยลดอาการปวดเมื่อยหรือ อาการบาดเจ็บจากการออกกำลังกาย
                </Typography>
                <div className="flex items-center justify-between">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    ราคา 350 บาท
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    เวลา 60 นาที
                  </Typography>
                </div>
              </CardBody>
              <CardFooter >
                <Button onClick={handleOpen} variant="filled" fullWidth>จองคิวรับบริการ</Button>
              </CardFooter>
            </Card>

          </div>

        </div>
      </section>

      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              นวดไทย
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              จองคิวรับบริการ
            </Typography>

            <Input label="ชื่อ-นามสกุล" size="lg" />

            <Input label="อีเมล" size="lg" />

            <Input label="เบอร์โทรศัพท์" size="lg" />


            <Popover placement="bottom">
              <PopoverHandler>
                <Input
                  label="เลือกวัน-เวลา"
                  onChange={() => null}
                  value={date ? format(date, "PPP") : ""}
                />
              </PopoverHandler>
              <PopoverContent>
                <DayPicker
                  mode="single"
                  selected={date}
                  onSelect={date}
                  showOutsideDays
                  className="border-0"
                  classNames={{
                    caption: "flex justify-center py-2 mb-4 relative items-center",
                    caption_label: "text-sm font-medium text-gray-900",
                    nav: "flex items-center",
                    nav_button:
                      "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                    nav_button_previous: "absolute left-1.5",
                    nav_button_next: "absolute right-1.5",
                    table: "w-full border-collapse",
                    head_row: "flex font-medium text-gray-900",
                    head_cell: "m-0.5 w-9 font-normal text-sm",
                    row: "flex w-full mt-2",
                    cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                    day: "h-9 w-9 p-0 font-normal",
                    day_range_end: "day-range-end",
                    day_selected:
                      "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                    day_today: "rounded-md bg-gray-200 text-gray-900",
                    day_outside:
                      "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                    day_disabled: "text-gray-500 opacity-50",
                    day_hidden: "invisible",
                  }}
                  components={{
                    IconLeft: ({ ...props }) => (
                      <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                    ),
                    IconRight: ({ ...props }) => (
                      <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                    ),
                  }}
                />
              </PopoverContent>
            </Popover>

          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleOpen} fullWidth>
              จองคิว
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default UserService;
