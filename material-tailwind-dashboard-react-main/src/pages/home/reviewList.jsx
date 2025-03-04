import React, { useState } from "react";
import { Card, CardBody, Typography, Select, Option } from "@material-tailwind/react";

const reviews = [
  { name: "สมชาย นิลทอง", service: "นวดไทย", rating: 5, comment: "บริการดีมาก ผ่อนคลายสุดๆ!" },
  { name: "วิไลลักษณ์ ใจดี", service: "นวดน้ำมัน", rating: 4, comment: "นวดดีมาก น้ำมันหอมและสบายตัว" },
  { name: "ธนากร มั่นคง", service: "นวดเท้า", rating: 5, comment: "สบายเท้ามาก คลายปวดเมื่อยได้ดี" },
  { name: "อารยา สายทอง", service: "นวดไทย", rating: 4, comment: "นวดดี แต่รู้สึกเจ็บนิดหน่อย" },
];

export function ReviewList() {
  const [selectedService, setSelectedService] = useState("ทั้งหมด");

  const filteredReviews =
    selectedService === "ทั้งหมด"
      ? reviews
      : reviews.filter((review) => review.service === selectedService);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Typography variant="h4" color="blue-gray" className="mb-4 text-center">
        รีวิวจากลูกค้า
      </Typography>

      <Select label="กรองตามบริการ" onChange={(value) => setSelectedService(value)}>
        <Option value="ทั้งหมด">ทั้งหมด</Option>
        <Option value="นวดไทย">นวดไทย</Option>
        <Option value="นวดน้ำมัน">นวดน้ำมัน</Option>
        <Option value="นวดเท้า">นวดเท้า</Option>
      </Select>

      <div className="mt-6 space-y-4">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review, index) => (
            <Card key={index} className="shadow-lg">
              <CardBody>
                <Typography variant="h6" color="blue-gray">
                  {review.name} ({review.service})
                </Typography>
                <Typography className="text-yellow-500">
                  {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                </Typography>
                <Typography className="mt-2">{review.comment}</Typography>
              </CardBody>
            </Card>
          ))
        ) : (
          <Typography className="text-center mt-4 text-gray-500">ยังไม่มีรีวิวสำหรับบริการนี้</Typography>
        )}
      </div>
    </div>
  );
}

export default ReviewList;
