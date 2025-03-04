import React, { useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Textarea,
  Button,
  Typography,
  Select,
  Option,
  Rating,
} from "@material-tailwind/react";

export function Review() {
  const [review, setReview] = useState({
    name: "",
    service: "",
    rating: 0,
    comment: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Review Submitted:", review);
    alert("ขอบคุณสำหรับรีวิวของคุณ!");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <Card>
        <CardBody>
          <Typography variant="h4" color="blue-gray">
            รีวิวบริการ
          </Typography>

          <div className="my-4">
            <Input
              label="ชื่อ-นามสกุล"
              value={review.name}
              onChange={(e) => setReview({ ...review, name: e.target.value })}
            />
          </div>

          <div className="my-4">
            <Select
              label="เลือกบริการ"
              onChange={(value) => setReview({ ...review, service: value })}
            >
              <Option value="นวดไทย">นวดไทย</Option>
              <Option value="นวดน้ำมัน">นวดน้ำมัน</Option>
              <Option value="นวดเท้า">นวดเท้า</Option>
            </Select>
          </div>

          <div className="my-4">
            <Typography>ให้คะแนน:</Typography>
            <div className="flex space-x-2">
              <Rating value={review.rating} />
            </div>
          </div>

          <div className="my-4">
            <Textarea
              label="ความคิดเห็น"
              value={review.comment}
              onChange={(e) =>
                setReview({ ...review, comment: e.target.value })
              }
            />
          </div>

          <Button onClick={handleSubmit} fullWidth>
            ส่งรีวิว
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}

export default Review;
