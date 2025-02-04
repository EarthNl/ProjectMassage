import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { authorsTableData } from "@/data";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

export function ReviewTable() {
  const [readOpen, setReadOpen] = React.useState(false);
  const readHandleOpen = () => setReadOpen(!readOpen);
  const [deletOpen, setDeleteOpen] = React.useState(false);
  const deleteHandleOpen = () => setDeleteOpen(!deletOpen);
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            ตารางรีวิว
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["การบริการ", "คะแนน", "ผู้ใช้ที่รีวิว", ""].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {authorsTableData.map(
                ({ id, img, name, email, job, online, date }, key) => {
                  const className = `py-3 px-5 ${
                    key === authorsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={id}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {job[0]}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {id}
                        </Typography>
                      </td>

                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="flex gap-4">
                          <IconButton color="red" onClick={deleteHandleOpen}>
                            <i className="fas fa-trash" />
                          </IconButton>
                        </div>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {/* delete modal */}
      <Dialog open={deletOpen} handler={deleteHandleOpen} size="xs">
        <DialogHeader>ลบข้อมูล</DialogHeader>
        <DialogBody>คุณแน่ใจแล้วใช่ไหมที่จะลบข้อมูลที่เลือก</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={deleteHandleOpen}
            className="mr-1"
          >
            <span>ลบ</span>
          </Button>
          <Button
            variant="text"
            color="gray"
            onClick={deleteHandleOpen}
            className="mr-1"
          >
            <span>ยกเลิก</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default ReviewTable;
