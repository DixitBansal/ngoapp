import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSource } from "../services/bloodSource";

function ViewEmp() {
  const [currentPage, setCurrentPage] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const limit = 10;
  const offset = (currentPage - 1) * limit;
  const [data, setData] = useState([]);

  const getBloodSource = async () => {
    const res = await getSource(limit, offset);
    console.log(res);
    if (res.data.success) {
      const sourceData = res.data.data["bloodSource"];
      setData(sourceData);
      setDisabled(false);
      console.log(sourceData);
      return sourceData;
    } else {
      return res.data.message;
    }
  };

  useEffect(() => {
    getBloodSource();
  }, [currentPage, limit, offset]);

  const navigate = useNavigate();

  const editHandles = (item) => {
    navigate("/edit-blood-source", { state: { data: item } });
  };

  return (
    <>
      <div className="container-fluid d-flex text-center position-fixed justify-content-evenly    mt-5">
        <div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              console.log(data.length);
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
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Hospital</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/Admin/Home">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">Hospital</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row m-5">
          <div className="col-sm-12">
            <div className="card card-table">
              <div className="card-body">
                <div className="table-responsive">
                  <table
                    id="table_id"
                    className="table table-hover table-center mb-0"
                  >
                    <thead>
                      <tr>
                        <th scope="col" className="pe-5">
                          Name
                        </th>
                        <th scope="col" className="pe-5">
                          Address
                        </th>
                        <th scope="col" className="pe-5">
                          ID
                        </th>
                        <th scope="col" className="pe-5">
                          State
                        </th>
                        <th scope="col" className="pe-5">
                          District
                        </th>
                        <th scope="col" className="pe-5">
                          Pincode
                        </th>
                        <th scope="col" className="pe-5">
                          Phone-No.
                        </th>
                        <th scope="col" className="pe-5">
                          Email
                        </th>
                        <th scope="col" className="pe-5">
                          License
                        </th>
                        <th scope="col" className="pe-5">
                          Blood
                        </th>
                        <th scope="col" className="pe-5">
                          type
                        </th>
                        <th scope="col" className="pe-5">
                          category
                        </th>
                        <th scope="col" className="pe-5">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* <tr>
                      <td>{data.name}</td>
                      <td>{data.address}</td>
                      <td>{data.iD}</td>
                      <td>{data.state}</td>
                      <td>{data.district}</td>
                      <td>{data.pincode}</td>
                      <td>{data.phoneNo}</td>
                      <td>{data.email}</td>
                      
                      <td>{data.location}</td>
                      <td><button onClick={editHandles}>Edit</button> <button>Delete</button></td>

                    </tr> */}

                      {data.map((item, index) => (
                        <tr key={index}>
                          <td>{item.src_name}</td>
                          <td>{item.address}</td>
                          <td>{item.src_id}</td>
                          <td>{item.state}</td>
                          <td>{item.district}</td>
                          <td>{item.pincode}</td>
                          <td>{item.src_contact}</td>
                          <td>{item.src_email}</td>
                          <td>{item.src_license}</td>
                          <td>{item.avail_bloods}</td>
                          <td>{item.src_type}</td>
                          <td>{item.category}</td>
                          <td>
                            <button onClick={editHandles}>Edit</button>{" "}
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
