import axios from "axios";

export const EmployeeDetails = (limit, offset) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const tokenn = localStorage.getItem("token");
  return axios({
    method: "get",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${tokenn ? JSON.parse(tokenn) : ""}`,
    },

    url: `${BASE_URL}/api/v1/admin/employee/view-employees?limit=${limit}&offset=${offset}`,
  });
};

export const addemployee = (data) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  // console.log("add xamp here");
  const tokenn = localStorage.getItem("token");
  return axios({
    method: "post",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${tokenn ? JSON.parse(tokenn) : ""}`,
    },

    url: `${BASE_URL}/api/v1/admin/employee/add-employee`,
    data,
  });
};
