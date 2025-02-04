import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
  Chip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Input,
  Option,
  Select,
} from "@material-tailwind/react";
import { authorsTableData } from "@/data";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

export function UserTable() {
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
              ตารางผู้ใช้งาน
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
                {[
                  "รหัส",
                  "ชื่อ-นามสกุล",
                  "อีเมล",
                  "เบอร์โทรศัพท์",
                  "บทบาท",
                  "",
                ].map((el) => (
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
                ({ id, name, email, phone, online }, key) => {
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
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {id}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {name}
                        </Typography>
                      </td>

                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {email}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {phone}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={online ? "green" : "blue-gray"}
                          value={online ? "online" : "offline"}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        />
                      </td>
                      <td className={className}>
                        <div className="flex gap-4" >
                          <IconButton color="blue" onClick={readHandleOpen}>
                            <i className="fas fa-eye" />
                          </IconButton>
                          <IconButton
                            as="a"
                            href="#"
                            color="amber"
                            onClick={editHandleOpen}
                          >
                            <i className="fas fa-pencil" />
                          </IconButton>
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
      {/* read modal */}
      <Dialog open={readOpen} handler={readHandleOpen} size="xs">
        <DialogHeader className="relative m-0 block">
          ข้อมูลผู้ใช้งาน{" "}
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
            ชื่อผู้ใช้งาน : xxx<br></br>อีเมล : xxx<br></br>
            รหัสผ่าน : xxx<br></br>เบอร์ดทรศัพท์ : xxx<br></br>บทบาท : xxx
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
            แก้ไขข้อมูลผู้ใช้งาน
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
              ชื่อ
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
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              อีเมล
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="mail@mail.com"
              name="mail"
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
              รหัสผ่าน
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="password"
              name="password"
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
              เบอร์โทร
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="xxx-xxxxxxx"
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
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              บทบาทผู้ใช้งาน
            </Typography>
            <Select
              className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
              placeholder="1"
              labelProps={{
                className: "hidden",
              }}
            >
              <Option>บทบาทผู้ใช้งาน1</Option>
              <Option>บทบาทผู้ใช้งาน2</Option>
              <Option>บทบาทผู้ใช้งาน3</Option>
            </Select>
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
            เพิ่มผู้ใช้งาน
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
              ชื่อ
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
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              อีเมล
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="mail@mail.com"
              name="mail"
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
              รหัสผ่าน
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="password"
              name="password"
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
              เบอร์โทร
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="xxx-xxxxxxx"
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
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              บทบาทผู้ใช้งาน
            </Typography>
            <Select
              className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
              placeholder="1"
              labelProps={{
                className: "hidden",
              }}
            >
              <Option>บทบาทผู้ใช้งาน1</Option>
              <Option>บทบาทผู้ใช้งาน2</Option>
              <Option>บทบาทผู้ใช้งาน3</Option>
            </Select>
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
        <DialogHeader>ลบข้อมูลการจอง</DialogHeader>
        <DialogBody>คุณแน่ใจแล้วใช่ไหมที่จะลบข้อมูลการจองที่เลือก</DialogBody>
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

export default UserTable;
