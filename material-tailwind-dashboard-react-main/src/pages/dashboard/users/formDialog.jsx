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

export const validationSchema = Yup.object().shape({
  user_name: Yup.string()
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
        {data && data.user_id ? (
          <DialogHeader>แก้ไขข้อมูลผู้ใช้งาน</DialogHeader>
        ) : (
          <DialogHeader>เพิ่มข้อมูลผู้ใช้งาน</DialogHeader>
        )}
        <Formik
          validationSchema={validationSchema}
          initialValues={
            data
              ? {
                  user_id: data.user_id ? data.user_id : "",
                  user_name: data.name ? data.name : "",
                  user_phone: data.phone ? data.phone : "",
                  user_email: data.email ? data.email : "",
                  user_pass: data.password ? data.password : "",
                  user_new_pass: "",
                  user_role: data.role ? data.role : "",
                }
              : {
                  user_name: "",
                  user_email: "",
                  user_phone: "",
                  user_pass: "",
                  user_role: "customer",
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
                  <Input
                    size="lg"
                    label="ชื่อ"
                    name="user_name"
                    value={values.user_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Input
                    size="lg"
                    label="เบอร์โทรศัพท์"
                    name="user_phone"
                    value={values.user_phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Input
                    size="lg"
                    label="อีเมล"
                    name="user_email"
                    value={values.user_email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {data && data.user_id ? (
                    <Input
                      size="lg"
                      label="รหัสผ่านใหม่"
                      name="user_new_pass"
                      value={values.user_new_pass}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  ) : (
                    <Input
                      size="lg"
                      label="รหัสผ่าน"
                      name="user_pass"
                      value={values.user_pass}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  )}
                  <div class="relative">
                    <select
                      name="user_role"
                      value={values.user_role}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                    >
                      <option value="">None</option>
                      <option value="admin">Admin</option>
                      <option value="customer">Customer</option>
                    </select>
                  </div>
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
