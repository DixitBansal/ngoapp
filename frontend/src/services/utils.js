import axios from "axios";

const BASE_URL =
  "https://h9l954ylcb.execute-api.ap-south-1.amazonaws.com/development";

export const getStates = () => {
  const tokenn = localStorage.getItem("token");
  return axios({
    method: "get",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${tokenn ? JSON.parse(tokenn) : ""}`,
    },

    url: `${BASE_URL}/api/v1/admin/states/all`,
  });
};
