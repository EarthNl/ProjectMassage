import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
  Avatar,
} from "@material-tailwind/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { apiLocal } from "@/common/axios";

export const validationSchema = Yup.object().shape({
    staff_name: Yup.string()
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
  return (
    <>
      <Dialog open={open} handler={handler}>
        {data && data.staff_id ? (
          <DialogHeader>แก้ไขข้อมูลพนักงาน</DialogHeader>
        ) : (
          <DialogHeader>เพิ่มข้อมูลพนักงาน</DialogHeader>
        )}
        <Formik
          validationSchema={validationSchema}
          initialValues={
            data
              ? {
                  staff_id: data.staff_id ? data.staff_id : "",
                  staff_code: data.staff_code ? data.staff_code : "",
                  staff_name: data.name ? data.name : "",
                  staff_img: "",
                  staff_imgShow: "",
                  staff_phone: data.phone ? data.phone : "",
                }
              : {
                  staff_code: "",
                  staff_name: "",
                  staff_img: "",
                  staff_imgShow: "",
                  staff_phone: "",
                }
          }
          onSubmit={onSubmit}
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
              <DialogBody>
                <div className="mb-1 flex flex-col gap-6">
                  {values.staff_code && (
                    <Input
                      name="staff_code"
                      value={values.staff_code}
                      disabled
                    />
                  )}
                  <Input
                    size="lg"
                    label="name"
                    name="staff_name"
                    value={values.staff_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Input
                    size="lg"
                    label="phone"
                    name="staff_phone"
                    value={values.staff_phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <input
                    type="file"
                    size="lg"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setFieldValue("staff_imgShow", file);
                      const reader = new FileReader();
                      reader.onload = () => {
                        setFieldValue("staff_img", reader.result);
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                </div>
                <div>
                  {values.staff_imgShow ? (
                    <Avatar
                      src={URL.createObjectURL(values.staff_imgShow)}
                      alt={"staff_img"}
                      size="lg"
                      variant="rounded"
                    />
                  ) : (
                    data &&
                    data.image_url && (
                      <Avatar
                        src={`${apiLocal}${data.image_url}`}
                        alt={data.staff_code}
                        size="lg"
                        variant="rounded"
                      />
                    )
                  )}
                </div>
              </DialogBody>
              <DialogFooter>
                <Button
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
