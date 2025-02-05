import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  IconButton,
  CardFooter,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import {
  DeleteStaffService,
  GetStaffService,
  InsertStaffService,
  UpdateStaffService,
} from "@/services/staff.service";
import { apiLocal } from "@/common/axios";
import ReactPaginate from "react-paginate";
import { FormDialog } from "./formDialog";
import { CardDialogDetail } from "./cardDialogDetail";

export function StaffTable() {
  const [result, setResult] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [search, setSearch] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  //staff
  const [staffForm, setStaffForm] = useState(null);
  const [staffDetail, setStaffDetail] = useState(null);

  useEffect(() => {
    fetchDataStaff();
  }, [page, pageSize]);

  const fetchDataStaff = async () => {
    const res = await GetStaffService(page, pageSize, search);
    if (res) {
      setResult(res.data);
      setTotalCount(res.totalCount);
      setTotalPage(res.totalPages);
    }
  };

  const onPageChange = async ({ selected }) => {
    setPage(selected + 1);
  };

  const handleChangePageSize = async (number) => {
    setPageSize(parseInt(number));
  };

  const handleOpenForm = (item) => setStaffForm(item);
  const handleCloseForm = () => setStaffForm(null);

  const handleOpenDetail = (item) => setStaffDetail(item);
  const handleCloseDetail = () => setStaffDetail(null);

  const onSubmitStaff = async (formData) => {
    if (staffForm && staffForm.staff_id) {
      const resp = await UpdateStaffService(formData);
      if (resp && resp.status === "200") {
        await fetchDataStaff();
        handleCloseForm();
      }
    } else {
      const resp = await InsertStaffService(formData);
      if (resp && resp.status === "200") {
        await fetchDataStaff();
        handleCloseForm();
      }
    }
  };

  const onDeleteStaff = async (staff_id) => {
    const resp = await DeleteStaffService(staff_id);
    if (resp && resp.status === "200") {
      await fetchDataStaff();
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <div className="flex items-start justify-between">
            <Typography variant="h6" color="white">
              ตารางพนักงาน
            </Typography>
            <IconButton color="green" onClick={() => handleOpenForm({})}>
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
              {result &&
                result.length > 0 &&
                result.map((item, index) => {
                  const className = `py-3 px-5 ${
                    index === result.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={index}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {item.staff_code}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        {item.image_url ? (
                          <Avatar
                            src={`${apiLocal}${item.image_url}`}
                            alt={item.staff_code}
                            size="sm"
                            variant="rounded"
                          />
                        ) : (
                          <div></div>
                        )}
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {item.name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {item.phone}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="flex gap-4">
                          <IconButton
                            color="blue"
                            onClick={() => handleOpenDetail(item)}
                          >
                            <i className="fas fa-eye" />
                          </IconButton>
                          <IconButton
                            as="a"
                            href="#"
                            color="amber"
                            onClick={() => handleOpenForm(item)}
                          >
                            <i className="fas fa-pencil" />
                          </IconButton>
                          <IconButton
                            color="red"
                            onClick={async () =>
                              await onDeleteStaff(item.staff_id)
                            }
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
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            pageCount={totalPage}
            previousLabel="< previous"
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
        </CardFooter>
      </Card>
      <FormDialog
        data={staffForm}
        open={staffForm ? true : false}
        handler={handleCloseForm}
        handleClose={handleCloseForm}
        onSubmit={onSubmitStaff}
      />
      <CardDialogDetail
        data={staffDetail}
        open={staffDetail ? true : false}
        handler={handleCloseDetail}
        handleClose={handleCloseDetail}
      />
    </div>
  );
}

export default StaffTable;
