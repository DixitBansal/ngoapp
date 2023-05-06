import axios from "axios";
const BASE_URL = process.env.BASE_URL;
export const login = (data) => {
  return axios.post(`${BASE_URL}/api/v1/auth/login`, data);
};
