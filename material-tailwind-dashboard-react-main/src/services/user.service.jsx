import axios from "@/common/axios";
import { userService } from "@/helpers/contents";

export const GetUserService = async (page, pageSize, search) => {
  try {
    const body = { page, pageSize, search };
    let res = await axios.post(userService.GET_USER_URL, body);
    let json = await res.data;
    if (json && json.status === "200") {
      return json;
    }
    return null;
  } catch (error) {
    console.log("error", error);
  }
};


export const InsertUserService = async (formData) => {
  try {
    const body = { ...formData };
    let res = await axios.post(userService.INSERT_USER_URL, body);
    let json = await res.data;
    return json;
  } catch (error) {
    console.log("error", error);
  }
};


export const UpdateUserService = async (formData) => {
  try {
    const body = { ...formData };
    let res = await axios.post(userService.UPDATE_USER_URL, body);
    let json = await res.data;
    return json;
  } catch (error) {
    console.log("error", error);
  }
};

export const DeleteUserService = async (user_id) => {
  try {
    const body = {user_id};
    let res = await axios.post(userService.DELETE_USER_URL, body);
    let json = await res.data;
    return json;
  } catch (error) {
    console.log("error", error);
  }
};

