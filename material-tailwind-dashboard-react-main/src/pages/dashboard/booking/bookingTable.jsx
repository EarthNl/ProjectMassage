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
  CardFooter,
} from "@material-tailwind/react";
import React, { useEffect, useMemo, useState } from "react";
import { authorsTableData, statusBooking } from "@/data";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { DeleteBookingService, GetBookingService, UpdateBookingService } from "@/services/booking.service";
import { Form, Formik } from "formik";
import { GetListService } from "@/services/service.service";
import ReactPaginate from "react-paginate";

export function BookingTable() {
  const [readOpen, setReadOpen] = useState(null);
  const [editOpen, setEditOpen] = useState(null);
  const [deletOpen, setDeleteOpen] = useState(null);

  const [result, setResult] = useState(null);
  const [resService, setResService] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [search, setSearch] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  useMemo(async () => {
    const res_service = await GetListService();
    if (res_service) {
      setResService(res_service);
    }
  }, []);

  useEffect(() => {
    fetchDataBooking();
  }, [page, pageSize]);

  const fetchDataBooking = async () => {
    const res = await GetBookingService(page, pageSize, search);
    if (res) {
      setResult(res.data);
      setTotalCount(res.totalCount);
      setTotalPage(res.totalPages);
    }
  };

  const indexOfItem = (index) => page * pageSize - pageSize + (index + 1);


  const onPageChange = async ({ selected }) => {
    setPage(selected + 1);
  };

  const handleChangePageSize = async (number) => {
    setPageSize(parseInt(number));
  };


  const readHandleOpen = (item) => setReadOpen(item);
  const readHandleClose = () => setReadOpen(null);

  const editHandleOpen = (item) => setEditOpen(item);
  const editHandleClose = () => setEditOpen(null);

  const deleteHandleOpen = (item) => setDeleteOpen(item);
  const deleteHandleClose = () => setDeleteOpen(null);

  const onSubmitUpdateBooking = async (formData) => {
    const res = await UpdateBookingService(formData)
    if(res && res.status === "200"){
      editHandleClose()
      await fetchDataBooking()
    }
  }

  const onSubmitDeleteBooking = async (booking_id) => {
    const res = await DeleteBookingService(booking_id)
    console.log('res',res);
    
    if(res && res.status === "200"){
      deleteHandleClose()
      await fetchDataBooking()
    }
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <div className="flex items-start justify-between">
            <Typography variant="h6" color="white">
              ตารางการจอง
            </Typography>
            {/* <IconButton color="green" onClick={addHandleOpen}>
              <i className="fas fa-plus" />
            </IconButton> */}
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["รหัส", "วันที่", "เวลา", "สถานะ", ""].map((el) => (
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
              {result &&
                result.map((item, index) => {
                  const className = `py-3 px-5 ${
                    index === result.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={index}>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {indexOfItem(index)}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {item.date}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {item.time}
                        </Typography>
                      </td>
                      <td className={className}>
                        {statusBooking.map((sbook, index) => {
                          if (sbook.name === item.status) {
                            return (
                              <Chip
                                key={index}
                                variant="gradient"
                                color={sbook.color}
                                value={sbook.name}
                                className="py-0.5 px-2 text-[11px] font-medium w-fit"
                              />
                            );
                          }
                        })}
                      </td>

                      <td className={className}>
                        <div className="flex gap-4">
                          <IconButton
                            color="blue"
                            onClick={() => readHandleOpen(item)}
                          >
                            <i className="fas fa-eye" />
                          </IconButton>
                          <IconButton
                            color="amber"
                            onClick={() => editHandleOpen(item)}
                          >
                            <i className="fas fa-pencil" />
                          </IconButton>
                          <IconButton
                            color="red"
                            onClick={() => deleteHandleOpen(item)}
                          >
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
        <CardFooter>
          <div className="flex">
            <ReactPaginate
              className="flex items-center gap-4 "
              breakLabel="..."
              nextLabel={
                <Button
                  variant="text"
                  className="flex items-center gap-1 rounded-full"
                >
                  ถัดไป
                </Button>
              }
              previousLabel={
                <Button
                  variant="text"
                  className="flex items-center gap-1 rounded-full"
                >
                  ย้อนกลับ
                </Button>
              }
              pageCount={totalPage}
              renderOnZeroPageCount={null}
              onPageChange={onPageChange}
            />
            <select
              value={pageSize}
              onChange={(e) => {
                const value = e.target.value;
                handleChangePageSize(value);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              {totalCount > 0 && <option value={totalCount}>ทั้งหมด</option>}
            </select>
          </div>
        </CardFooter>
      </Card>
      {/* read modal */}
      <Dialog
        open={readOpen ? true : false}
        handler={readHandleClose}
        size="xs"
      >
        <DialogHeader className="relative m-0 block">
          ข้อมูลการจอง{" "}
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={readHandleOpen}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
        </DialogHeader>
        {readOpen && (
          <DialogBody>
            <Typography variant="lead">
              ชื่อผู้จอง : {readOpen.name}
              <br></br>บริการ : {readOpen.service_name}
              <br></br>
              วันที่ : {readOpen.date}
              <br></br>เวลา : {readOpen.time}
              <br></br>สถานะ : {readOpen.status}
            </Typography>
          </DialogBody>
        )}
      </Dialog>
      {/* edit modal */}
      <Dialog
        size="sm"
        open={editOpen ? true : false}
        handler={editHandleClose}
        className="p-4"
      >
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            แก้ไขข้อมูลการจอง
          </Typography>

          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={editHandleClose}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
        </DialogHeader>
        <Formik
          enableReinitialize
          initialValues={{
            booking_id: editOpen ? editOpen.booking_id ?? "" : "",
            booking_date: editOpen ? editOpen.date ?? "" : "",
            booking_time: editOpen ? editOpen.time ?? "" : "",
            booking_status: editOpen ? editOpen.status ?? "" : "",
            customer_name: editOpen ? editOpen.name ?? "" : "",
            service_id: editOpen ? editOpen.service_id ?? "" : "",
          }}
          onSubmit={onSubmitUpdateBooking}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <Form onSubmit={handleSubmit}>
              <DialogBody className="space-y-4 pb-6">
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 text-left font-medium"
                  >
                    ชื่อผู้จอง
                  </Typography>
                  <Input
                    name="customer_name"
                    value={values.customer_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    color="gray"
                    size="lg"
                    placeholder="ชื่อ-นามสกุล"
                    className="placeholder:opacity-100 focus:!border-t-gray-900"
                    containerProps={{
                      className: "!min-w-full",
                    }}
                    labelProps={{
                      className: "hidden",
                    }}
                  />
                </div>

                {resService && resService.length > 0 && (
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 text-left font-medium"
                    >
                      บริการ
                    </Typography>
                    <select
                      name="service_id"
                      value={values.service_id}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
                      placeholder="1"
                      labelProps={{
                        className: "hidden",
                      }}
                    >
                      {resService.map(({ name, service_id },index) => (
                        <option key={index} value={service_id}>{name}</option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="flex gap-4">
                  <div className="w-full">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 text-left font-medium"
                    >
                      วันที่
                    </Typography>
                    <Input
                      type="date"
                      name="booking_date"
                      value={values.booking_date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      color="gray"
                      size="lg"
                      placeholder="00-00-0000"
                      className="placeholder:opacity-100 focus:!border-t-gray-900"
                      containerProps={{
                        className: "!min-w-full",
                      }}
                      labelProps={{
                        className: "hidden",
                      }}
                    />
                  </div>
                  <div className="w-full">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 text-left font-medium"
                    >
                      เวลา
                    </Typography>
                    <Input
                      type="time"
                      name="booking_time"
                      value={values.booking_time}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      color="gray"
                      size="lg"
                      placeholder="00:00"
                      className="placeholder:opacity-100 focus:!border-t-gray-900"
                      containerProps={{
                        className: "!min-w-full",
                      }}
                      labelProps={{
                        className: "hidden",
                      }}
                    />
                  </div>
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 text-left font-medium"
                  >
                    สถานะการจอง
                  </Typography>
                  <select
                    name="booking_status"
                    value={values.booking_status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
                    placeholder="1"
                    labelProps={{
                      className: "hidden",
                    }}
                  >
                    {statusBooking.map((item,index) => (
                      <option key={index} value={item.name}>{item.name}</option>
                    ))}
                  </select>
                </div>
              </DialogBody>
              <DialogFooter>
                <Button className="ml-auto" type="submit">
                  แก้ไขข้อมูล
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </Dialog>
      {/* add modal */}
      {/* <Dialog size="sm" open={addOpen} handler={addHandleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Manage Item
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Keep your records up-to-date and organized.
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
              Name
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="eg. White Shoes"
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
              Category
            </Typography>
            <Select
              className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
              placeholder="1"
              labelProps={{
                className: "hidden",
              }}
            >
              <Option>Clothing</Option>
              <Option>Fashion</Option>
              <Option>Watches</Option>
            </Select>
          </div>
          <div className="flex gap-4">
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Weight
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="eg. <8.8oz | 250g"
                name="weight"
                className="placeholder:opacity-100 focus:!border-t-gray-900"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <div className="w-full">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Size
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="eg. US 8"
                name="size"
                className="placeholder:opacity-100 focus:!border-t-gray-900"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Description (Optional)
            </Typography>
            <Textarea
              rows={7}
              placeholder="eg. This is a white shoes with a comfortable sole."
              className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-600 ring-4 ring-transparent focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
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
      </Dialog> */}
      {/* delete modal */}
      <Dialog open={deletOpen ? true : false} handler={deleteHandleClose} size="xs">
        <DialogHeader>ลบข้อมูลการจอง</DialogHeader>
        <DialogBody>คุณแน่ใจแล้วใช่ไหมที่จะลบข้อมูลการจองที่เลือก</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={()=> onSubmitDeleteBooking(deletOpen.booking_id)}
            className="mr-1"
          >
            <span>ลบ</span>
          </Button>
          <Button
            variant="text"
            color="gray"
            onClick={deleteHandleClose}
            className="mr-1"
          >
            <span>ยกเลิก</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default BookingTable;
