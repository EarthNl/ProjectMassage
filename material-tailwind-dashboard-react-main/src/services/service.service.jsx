import axios from "@/common/axios";
import { serviceService } from "@/helpers/contents";

export const GetService = async (page, pageSize, search) => {
  try {
    const body = { page, pageSize, search };
    let res = await axios.post(serviceService.GET_SERVICE_URL, body);
    let json = await res.data;
    if (json && json.status === "200") {
      return json;
    }
    return null;
  } catch (error) {
    console.log("error", error);
  }
};

export const GetByIdServie = async (service_id) => {
  try {
    const body = {service_id}
    let res = await axios.post(serviceService.GETBYID_SERVICE_URL,body);
    let json = await res.data;
    if (json && json.status === "200") {
      return json.data;
    }
    return null
  } catch (error) {
    console.log("error", error);
  }
};

export const GetListService = async () => {
  try {
    let res = await axios.post(serviceService.GET_SERVICE_LIST_URL);
    let json = await res.data;
    if (json && json.status === "200") {
      return json.data;
    }
    return null
  } catch (error) {
    console.log("error", error);
  }
};


export const InsertService = async (formData) => {
  try {
    const body = { ...formData };
    let res = await axios.post(serviceService.INSERT_SERVICE_URL, body);
    let json = await res.data;
    return json;
  } catch (error) {
    console.log("error", error);
  }
};


export const UpdateService = async (formData) => {
  try {
    const body = { ...formData };
    let res = await axios.post(serviceService.UPDATE_SERVICE_URL, body);
    let json = await res.data;
    return json;
  } catch (error) {
    console.log("error", error);
  }
};

export const DeleteService = async (service_id) => {
  try {
    const body = { service_id };
    let res = await axios.post(serviceService.DELETE_SERVICE_URL, body);
    let json = await res.data;
    return json;
  } catch (error) {
    console.log("error", error);
  }
};

