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
  CardFooter,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { statusBooking } from "@/data";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  DeleteReviewService,
  GetReviewService,
} from "@/services/review.service";
import ReactPaginate from "react-paginate";

export function ReviewTable() {
  const [deletOpen, setDeleteOpen] = useState(null);
  const [result, setResult] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [search, setSearch] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    fetchDataReview();
  }, [page, pageSize]);

  const fetchDataReview = async () => {
    const res = await GetReviewService(page, pageSize, search);
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

  const deleteHandleOpen = (item) => setDeleteOpen(item);
  const deleteHandleClose = () => setDeleteOpen(null);

  const onSubmitDeleteBooking = async (id) => {
    const res = await DeleteReviewService(id);
    console.log("res", res);

    if (res && res.status === "200") {
      deleteHandleClose();
      await fetchDataReview();
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <div className="flex items-start justify-between">
            <Typography variant="h6" color="white">
              ตารางรีวิว
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
                {["ลำดับ", "ชื่อ", "รีวิว", "ดาว", "บริการ", "วันที่รีวิว", ""].map(
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
                          {item.name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {item.comment}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {item.rating}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {item.service_name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {item.creationDate}
                        </Typography>
                      </td>

                      <td className={className}>
                        <div className="flex gap-4">
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

      <Dialog
        open={deletOpen ? true : false}
        handler={deleteHandleClose}
        size="xs"
      >
        <DialogHeader>ลบข้อมูลรีวิว</DialogHeader>
        <DialogBody>คุณแน่ใจแล้วใช่ไหมที่จะลบข้อมูลรีวิวที่เลือก</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => onSubmitDeleteBooking(deletOpen.review_id)}
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

export default ReviewTable;
