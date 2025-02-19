import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Carousel, CardFooter
} from "@material-tailwind/react";
import { FingerPrintIcon, UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData, teamData, contactData } from "@/data";
import { UserService } from "@/pages/dashboard/user/userService";

import { Link } from "react-router-dom";

export function UserHome() {
  return (
    <>
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
        <div className="absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center ">
            <Carousel loop="true" className="rounded-xl">
              <div className="relative h-full w-full">
                <img
                  src="https://d367pvje6v6lu5.cloudfront.net/pictures/images/000/121/251/big_slider_pic/2.png?1702301265"
                  alt="image 1"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/25">
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
      </div>
      <section className="-mt-32 bg-white px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map(({ color, title, icon, description }) => (
              <div>
                <Card className="shadow-lg border shadow-gray-500/10 rounded-lg">
                  <CardHeader floated={false} className="relative h-56">
                    <img
                      alt="Card Image"
                      src="https://img.freepik.com/free-photo/closeup-relaxed-woman-getting-back-massage-with-herbal-balls-health-spa_637285-2100.jpg?t=st=1738771514~exp=1738775114~hmac=46eaadb5d71f0dca8cdf738ed261aec2e8e3bfd4f0a18a2151b619f58fa35654&w=996"
                      className="h-full w-full"
                    />
                  </CardHeader>
                  <CardBody>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      60 นาที
                    </Typography>
                    <Typography
                      variant="h5"
                      color="blue-gray"
                      className="mb-3 mt-2 font-bold"
                    >
                      {title}
                    </Typography>
                    <Typography className="font-normal text-blue-gray-500">
                      {description}
                    </Typography>

                  </CardBody>
                  <CardFooter className="flex items-center justify-between">
                    <div className="flex items-center -space-x-3">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        ราคา 350 บาท
                      </Typography>
                      
                    </div>
                    <Button>เพิ่มเติม</Button>
                  </CardFooter>
                </Card>

              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="px-4 pt-10 pb-48  bg-white ">
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
            {teamData.map(({ img, name, position, socials }) => (
              <TeamCard
                key={name}
                img={img}
                name={name}
                position={position}
                socials={
                  <div className="flex items-center gap-2">
                    {socials.map(({ color, name }) => (
                      <IconButton key={name} color={color} variant="text">
                        <i className={`fa-brands text-xl fa-${name}`} />
                      </IconButton>
                    ))}
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>
      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default UserHome;
