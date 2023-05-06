import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Admin from "./Components/Admin";
import Private from "./Components/Private";

import AddBloodBank from "./Components/AddBloodBank";
import ViewBloodBank from "./Components/ViewBloodBank";
// import EditBloodBank from "./Components/EditBloodBank";

import AddHospital from "./Components/AddHospital";
import ViewHospital from "./Components/ViewHospital";
import EditHospital from "./Components/EditHospital";

import AddEmp from "./Components/AddEmp";
import ViewEmp from "./Components/ViewEmp";
// import EditEmp from "./Components/EditEmp";

import BloodForm from "./Components/BloodForm";

import AddCamp from "./Components/AddCamp";
import ViewCamp from "./Components/ViewCamp";

import AddNotification from "./Components/AddNotification";
import ViewNotification from "./Components/ViewNotification";

import AddPost from "./Components/AddPost";
import ViewPost from "./Components/ViewPost";
import EditCamp from "./Components/editCamp";
import EditBloodSource from "./Components/EditBloodSource";
import AddBB from "./Components/AddBloodBank";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Private />}>
          <Route path="/admin" element={<Admin />} />

          <Route path="/addEmp" element={<AddEmp />} />
          <Route path="/viewEmp" element={<ViewEmp />} />
          {/* <Route path="/editEmp" element={<EditEmp />} /> */}

          <Route path="/addHospital" element={<AddHospital />} />
          <Route path="/viewHospital" element={<ViewHospital />} />
          <Route path="/editHospital" element={<EditHospital />} />

          <Route path="/addBloodBank" element={<AddBB />} />
          <Route path="/viewBloodBank" element={<ViewBloodBank />} />
          {/* <Route path="/editBloodBank" element={<EditBloodBank />} /> */}

          <Route path="/bloodForm" element={<BloodForm />} />

          <Route path="/addCamp" element={<AddCamp />} />
          <Route path="/edit-camp" element={<EditCamp />} />
          <Route path="/viewCamp" element={<ViewCamp />} />

          <Route path="/addNotification" element={<AddNotification />} />
          <Route path="/viewNotification" element={<ViewNotification />} />

          <Route path="/addPost" element={<AddPost />} />
          <Route path="/viewPost" element={<ViewPost />} />
          <Route path="/edit-blood-source" element={<EditBloodSource />} />
        </Route>

        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
