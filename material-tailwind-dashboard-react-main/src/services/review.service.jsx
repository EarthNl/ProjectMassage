import axios from "@/common/axios";
import { reviewService } from "@/helpers/contents";

export const GetReviewService = async (page, pageSize, search) => {
  try {
    const body = { page, pageSize, search };
    let res = await axios.post(reviewService.GET_REVIEW_URL, body);
    let json = await res.data;
    if (json && json.status === "200") {
      return json;
    }
    return null;
  } catch (error) {
    console.log("error", error);
  }
};

export const GetByIdReviewService= async (service_id) => {
  try {
    const body = {service_id}
    let res = await axios.post(reviewService.GETBYID_REVIEW_URL,body);
    let json = await res.data;
    if (json && json.status === "200") {
      return json.data;
    }
    return null
  } catch (error) {
    console.log("error", error);
  }
};

export const GetListReviewService = async (service_id) => {
  try {
    const body = {service_id:service_id}
    let res = await axios.post(reviewService.GETLIST_REVIEW_URL,body);
    let json = await res.data;
    if (json && json.status === "200") {
      return json.data;
    }
    return null
  } catch (error) {
    console.log("error", error);
  }
};

export const InsertReviewService = async (formData) => {
  try {
    const body = { ...formData };
    let res = await axios.post(reviewService.INSERT_REVIEW_URL, body);
    let json = await res.data;
    return json;
  } catch (error) {
    console.log("error", error);
  }
};

export const DeleteReviewService = async (review_id) => {
  try {
    const body = { review_id };
    let res = await axios.post(reviewService.DELETE_REVIEW_URL, body);
    let json = await res.data;
    return json;
  } catch (error) {
    console.log("error", error);
  }
};

