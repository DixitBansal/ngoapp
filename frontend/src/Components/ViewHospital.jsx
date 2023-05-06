import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ViewEmp() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("Hospital")) || [];
    setData(result);
    
  }, []);

 const navigate = useNavigate()

 const editHandle = () =>{
  navigate("/addBloodBank");
 }

  return (
    <div class="content container-fluid">
      <div class="page-header">
        <div class="row align-items-center">
          <div class="col">
            <h3 class="page-title">Hospital</h3>
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="/Admin/Home">Dashboard</a>
              </li>
              <li class="breadcrumb-item active">Hospital</li>
            </ul>
          </div>
          
        </div>
      </div>
      <div class="row m-5">
        <div class="col-sm-12">
          <div class="card card-table">
            <div class="card-body">
              <div class="table-responsive">
                <table
                  id="table_id"
                  class="table table-hover table-center mb-0"
                >
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Address</th>
                      {/* <th>ID</th> */}
                      <th>State</th>
                      <th>District</th>
                      <th>Pincode</th>
                      <th>Phone-No.</th>
                      <th>Email</th>
                      <th>Location</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                 

                    {data.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.address}</td>
                        {/* <td>{item.iD}</td> */}
                        <td>{item.state}</td>
                        <td>{item.district}</td>
                        <td>{item.pincode}</td>
                        <td>{item.phoneNo}</td>
                        <td>{item.email}</td>
                        <td>{item.location}</td>
                        <td><button onClick={editHandle}>Edit</button> <button>Delete</button></td>
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
  );
}

export default ViewEmp;
