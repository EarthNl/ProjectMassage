import React from "react";
import {
  Button,
  Dialog,
  Typography,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

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
           <Typography variant="lead">
             ชื่อผู้ใช้งาน : {data.name ? data.name : "xxxx"}<br></br>อีเมล : {data.email ? data.email : "xxxx"}<br></br>
             เบอร์โทรศัพท์ : {data.phone ? data.phone : "xxx-xxx-xxxx"}<br></br>บทบาท : {data.role ? data.role : "xxxx"}
           </Typography>
          </DialogBody>
        )}
        <DialogFooter className="pt-0">
          <Button onClick={handleClose}>ออก</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
