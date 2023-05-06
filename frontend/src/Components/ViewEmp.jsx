import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeDetails } from "../services/employee";
import image from "../download.png";
function ViewEmp() {
  const [spinnerDisplay, setSpinnerDisplay] = useState("block");
  const [currentPage, setCurrentPage] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const limit = 10; // number of items per page
  const offset = (currentPage - 1) * limit;
  const [data, setData] = useState([]);

  const getemps = async () => {
    const res = await EmployeeDetails(limit, offset);
    console.log(res);
    if (res.data.success) {
      const Employees = res.data.data["employeeList"];
      setData(Employees);
      setSpinnerDisplay("none");
      setDisabled(false);
      console.log(Employees);
    } else {
      return res.data.message;
    }
  };
  useEffect(() => {
    getemps();
  }, [currentPage, limit, offset]);

  const navigate = useNavigate();

  const editHandle = () => {
    navigate("/addEmp");
  };

  return (
    <>
      <div className="container-fluid d-flex text-center position-fixed justify-content-evenly    mt-5">
        <div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              currentPage > 1
                ? setCurrentPage(currentPage - 1)
                : setCurrentPage(1);
            }}
          >
            Previous
          </button>
        </div>
        <div>
          {disabled ? (
            <button type="button" className="btn btn-secondary" disabled>
              {data.length < limit ? "end" : "loading"}
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-secondary"
              disabled={disabled}
              onClick={() => {
                // data.length < limit ? setDisabled(true) : setDisabled(false);
                setDisabled(true);
                console.log(data.length);
                data.length >= limit
                  ? setCurrentPage(currentPage + 1)
                  : setCurrentPage(currentPage);
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>

      <div class="content container-fluid">
        <div class="page-header">
          <div class="row align-items-center">
            <div class="col">
              <h3 class="page-title">Employee</h3>
              <ul class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="/Admin/Home">Dashboard</a>
                </li>
                <li class="breadcrumb-item active">Employee</li>
              </ul>
            </div>
            {/* <div class="col-auto text-right float-right ml-auto">
            <a href="#" class="btn btn-outline-primary mr-2">
              <i class="fas fa-download"></i> Download
            </a>
            <a href="/Admin/Farmer/Add" class="btn btn-primary">
              Add <i class="fas fa-plus"></i>
            </a>
          </div> */}
          </div>
        </div>
        <div class="row m-5">
          <div class="col-sm-12">
            <div class="card card-table">
              <div
                class="spinner-border m-2"
                style={{ display: spinnerDisplay }}
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table
                    id="table_id"
                    class="table table-hover table-center mb-0"
                  >
                    <thead>
                      <tr>
                        <th className="">profile Image</th>
                        <th>Name</th>
                        <th>phone</th>
                        {/* <th>Age</th> */}
                        <th>Email</th>
                        <th>district</th>
                        {/* <th>Password</th> */}
                        <th>address</th>
                        {/* <th>City</th> */}
                        <th>State</th>
                        <th>blood-group</th>
                        {/* <th>Pincode</th> */}
                        <th>volunteer</th>
                        <th>is_active</th>

                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={index}>
                          <td scope="col" className="pe-5">
                            <img
                              src={
                                item.profile_image ? item.profile_image : image
                              }
                              style={{ borderRadius: "50%" }}
                              width={"150px"}
                              height={"150px"}
                              alt="profile"
                            />
                          </td>
                          <td scope="col" className="">
                            {item.username}
                          </td>
                          <td scope="col" className="pe-5">
                            {item.phone}
                          </td>
                          <td scope="col" className="pe-5">
                            {item.email}
                          </td>
                          <td scope="col" className="pe-5">
                            {item.district}
                          </td>
                          <td scope="col" className="pe-5">
                            {item.address}
                          </td>
                          <td scope="col" className="pe-5">
                            {item.state}
                          </td>
                          {/* <td>{item.pincode}</td> */}
                          <td scope="col" className="pe-5">
                            {item.blood_group}
                          </td>
                          <td scope="col" className="pe-5">
                            {item.is_volunteer}
                          </td>
                          <td scope="col" className="pe-5">
                            {item.is_active.toString()}
                          </td>
                          <td scope="col" className="pe-5">
                            <button onClick={editHandle}>Edit</button>{" "}
                            <button>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewEmp;
