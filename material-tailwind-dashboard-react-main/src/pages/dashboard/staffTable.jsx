import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
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

export function StaffTable() {
  const [readOpen, setReadOpen] = React.useState(false);
    const readHandleOpen = () => setReadOpen(!readOpen);
    const [addOpen, setAddOpen] = React.useState(false);
    const addHandleOpen = () => setAddOpen(!addOpen);
    const [editOpen, setEditOpen] = React.useState(false);
    const editHandleOpen = () => setEditOpen(!editOpen);
    const [deletOpen, setDeleteOpen] = React.useState(false);
    const deleteHandleOpen = () => setDeleteOpen(!deletOpen);
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <div className="flex items-start justify-between">
            <Typography variant="h6" color="white">
              ตารางพนักงาน
            </Typography>
            <IconButton color="green" onClick={addHandleOpen}>
              <i className="fas fa-user-plus" />
            </IconButton>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["รหัส", "รูปพนักงาน", "ชื่อ", "เบอร์โทรศัพท์", ""].map(
                  (el) => (
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
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {authorsTableData.map(({ id, img, name, phone }, key) => {
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
                            {id}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={className}>
                      <Avatar src={img} alt={id} size="sm" variant="rounded" />
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-normal text-blue-gray-500">
                        {name}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {phone}
                      </Typography>
                    </td>
                    <td className={className}>
                      <div className="flex gap-4" >
                        <IconButton color="blue" onClick={readHandleOpen}>
                          <i className="fas fa-eye" />
                        </IconButton>
                        <IconButton as="a" href="#" color="amber" onClick={editHandleOpen}>
                          <i className="fas fa-pencil" />
                        </IconButton>
                        <IconButton color="red" onClick={deleteHandleOpen}>
                          <i className="fas fa-trash" />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
       {/* read modal */}
            <Dialog open={readOpen} handler={readHandleOpen} size="xs">
              <DialogHeader className="relative m-0 block">
                ข้อมูลพนักงาน{" "}
                <IconButton
                  size="sm"
                  variant="text"
                  className="!absolute right-3.5 top-3.5"
                  onClick={readHandleOpen}
                >
                  <XMarkIcon className="h-4 w-4 stroke-2" />
                </IconButton>
              </DialogHeader>
              <DialogBody>
                <Typography variant="lead">
                  รูป : xxx<br></br>ชื่อ-นามสกุล : xxx<br></br>
                  เบอร์โทรศัพท์ : xxx<br></br>ระยะเวลา : xxx
                </Typography>
              </DialogBody>
              <DialogFooter></DialogFooter>
            </Dialog>
            {/* edit modal */}
            <Dialog
              size="sm"
              open={editOpen}
              handler={editHandleOpen}
              className="p-4"
            >
              <DialogHeader className="relative m-0 block">
                <Typography variant="h4" color="blue-gray">
                  แก้ไขข้อมูลพนักงาน
                </Typography>
      
                <IconButton
                  size="sm"
                  variant="text"
                  className="!absolute right-3.5 top-3.5"
                  onClick={editHandleOpen}
                >
                  <XMarkIcon className="h-4 w-4 stroke-2" />
                </IconButton>
              </DialogHeader>
              <DialogBody className="space-y-4 pb-6">
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 text-left font-medium"
                  >
                    ชื่อพนักงาน
                  </Typography>
                  <Input
                    color="gray"
                    size="lg"
                    placeholder="ชื่อ-นามสกุล"
                    name="name"
                    className="placeholder:opacity-100 focus:!border-t-gray-900"
                    containerProps={{
                      className: "!min-w-full",
                    }}
                    labelProps={{
                      className: "hidden",
                    }}
                  />
                </div>              
                <div>
                  <Typography
                    name="description"
                    color="gray"
                    className="mb-2 text-left font-medium"
                  >
                    เบอร์โทรศัพท์
                  </Typography>
                  <Input
                    color="gray"
                    size="lg"
                    placeholder="xxx-xxxxxxx"
                    name="phone"
                    className="placeholder:opacity-100 focus:!border-t-gray-900"
                    containerProps={{
                      className: "!min-w-full",
                    }}
                    labelProps={{
                      className: "hidden",
                    }}
                  />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 text-left font-medium"
                  >
                    รูปพนักงาน
                  </Typography>
                  <Input
                    color="gray"
                    size="lg"
                    name="image"
                    className="placeholder:opacity-100 focus:!border-t-gray-900"
                    containerProps={{
                      className: "!min-w-full",
                    }}
                    labelProps={{
                      className: "hidden",
                    }}
                  />
                </div>
              </DialogBody>
              <DialogFooter>
                <Button className="ml-auto" onClick={editHandleOpen}>
                  แก้ไขข้อมูล
                </Button>
              </DialogFooter>
            </Dialog>
            {/* add modal */}
            <Dialog size="sm" open={addOpen} handler={addHandleOpen} className="p-4">
              <DialogHeader className="relative m-0 block">
                <Typography variant="h4" color="blue-gray">
                  เพิ่มข้อมูลพนักงาน
                </Typography>
                <IconButton
                  size="sm"
                  variant="text"
                  className="!absolute right-3.5 top-3.5"
                  onClick={addHandleOpen}
                >
                  <XMarkIcon className="h-4 w-4 stroke-2" />
                </IconButton>
              </DialogHeader>
              <DialogBody className="space-y-4 pb-6">
              <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 text-left font-medium"
                  >
                    ชื่อพนักงาน
                  </Typography>
                  <Input
                    color="gray"
                    size="lg"
                    placeholder="ชื่อ-นามสกุล"
                    name="name"
                    className="placeholder:opacity-100 focus:!border-t-gray-900"
                    containerProps={{
                      className: "!min-w-full",
                    }}
                    labelProps={{
                      className: "hidden",
                    }}
                  />
                </div>              
                <div>
                  <Typography
                    name="description"
                    color="gray"
                    className="mb-2 text-left font-medium"
                  >
                    เบอร์โทรศัพท์
                  </Typography>
                  <Input
                    color="gray"
                    size="lg"
                    placeholder="xxx-xxxxxxx"
                    name="phone"
                    className="placeholder:opacity-100 focus:!border-t-gray-900"
                    containerProps={{
                      className: "!min-w-full",
                    }}
                    labelProps={{
                      className: "hidden",
                    }}
                  />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 text-left font-medium"
                  >
                    รูปพนักงาน
                  </Typography>
                  <Input
                    color="gray"
                    size="lg"
                    name="image"
                    className="placeholder:opacity-100 focus:!border-t-gray-900"
                    containerProps={{
                      className: "!min-w-full",
                    }}
                    labelProps={{
                      className: "hidden",
                    }}
                  />
                </div>
              </DialogBody>
              <DialogFooter>
                <Button className="ml-auto" onClick={addHandleOpen}>
                  บันทึกข้อมูล
                </Button>
              </DialogFooter>
            </Dialog>
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

export default StaffTable;
