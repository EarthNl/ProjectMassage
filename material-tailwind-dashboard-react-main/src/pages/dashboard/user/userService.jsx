import React from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Rating,
  CardFooter,
} from "@material-tailwind/react";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { Footer } from "@/widgets/layout";


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

  return (
    <>
      <section className="bg-white p-4 rounded-lg">
        <div className="mt-4 flex flex-wrap items-center">
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
                <Button variant="filled" fullWidth>จองคิวรับบริการ</Button>
              </CardFooter>
            </Card>

          </div>

        </div>
      </section>

      
      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default UserService;
