import axios from "@/common/axios";
import { bookingService } from "@/helpers/contents";

export const GetBookingService = async (page, pageSize, search) => {
  try {
    const body = { page, pageSize, search };
    let res = await axios.post(bookingService.GET_BOOKING_URL, body);
    let json = await res.data;
    if (json && json.status === "200") {
      return json;
    }
    return null;
  } catch (error) {
    console.log("error", error);
  }
};

export const GetByIdBookingServie = async (service_id) => {
  try {
    const body = {service_id}
    let res = await axios.post(bookingService.GETBYID_BOOKING_URL,body);
    let json = await res.data;
    if (json && json.status === "200") {
      return json.data;
    }
    return null
  } catch (error) {
    console.log("error", error);
  }
};

export const GetListBookingService = async () => {
  try {
    let res = await axios.post(bookingService.GETLIST_BOOKING_URL);
    let json = await res.data;
    if (json && json.status === "200") {
      return json.data;
    }
    return null
  } catch (error) {
    console.log("error", error);
  }
};


export const InsertBookingService = async (formData) => {
  try {
    const body = { ...formData };
    let res = await axios.post(bookingService.INSERT_BOOKING_URL, body);
    let json = await res.data;
    return json;
  } catch (error) {
    console.log("error", error);
  }
};


export const UpdateBookingService = async (formData) => {
  try {
    const body = { ...formData };
    let res = await axios.post(bookingService.UPDATE_BOOKING_URL, body);
    let json = await res.data;
    return json;
  } catch (error) {
    console.log("error", error);
  }
};

export const DeleteBookingService = async (booking_id) => {
  try {
    const body = { booking_id };
    let res = await axios.post(bookingService.DELETE_BOOKING_URL, body);
    let json = await res.data;
    return json;
  } catch (error) {
    console.log("error", error);
  }
};

