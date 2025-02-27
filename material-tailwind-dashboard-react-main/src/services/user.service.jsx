import axios from "@/common/axios";
import { userService } from "@/helpers/contents";
import Swal from "sweetalert2";

export const UserLoginService = async (formData) => {
  try {
    const body = {
      user_email: formData.user_email,
      user_pass: formData.user_pass,
    };
    let res = await axios.post(userService.LOGIN_URL, body);
    let json = await res.data;
    return json;
  } catch (error) {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "NetWorkError!",
      showConfirmButton: false,
      showCloseButton: false,
    });
  }
};

export const UserAuthService = async (user_name,user_role) => {
  try {
    const body = {user_name,user_role};
    let res = await axios.post(userService.AUTHEN_URL, body);
    let json = await res.data;
    return json;
  } catch (error) {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "NetWorkError!",
      showConfirmButton: false,
      showCloseButton: false,
    });
  }
};

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
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "NetWorkError!",
      showConfirmButton: false,
      showCloseButton: false,
    });
  }
};

export const InsertUserService = async (formData) => {
  try {
    const body = { ...formData };
    let res = await axios.post(userService.INSERT_USER_URL, body);
    let json = await res.data;
    return json;
  } catch (error) {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "NetWorkError!",
      showConfirmButton: false,
      showCloseButton: false,
    });
  }
};

export const UpdateUserService = async (formData) => {
  try {
    const body = { ...formData };
    let res = await axios.post(userService.UPDATE_USER_URL, body);
    let json = await res.data;
    return json;
  } catch (error) {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "NetWorkError!",
      showConfirmButton: false,
      showCloseButton: false,
    });
  }
};

export const DeleteUserService = async (user_id) => {
  try {
    const body = { user_id };
    let res = await axios.post(userService.DELETE_USER_URL, body);
    let json = await res.data;
    return json;
  } catch (error) {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "NetWorkError!",
      showConfirmButton: false,
      showCloseButton: false,
    });
  }
};
