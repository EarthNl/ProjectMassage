import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Carousel,
} from "@material-tailwind/react";
import { FingerPrintIcon, UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData, teamData, contactData } from "@/data";
import { Link } from "react-router-dom";

export function UserService() {
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
      
      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default UserService;
