import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
 import App from "./App";
// import EditHospital from "./Components/EditHospital";
// import BloodForm from "./Components/BloodForm";
import reportWebVitals from "./reportWebVitals";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
 {/* <BloodForm/> */}
    <App />
    {/* <EditHospital/> */}
  </React.StrictMode>
);


reportWebVitals();
