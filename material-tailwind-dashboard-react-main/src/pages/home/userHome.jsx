import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  Carousel,
  CardFooter,
} from "@material-tailwind/react";

import { PageTitle, Footer } from "@/widgets/layout";

import { useNavigate } from "react-router-dom";
import { GetStaffListService } from "@/services/staff.service";
import { apiLocal } from "@/common/axios";
import { GetListService } from "@/services/service.service";

export function UserHome() {
  const navigate = useNavigate();
  const [resStaff, setResStaff] = useState([]);
  const [resService, setResService] = useState([]);

  useEffect(() => {
    fetchDataService();
    fetchDataStaff();
  }, []);

  const fetchDataService = async () => {
    const result = await GetListService();
    if (result) {
      setResService(result);
      return;
    }
    setResService([]);
  };
  const fetchDataStaff = async () => {
    const result = await GetStaffListService();
    if (result) {
      setResStaff(result);
      return;
    }
    setResStaff([]);
  };
  return (
    <div className="bg-white m-5 mt-0 rounded-xl">
      <section className="relative flex h-screen content-center items-center justify-center ">
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center ">
            <Carousel
              autoplay="true"
              autoplayDelay={3000}
              loop="true"
              className="rounded-xl z-0 mt-5"
            >
              <div className="relative h-full w-full">
                <img
                  src="https://d367pvje6v6lu5.cloudfront.net/pictures/images/000/121/251/big_slider_pic/2.png?1702301265"
                  alt="image 1"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/50">
                  <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
                    <Typography
                      variant="h1"
                      color="white"
                      className="mb-6 font-black"
                    >
                      ไม้งามนวด เพื่อสุขภาพ
                    </Typography>
                    <Typography
                      variant="lead"
                      color="white"
                      className="opacity-80"
                    >
                      สาขา The Fourth พุทธมณฑลสาย4 ฝีมือมาตรฐาน บริการด้วยใจ
                      มารยาทไทยงดงาม
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="relative h-full w-full">
                <img
                  src="https://d367pvje6v6lu5.cloudfront.net/pictures/images/000/121/252/big_slider_pic/3.png?1702301265"
                  alt="image 2"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 grid h-full w-full items-center bg-black/25">
                  <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
                    <Typography
                      variant="h1"
                      color="white"
                      className="mb-6 font-black"
                    >
                      ไม้งามนวด เพื่อสุขภาพ
                    </Typography>
                    <Typography
                      variant="lead"
                      color="white"
                      className="opacity-80"
                    >
                      สาขา The Fourth พุทธมณฑลสาย4 ฝีมือมาตรฐาน บริการด้วยใจ
                      มารยาทไทยงดงาม
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="relative h-full w-full">
                <img
                  src="https://d367pvje6v6lu5.cloudfront.net/pictures/images/000/121/249/big_slider_pic/1.png?1702301258"
                  alt="image 3"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 grid h-full w-full items-center bg-black/25">
                  <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
                    <Typography
                      variant="h1"
                      color="white"
                      className="mb-6 font-black"
                    >
                      ไม้งามนวด เพื่อสุขภาพ
                    </Typography>
                    <Typography
                      variant="lead"
                      color="white"
                      className="opacity-80"
                    >
                      สาขา The Fourth พุทธมณฑลสาย4 ฝีมือมาตรฐาน บริการด้วยใจ
                      มารยาทไทยงดงาม
                    </Typography>
                  </div>
                </div>
              </div>
            </Carousel>
          </div>
        </div>
      </section>
      <section className="-mt-32  px-4 pb-20 pt-10 ">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resService &&
              resService.length > 0 &&
              resService.map(
                ({
                  service_id,
                  name,
                  description,
                  price,
                  duration,
                  image_url,
                }) => (
                  <div>
                    <Card className="shadow-lg border shadow-gray-500/10 rounded-lg bg-[#F1E3D3]">
                      <CardHeader floated={false} className="relative h-56">
                        <img
                          alt="Card Image"
                          src={`${apiLocal}${image_url}`}
                          className="h-full w-full"
                        />
                      </CardHeader>
                      <CardBody className="h-[200px]">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {duration} นาที
                        </Typography>
                        <Typography
                          variant="h5"
                          color="blue-gray"
                          className="mb-3 mt-2 font-bold"
                        >
                          {name}
                        </Typography>
                        <p className="font-normal text-blue-gray-500 line-clamp-2">
                          {description}
                        </p>
                      </CardBody>
                      <CardFooter className="flex items-center justify-between">
                        <div className="flex items-center -space-x-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            ราคา {price} บาท
                          </Typography>
                        </div>
                        <Button
                          className="bg-[#690B22]"
                          onClick={() =>
                            navigate("/home/userservice", {
                              state: { service_id: service_id },
                            })
                          }
                        >
                          เพิ่มเติม
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                ),
              )}
          </div>
        </div>
      </section>
      <section className="px-4 pt-5 pb-48  ">
        <div className="container mx-auto">
          <PageTitle
            section="ประสบการณ์สูง ผ่านการฝึกอบรมมาโดยเฉพาะ"
            heading="นักบำบัด"
          >
            ไม่เพียงแค่บรรยกาศสุดผ่อนคลาย<br></br> ไม้งาม สาขา The Fourth
            พุทธมณฑลสาย4<br></br>
            ได้คัดสรรนักบำบัดผู้เชี่ยวชาญมืออาชีพ นวดบรรเทาอาการปวดเมื่อย
            นวดคลายความเครียด ได้อย่างสมบูรณ์แบบ
          </PageTitle>
          <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
            {resStaff &&
              resStaff.length > 0 &&
              resStaff.map(({ staff_code, name, image_url, phone }, key) => (
                <Card className="max-w-xs bg-[#F1E3D3]" key={key}>
                  <Card.Body className="text-center">
                    <div className="bg-white p-2 rounded-xl">
                      <img
                        className="rounded-lg"
                        src={`${apiLocal}${image_url}`}
                        alt="profile-picture"
                      />
                      <Typography className="mt-2" type="h5">
                        ชื่อ : {name}
                      </Typography>

                      <Typography className="my-1 text-foreground">
                        เบอร์โทรศัพท์ : {phone}
                      </Typography>
                    </div>
                  </Card.Body>
                </Card>
              ))}
          </div>
        </div>
      </section>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default UserHome;
