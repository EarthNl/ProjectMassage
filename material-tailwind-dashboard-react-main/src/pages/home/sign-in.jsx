import { setStorage } from "@/helpers/contents";
import { UserLoginService } from "@/services/user.service";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Form, Formik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";

export function SignIn() {
  const [reqUP, setReqUP] = useState(false)
  const onSubmitLogin = async (formData) => {
    const res = await UserLoginService(formData);
    if (res && res.status) {
      switch (res.status) {
        case "200":
          setStorage('user',res.data.user_name)
          setStorage('role',res.data.user_role)
          window.location.reload()
          break;
        case "401":
          setReqUP(true)
          break;
        default:
          console.log('Error',res.detail);         
          break;
      }
    }

    console.log("res", res);
  };
  return (
    <section className="m-5 mt-0 flex gap-4 bg-white rounded-3xl">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            เข้าสู่ระบบ
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            ใส่อีเมลและรหัสผ่านของคุณ เพื่อเข้าสู่ระบบ<br></br>สำหรับผู้ดูแลระบบ 
          </Typography>
        </div>
        <Formik
          initialValues={{
            user_email: "",
            user_pass: "",
          }}
          onSubmit={onSubmitLogin}
        >
          {({ values, touched, handleChange, handleBlur, handleSubmit }) => (
            <Form
              onSubmit={handleSubmit}
              className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
            >
              <div className="mb-1 flex flex-col gap-6">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="-mb-3 font-medium"
                >
                  อีเมล
                </Typography>
                <Input
                  name="user_email"
                  value={values.user_email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="lg"
                  placeholder="name@mail.com"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="-mb-3 font-medium"
                >
                  รหัสผ่าน
                </Typography>
                <Input
                  name="user_pass"
                  value={values.user_pass}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="password"
                  size="lg"
                  placeholder="********"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              {reqUP && <p>อีเมล หรือรหัสผ่านไม่ถูกต้อง</p>}
             
              <Button type="submit" className="mt-6" fullWidth>
                เข้าสู่ระบบ
              </Button>

            
            </Form>
          )}
        </Formik>
      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/profile-maingam.jpg"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
    </section>
  );
}

export default SignIn;
