import React from "react";
import { useState, useEffect } from "react";

function ViewNotification() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("notification")) || [];
    setData(result);
  }, []);

  return (
    <div class="content container-fluid">
      <div class="page-header">
        <div class="row align-items-center">
          <div class="col">
            <h3 class="page-title">Employee</h3>
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="/Admin/Home">Dashboard</a>
              </li>
              <li class="breadcrumb-item active">Post</li>
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
                      <th>Notification-Post</th>
                      
                      
                    </tr>
                  </thead>
                  <tbody>
                  

                    {data.map((item, index) => (
                      <tr key={index}>
                        <td>{item.text}</td>
                       
                      
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

export default ViewNotification;
