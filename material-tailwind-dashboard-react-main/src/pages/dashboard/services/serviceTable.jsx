import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  IconButton,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import {
  GetService,
  InsertService,
  UpdateService,
  DeleteService,
} from "@/services/Service.service";
import ReactPaginate from "react-paginate";
import { FormDialog } from "./formDialog";
import { CardDialogDetail } from "./cardDialogDetail";

export function ServiceTable() {
  const [result, setResult] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [search, setSearch] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  //Service
  const [serviceForm, setServiceForm] = useState(null);
  const [serviceDetail, setServiceDetail] = useState(null);

  useEffect(() => {
    fetchDataService();
  }, [page, pageSize]);

  const fetchDataService = async () => {
    const res = await GetService(page, pageSize, search);
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

  const handleOpenForm = (item) => setServiceForm(item);
  const handleCloseForm = () => setServiceForm(null);

  const handleOpenDetail = (item) => setServiceDetail(item);
  const handleCloseDetail = () => setServiceDetail(null);

  const onSubmitService = async (formData,setBase64Imgs,setFiles) => {
    if (serviceForm && serviceForm.service_id) {
      const resp = await UpdateService(formData);
      if (resp && resp.status === "200") {
        await fetchDataService();
        handleCloseForm();
        setFiles([])
      }
    } else {
      const resp = await InsertService(formData);
      if (resp && resp.status === "200") {
        await fetchDataService();
        handleCloseForm();
        setFiles([])
      }
    }
  };

  const onDeleteService = async (service_id) => {
    const resp = await DeleteService(service_id);
    if (resp && resp.status === "200") {
      await fetchDataService();
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <div className="flex items-start justify-between">
            <Typography variant="h6" color="white">
              ตารางบริการ
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
                {["ลำดับ", "การบริการ", "ระยะเวลา", "ราคา", ""].map((el) => (
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
                              {indexOfItem(index)}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {item.name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {item.duration}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {item.price}
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
                              await onDeleteService(item.service_id)
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
      <FormDialog
        data={serviceForm}
        open={serviceForm ? true : false}
        handler={handleCloseForm}
        handleClose={handleCloseForm}
        onSubmit={onSubmitService}
      />
      <CardDialogDetail
        data={serviceDetail}
        open={serviceDetail ? true : false}
        handler={handleCloseDetail}
        handleClose={handleCloseDetail}
      />
    </div>
  );
}

export default ServiceTable;
