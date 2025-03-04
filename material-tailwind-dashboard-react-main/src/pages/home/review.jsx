import React, { useMemo, useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Textarea,
  Button,
  Typography,
  Rating,
} from "@material-tailwind/react";
import { GetListService } from "@/services/service.service";
import { Form, Formik } from "formik";
import { InsertReviewService } from "@/services/review.service";

export function Review() {
  const [services, setServices] = useState([]);

  useMemo(async () => {
    const res = await GetListService();
    if (res) {
      setServices(res);
      return;
    }
    setServices([]);
  }, []);

  const [review, setReview] = useState({
    name: "",
    service: "",
    rating: 0,
    comment: "",
  });

  const handleSubmitReview = async (formData) => {
    const res = await InsertReviewService(formData);
    if (res && res.status) {
      switch (res.status) {
        case "200":
          alert("ขอบคุณสำหรับรีวิวของคุณ!");
          return;
        default:
          console.log('ERROR',res.detail);          
          return;
      }
    }
  
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <Card>
        <Formik
          initialValues={{
            customer_name: "",
            review_rating: 1,
            review_comment: "",
            service_id: "",
          }}
          onSubmit={handleSubmitReview}
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
              <CardBody>
                <Typography variant="h4" color="blue-gray">
                  รีวิวบริการ
                </Typography>

                <div className="my-4">
                  <Input
                    label="ชื่อ-นามสกุล"
                    name="customer_name"
                    value={values.customer_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                <div className="w-full">
                  <p>เลือกบริการ</p>
                  <select
                    name="service_id"
                    value={values.service_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">ทั้งหมด</option>
                    {services &&
                      services.length > 0 &&
                      services.map((item, index) => (
                        <option key={index} value={item.service_id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="my-4">
                  <Typography>ให้คะแนน: {values.review_rating} ดาว</Typography>
                  <div className="flex space-x-2">
                    <Rating value={values.review_rating} 
                    onChange={(value)=> {
                      setFieldValue('review_rating',value)
                      }} />
                  </div>
                </div>

                <div className="my-4">
                  <Textarea
                    label="ความคิดเห็น"
                    name="review_comment"
                    value={values.review_comment}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                <Button  type="submit" fullWidth>
                  ส่งรีวิว
                </Button>
              </CardBody>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
}

export default Review;
