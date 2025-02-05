import axios from "@/common/axios";
import { staffService } from "@/helpers/contents";

export const GetStaffService = async (page, pageSize, search) => {
  try {
    const body = { page, pageSize, search };
    let res = await axios.post(staffService.GET_STAFF_URL, body);
    let json = await res.data;
    if (json && json.status === "200") {
      return json;
    }
    return null;
  } catch (error) {
    console.log("error", error);
  }
};


export const InsertStaffService = async (formData) => {
  try {
    const body = { ...formData };
    let res = await axios.post(staffService.INSERT_STAFF_URL, body);
    let json = await res.data;
    return json;
  } catch (error) {
    console.log("error", error);
  }
};


export const UpdateStaffService = async (formData) => {
  try {
    const body = { ...formData };
    let res = await axios.post(staffService.UPDATE_STAFF_URL, body);
    let json = await res.data;
    return json;
  } catch (error) {
    console.log("error", error);
  }
};

export const DeleteStaffService = async (staff_id) => {
  try {
    const body = { staff_id };
    let res = await axios.post(staffService.DELETE_STAFF_URL, body);
    let json = await res.data;
    return json;
  } catch (error) {
    console.log("error", error);
  }
};

