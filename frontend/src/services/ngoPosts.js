import axios from "axios";

export const getPosts = (limit, offset) => {
  const BASE_URL =
    "https://h9l954ylcb.execute-api.ap-south-1.amazonaws.com/development";
  const tokenn = localStorage.getItem("token");
  return axios({
    method: "get",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${tokenn ? JSON.parse(tokenn) : ""}`,
    },

    url: `${BASE_URL}/api/v1/ngoActivity/all-posts?limit=${limit}&offset=${offset}`,
  });
};

export const generatePresignedUrl = async (data) => {
  try {
    console.log(data);
    const BASE_URL =
      "https://h9l954ylcb.execute-api.ap-south-1.amazonaws.com/development";
    const tokenn = localStorage.getItem("token");
    return axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${tokenn ? JSON.parse(tokenn) : ""}`,
      },

      url: `${BASE_URL}/api/v1/user/pre-signed-url`,
      data,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to generate presigned URL");
  }
};

// const uploadResponse = await fetch(url, {
//   method: 'PUT',
//   headers: {
//     'Content-Type': fileType,
//   },
//   body: file,
// });

export const createPost = async (data) => {
  // try {
  console.log(data);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const tokenn = localStorage.getItem("token");
  return axios({
    method: "post",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${tokenn ? JSON.parse(tokenn) : ""}`,
    },

    url: `${BASE_URL}/api/v1/employee/ngo-activity-post/create`,
    data,
  });
};
