import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { campDetails } from "../services/bloodCamp";

function ViewCamp() {
  const [spinnerDisplay, setSpinnerDisplay] = useState("block");
  const [currentPage, setCurrentPage] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const limit = 10; // number of items per page
  const offset = (currentPage - 1) * limit;
  const [data, setData] = useState([]);
  const getCamps = async () => {
    const res = await campDetails(limit, offset);
    if (res.data.success) {
      const campData = res.data.data["bloodCamp"];
      setData(campData);
      setSpinnerDisplay("none");
      setDisabled(false);
      console.log(campData);
      return campData;
    } else {
      return res.data.message;
    }
  };

  useEffect(() => {
    getCamps();

    // setData(result);
  }, [currentPage, limit, offset]);

  const navigate = useNavigate();

  const editHandle = (item) => {
    navigate("/edit-camp", { state: { data: item } });
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
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Employee</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/Admin/Home">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">camp</li>
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
                    className="table table-hover table-center mb-0 caption-top"
                  >
                    <caption>List of Blood Camps</caption>

                    <thead>
                      <div class="d-flex justify-content-center">
                        <div
                          class="spinner-border"
                          role="status"
                          style={{ display: spinnerDisplay }}
                        >
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      </div>

                      <tr>
                        <th scope="col" className="pe-5">
                          #
                        </th>
                        <th scope="col" className="pe-5">
                          camp_name
                        </th>
                        <th scope="col" className="pe-5">
                          Date
                        </th>
                        <th scope="col" className="pe-5">
                          camp_address
                        </th>
                        <th scope="col" className="pe-5">
                          contact
                        </th>
                        <th scope="col" className="pe-5">
                          District
                        </th>
                        <th scope="col" className="pe-5">
                          State
                        </th>
                        <th scope="col" className="pe-5">
                          duration
                        </th>
                        <th scope="col" className="pe-5">
                          pincode
                        </th>
                        <th scope="col" className="pe-5">
                          Conducted-By
                        </th>
                        <th scope="col" className="pe-5">
                          Organised-By
                        </th>
                        <th scope="col" className="pe-5">
                          Time
                        </th>
                        <th scope="col" className="pe-5">
                          created_at
                        </th>
                        <th scope="col" className="pe-5">
                          updated_at
                        </th>
                        <th scope="col" className="pe-5">
                          action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={index}>
                          <th scope="row">{offset + 1 + index}</th>
                          <td>{item.camp_name}</td>
                          <td>{item.date.slice(0, 10)}</td>
                          <td>{item.camp_address}</td>
                          <td>{item.contact}</td>
                          <td>{item.camp_district}</td>

                          <td>{item.camp_state}</td>
                          <td>{item.duration}</td>
                          <td>{item.pincode}</td>
                          <td>{item.conducted_by}</td>
                          <td>{item.organized_by}</td>
                          <td>{item.time}</td>
                          <td>{item.created_at}</td>
                          <td>{item.updated_at}</td>
                          <td>
                            <button onClick={() => editHandle(item)}>
                              Edit
                            </button>{" "}
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
      {/* <Pagination currentPage={1} totalPages={10} /> */}
    </>
  );
}

export default ViewCamp;
