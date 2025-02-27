import axios from "@/common/axios";
import { reportService } from "@/helpers/contents";
import Swal from "sweetalert2";

export const ReportCountService = async () => {
  try {
    let res = await axios.post(reportService.REPORT_COUNT_URL);
    let json = await res.data;
    if (json && json.status === "200") {
      return json.data;
    }
    return null;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "NetWorkError!",
      showConfirmButton: false,
      showCloseButton: false,
    });
    return null;
  }
};


export const ReportBookingService = async () => {
  try {
    let res = await axios.post(reportService.REPORT_BOOKING_URL);
    let json = await res.data;
    if (json && json.status === "200") {
      return json.data;
    }
    return null;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "NetWorkError!",
      showConfirmButton: false,
      showCloseButton: false,
    });
    return null;
  }
};