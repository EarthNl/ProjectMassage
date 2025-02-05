import React from "react";
import {
  Button,
  Dialog,
  Typography,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { apiLocal } from "@/common/axios";

export function CardDialogDetail({
  data = null,
  open = false,
  handler,
  handleClose,
}) {
  return (
    <>
      <Dialog open={open} handler={handler}>
        {data && (
          <DialogBody>
            {data.image_url && (
              <img
                src={`${apiLocal}${data.image_url}`}
                alt="card-image"
                className="w-fit"
              />
            )}
            {data.name && (
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {data.name}
              </Typography>
            )}
            {data.phone && <Typography>{data.phone}</Typography>}
          </DialogBody>
        )}
        <DialogFooter className="pt-0">
          <Button onClick={handleClose}>ออก</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
