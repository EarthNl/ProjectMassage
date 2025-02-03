import axios from "axios";
import { getStorage } from "../helpers/contents";
export const apiLocal = 'http://localhost:49234/travelkan/api/'

export default axios.create({
  baseURL: apiLocal,
  //baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Authorization": ``,
  }
});