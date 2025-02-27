import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
  Avatar,
  Carousel,
  IconButton,
} from "@material-tailwind/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { apiLocal } from "@/common/axios";

export const validationSchema = Yup.object().shape({
  service_name: Yup.string()
    .max(100, "สูงสุด 100 ตัวอักษร")
    .required("กรุณากรอกข้อมูล"),
});

export function FormDialog({
  data = null,
  open = false,
  handler,
  handleClose,
  onSubmit,
}) {
  const [base64Imgs, setBase64Imgs] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setBase64Imgs([])
    setFiles([])
  }, [])
  

  const handleFileChange = (event) => {
    setBase64Imgs([]);
    setFiles([])
    const selectedFiles = event.target.files;
    
    Array.from(selectedFiles).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setBase64Imgs((prev) => [...prev, reader.result]);
      };
      setFiles((prev) => [...prev, file]);
      reader.readAsDataURL(file);
    });
  };

  const handSubmit = async (value) => {
    let newValue = value;
    if (base64Imgs && base64Imgs.length > 0) {
      newValue = { ...value, service_imgs: base64Imgs };
    }
    onSubmit(newValue,setBase64Imgs(),setFiles());
  };

  return (
    <>
      <Dialog open={open} handler={handler}>
        {data && data.service_id ? (
          <DialogHeader>แก้ไขข้อมูลบริการ</DialogHeader>
        ) : (
          <DialogHeader>เพิ่มข้อมูลบริการ</DialogHeader>
        )}
        <Formik
          validationSchema={validationSchema}
          initialValues={
            data
              ? {
                  service_id: data.service_id ? data.service_id : "",
                  service_name: data.name ? data.name : "",
                  service_price: data.price ? data.price : "",
                  service_duration: data.duration ? data.duration : "",
                  service_desc: data.description ? data.description : "",
                  service_imgs: [],
                  imgs: data.imgs ? data.imgs.split(",") : [],
    
                }
              : {
                  service_name: "",
                  service_price: "",
                  service_duration: "",
                  service_desc: "",
                  service_imgs: [],
                  imgs:[]
         
                }
          }
          onSubmit={handSubmit}
        >
          {({
            values,
            errors,
            touched,
            setFieldValue,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <Form onSubmit={handleSubmit}>
              <DialogBody className="h-[80vh] overflow-y-scroll">
                <div className="mb-1 flex flex-col gap-6">
                  <Input
                    size="lg"
                    label="การบริการ"
                    name="service_name"
                    value={values.service_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <Input
                    size="lg"
                    label="คำอธิบาย"
                    name="service_desc"
                    value={values.service_desc}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <Input
                    size="lg"
                    label="ระยะเวลา"
                    name="service_duration"
                    value={values.service_duration}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <Input
                    size="lg"
                    label="ราคา"
                    name="service_price"
                    value={values.service_price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <input
                    type="file"
                    size="lg"
                    multiple
                    onChange={handleFileChange}
                  />
                </div>
                <div>
                  {files && files.length > 0 ? (
                    <Carousel className="rounded-xl h-80" prevArrow={({ handlePrev }) => (
                      <IconButton
                        variant="text"
                        color="white"
                        size="lg"
                        onClick={handlePrev}
                        className="!absolute top-2/4 left-4 -translate-y-2/4"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                          />
                        </svg>
                      </IconButton>
                    )}
                    nextArrow={({ handleNext }) => (
                      <IconButton
                        variant="text"
                        color="white"
                        size="lg"
                        onClick={handleNext}
                        className="!absolute top-2/4 !right-4 -translate-y-2/4"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </IconButton>
                    )}>

                      {files.map((url, index) => (
                        <img
                          key={index}
                          src={URL.createObjectURL(url)}
                          alt="card-image"
                          className="w-full h-full object-cover"
                        />
                      ))}
                    </Carousel>
                  ) : (
                    values.imgs &&
                    values.imgs.length > 0 && (
                      <Carousel className="rounded-xl h-80"  prevArrow={({ handlePrev }) => (
                        <IconButton
                          variant="text"
                          color="white"
                          size="lg"
                          onClick={handlePrev}
                          className="!absolute top-2/4 left-4 -translate-y-2/4"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                            />
                          </svg>
                        </IconButton>
                      )}
                      nextArrow={({ handleNext }) => (
                        <IconButton
                          variant="text"
                          color="white"
                          size="lg"
                          onClick={handleNext}
                          className="!absolute top-2/4 !right-4 -translate-y-2/4"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                            />
                          </svg>
                        </IconButton>
                      )}>
                        {values.imgs.map((url, index) => (
                          <img
                            key={index}
                            src={`${apiLocal}${url}`}
                            alt="card-image"
                            className="w-full h-full object-cover"
                          />
                        ))}
                      </Carousel>
                    )
                  )}
                </div>
              </DialogBody>
              <DialogFooter>
                <Button
                  type="button"
                  variant="text"
                  color="red"
                  onClick={handleClose}
                  className="mr-1"
                >
                  <span>ออก</span>
                </Button>
                <Button variant="gradient" color="green" type="submit">
                  <span>ยืนยัน</span>
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
}
