import axios from "axios";
export const getSource = (limit, offset) => {
  const BASE_URL =
    "https://h9l954ylcb.execute-api.ap-south-1.amazonaws.com/development";
  const tokenn = localStorage.getItem("token");
  return axios({
    method: "get",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${tokenn ? JSON.parse(tokenn) : ""}`,
    },

    url: `${BASE_URL}/api/v1/admin/blood-source/all?limit=${limit}&offset=${offset}`,
  });
};

export const addBloodSource = (data) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  // console.log("add xamp here");
  const tokenn = localStorage.getItem("token");
  return axios({
    method: "post",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${tokenn ? JSON.parse(tokenn) : ""}`,
    },

    url: `${BASE_URL}/api/v1/admin/blood-source/add`,
    data,
  });
};
