import axios from "axios";
export const apiLocal = 'http://localhost:49231/project-massage/api/'

export default axios.create({
  baseURL: apiLocal,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Authorization": ``,
  }
});