import axios from "axios";

export const addCamp = (data) => {
  const BASE_URL =
    "https://h9l954ylcb.execute-api.ap-south-1.amazonaws.com/development";
  console.log("add xamp here");
  const tokenn = localStorage.getItem("token");
  return axios({
    method: "post",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${tokenn ? JSON.parse(tokenn) : ""}`,
    },

    url: `${BASE_URL}/api/v1/admin/blood-donation-camp/add-blood-camp`,
    data,
  });
};

export const campDetails = (limit, offset) => {
  const BASE_URL =
    "https://h9l954ylcb.execute-api.ap-south-1.amazonaws.com/development";
  const tokenn = localStorage.getItem("token");
  return axios({
    method: "get",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${tokenn ? JSON.parse(tokenn) : ""}`,
    },

    url: `${BASE_URL}/api/v1/admin/blood-donation-camp/viewallcamps?limit=${limit}&offset=${offset}`,
  });
};

export const editCamp = (data) => {
  console.log("edit xamp here");
  let response = {};
  return (response = {
    success: false,
    message: "backend not done for this api",
  });
};
