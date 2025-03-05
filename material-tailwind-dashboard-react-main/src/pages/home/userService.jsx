import React, { useMemo, useState } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import { GetByIdServie } from "@/services/service.service";
import { apiLocal } from "@/common/axios";

export function UserService() {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [active, setActive] = useState(null);

  const [imgs, setImgs] = useState([]);

  const service_id = location.state && location.state.service_id;

  useMemo(async () => {
    const res = await GetByIdServie(service_id);
    if (res) {
      setResult(res);
      if (res.imgs) {
        const resImgs = res.imgs.split(",");
        setImgs(resImgs);
        setActive(`${apiLocal}${resImgs[0]}`);
      }
      return;
    }
    setImgs([]);
    setActive(null);
    setResult(null);
  }, []);

  return (
    <>
      <section className="bg-white p-4 rounded-lg m-5">
        <div className="mt-4 flex flex-wrap items-center">
          <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-7/12 lg:mt-0">
            <div className="grid gap-4">
              <div>
                {active && (
                  <img
                    className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px]"
                    src={active}
                    alt=""
                  />
                )}
              </div>
              <div className="grid grid-cols-5 gap-4">
                {imgs &&
                  imgs.length > 0 &&
                  imgs.map((url, index) => (
                    <div key={index}>
                      <img
                        onClick={() => setActive(`${apiLocal}${url}`)}
                        src={`${apiLocal}${url}`}
                        className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center"
                        alt="gallery-image"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {result && (
            <div className="mx-auto -mt-8 w-full px-4 md:w-4/12">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#E07A5F] p-2 text-center shadow-lg">
                <CalendarDaysIcon className="h-8 w-8 text-white " />
              </div>

              <Card className="shadow-lg border shadow-gray-500/10 rounded-lg bg-[#F1E3D3]">
                <CardBody>
                  {result.name && (
                    <Typography
                      variant="h3"
                      className="mb-3 font-bold"
                      color="blue-gray"
                    >
                      {result.name}
                    </Typography>
                  )}
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    คะแนนรีวิว
                  </Typography>
                  {result.count_review >= 0 && (
                    <Typography>
                      การรีวิว: {result.count_review} ครั้ง
                    </Typography>
                  )}
                  {result.count_rating >= 0 && (
                    <div className="flex gap-2">
                      <Rating
                        value={parseInt(
                          result.count_rating ? result.count_rating : 0,
                        )}
                        readonly
                      />
                      <p>
                        คะแนน:{result.count_rating ? result.count_rating : 0}{" "}
                        ดาว
                      </p>
                    </div>
                  )}
                  {result.name && (
                    <Typography className="mb-8 font-normal text-blue-gray-500">
                      {result.description}
                    </Typography>
                  )}
                  <div className="flex items-center justify-between">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      ราคา {result.price ? result.price : "999999"} บาท
                    </Typography>

                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      เวลา {result.duration ? result.duration : "999"} นาที
                    </Typography>
                  </div>
                </CardBody>
                <CardFooter>
                  <Button
                    className="bg-[#690B22]"
                    onClick={() => {
                      if (result.service_id)
                        navigate("/home/userservice/userbooking", {
                          state: { service_id },
                        });
                    }}
                    variant="filled"
                    fullWidth
                  >
                    จองคิวรับบริการ
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/review");
                    }}
                    variant="filled"
                    fullWidth
                    className="mt-4 bg-[#1B4D3E]"
                  >
                    รีวิวบริการ
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
        <div className="mt-5">
        <Footer />
      </div>
      </section>

   
    </>
  );
}

export default UserService;
