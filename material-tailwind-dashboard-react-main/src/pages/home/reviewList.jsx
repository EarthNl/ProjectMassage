import React, { useEffect, useMemo, useState } from "react";
import { Card, CardBody, Typography, Rating } from "@material-tailwind/react";
import { GetListReviewService } from "@/services/review.service";
import { GetListService } from "@/services/service.service";


export function ReviewList() {
  const [services, setServices] = useState([])
  const [reviews, setReviews] = useState([])
  const [selectedService, setSelectedService] = useState("");

  useMemo(async () => {
    const res = await GetListService()
    if(res){
      setServices(res)
      return
    }
    setServices([])
  } , [])

  useEffect(() => {
    fetchDataReview()
  }, [selectedService])
  
  const fetchDataReview = async () => {
    const res = await GetListReviewService(selectedService)
    if(res){
      setReviews(res)
      return
    }
    setReviews([])
  }

  
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Typography variant="h4" color="blue-gray" className="mb-4 text-center">
        รีวิวจากลูกค้า
      </Typography>
      <div className="w-full">
        <p>กรองตามบริการ</p>
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
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

      <div className="mt-6 space-y-4">
        {reviews.length > 0 ? (
          reviews.map((rew, index) => (
            <Card key={index} className="shadow-lg">
              <CardBody>
                <Typography variant="h6" color="blue-gray">
                  {rew.name} ({rew.service_name})
                </Typography>
                {rew.rating >= 0 && (
                  <div className="flex gap-2 items-center">
                    <Rating value={rew.rating} readonly />
                    <Typography className="mt-2">{rew.rating} ดาว</Typography>
                  </div>
                )}
                <Typography className="mt-2">{rew.comment}</Typography>
              </CardBody>
            </Card>
          ))
        ) : (
          <Typography className="text-center mt-4 text-gray-500">
            ยังไม่มีรีวิวสำหรับบริการนี้
          </Typography>
        )}
      </div>
    </div>
  );
}

export default ReviewList;
