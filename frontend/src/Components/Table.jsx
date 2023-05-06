import React from "react";
import "./Newapp.css";
import { useState, useEffect } from "react";
function Table() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("mydata")) || [];
    setData(result);
  }, []);

  return (
    <>
      <div className="kuldeep">
        <div class="app-wrapper">
          <div class="app-content pt-3 p-md-3 p-lg-4">
            <div
              class="col-12 col-lg-6"
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <div class="app-card app-card-stats-table h-100 shadow-sm">
                <div class="app-card-header p-3">
                  <div
                    class="row justify-content-between align-items-center"
                    style={{ width: "100%" }}
                  >
                    <div class="col-auto">
                      <h4 class="app-card-title">Employee List</h4>
                    </div>
                    <div class="col-auto">
                      <div class="card-header-action">
                        <a href="#">View report</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="app-card-body p-3 p-lg-4">
                  <div class="table-responsive">
                    <table class="table table-borderless mb-0">
                      <thead>
                        <tr>
                          <th class="meta">Name</th>
                          <th class="meta stat-cell">City</th>
                          <th class="meta stat-cell">State</th>
                        </tr>
                      </thead>
                      <tbody>
                        
                        {/* <tr>
                        <td>{data.name}</td>
                        <td>{data.city}</td>
                        <td>{data.state}</td>
                        </tr> */}

                 {data.map((item,index)=>(

                 


                        <tr>
                        <td><a href="#"> {item.name}</a></td>
                        <td class="stat-cell">{item.city}</td>
                        <td class="stat-cell">
                          {item.state}
                        </td>
                      </tr>
))}
                      {/* <tr>
                        <td><a href="#"> Kuldeep </a></td>
                        <td class="stat-cell">2</td>
                        <td class="stat-cell">23%</td>
                      </tr>
                      <tr>
                        <td><a href="#">Mohit  </a></td>
                        <td class="stat-cell">3</td>
                        <td class="stat-cell">
                          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-down text-danger" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
                          </svg>
                          20%
                        </td>
                      </tr> */}

                        {/* <tr>
                        <td><a href="#">Pranjal Sharma</a></td>
                        <td class="stat-cell">4</td>
                        <td class="stat-cell">-</td>
                      </tr> */}
                        {/* <tr>
                        <td><a href="#">Aman Sharma</a></td>
                        <td class="stat-cell">5</td>
                        <td class="stat-cell">15%</td>
                      </tr> */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div class="app-card app-card-stats-table h-100 shadow-sm">
                <div class="app-card-header p-3">
                  <div class="row justify-content-between align-items-center">
                    <div class="col-auto">
                      <h4 class="app-card-title">Hospital List</h4>
                    </div>
                    <div class="col-auto">
                      <div class="card-header-action">
                        <a href="#">View report</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="app-card-body p-3 p-lg-4">
                  <div class="table-responsive">
                    <table class="table table-borderless mb-0">
                      <thead>
                        <tr>
                          <th class="meta">Name</th>
                          <th class="meta stat-cell">Hospital Id</th>
                          <th class="meta stat-cell">Today Work Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <a href="#">SMS Hospital</a>
                          </td>
                          <td class="stat-cell">1</td>
                          <td class="stat-cell">
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              class="bi bi-arrow-up text-success"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
                              />
                            </svg>
                            30%
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="#"> Bhandari Hospital</a>
                          </td>
                          <td class="stat-cell">4</td>
                          <td class="stat-cell">-</td>
                        </tr>
                        {/* <tr>
                        <td><a href="#">Akshay Sharma</a></td>
                        <td class="stat-cell">2</td>
                        <td class="stat-cell">23%</td>
                      </tr> */}
                        <tr>
                          <td>
                            <a href="#">Soni Hospital</a>
                          </td>
                          <td class="stat-cell">3</td>
                          <td class="stat-cell">
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              class="bi bi-arrow-down text-danger"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
                              />
                            </svg>
                            20%
                          </td>
                        </tr>

                        {/* <tr>
                        <td><a href="#">Aman Sharma</a></td>
                        <td class="stat-cell">5</td>
                        <td class="stat-cell">15%</td>
                      </tr> */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
