import React, { useMemo, useState } from "react";
import {
  Button,
  Dialog,
  Typography,
  DialogBody,
  DialogFooter,
  Carousel,
} from "@material-tailwind/react";
import { apiLocal } from "@/common/axios";

export function CardDialogDetail({
  data = null,
  open = false,
  handler,
  handleClose,
}) {
  const [serImgs, setSerImgs] = useState([]);

  useMemo(async () => {
    if (data && data.imgs) {
      const imgs = data.imgs.split(",");
      setSerImgs(imgs);
    }
  }, [data]);

  return (
    <>
      <Dialog open={open} handler={handler}>
        {data && (
          <DialogBody className="h-[80vh] overflow-scroll">
            {serImgs && serImgs.length > 0 && (
              <Carousel className="rounded-xl h-80">
                {serImgs.map((url, index) => (
                  <img
                    key={index}
                    src={`${apiLocal}${url}`}
                    alt="card-image"
                    className="w-full h-full object-cover"
                  />
                ))}
              </Carousel>
            )}
            {data.name && (
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {data.name}
              </Typography>
            )}
            {data.description && (
              <Typography color="blue-gray" className="mb-2">
                {data.description}
              </Typography>
            )}
            {data.price && (
              <Typography color="blue-gray" className="mb-2">
                {data.price}
              </Typography>
            )}
            {data.duration && (
              <Typography color="blue-gray" className="mb-2">
                {data.duration}
              </Typography>
            )}
            {data.creationDate && <Typography>{data.creationDate}</Typography>}
          </DialogBody>
        )}
        <DialogFooter className="pt-0">
          <Button onClick={handleClose}>ออก</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
