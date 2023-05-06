import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../services/ngoPosts";

function ViewPost() {
  const [disabled, setDisabled] = useState(false);
  const [spinnerDisplay, setSpinnerDisplay] = useState("block");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10; // number of items per page
  const offset = (currentPage - 1) * limit;
  const [data, setData] = useState([]);

  const getNgoPosts = async () => {
    const result = await getPosts(limit, offset);
    console.log(result);
    if (result.data.success) {
      setData(result.data.data["ngoPosts"]);
      setDisabled(false);
      setSpinnerDisplay("none");
    } else {
      setData(result.data.message);
    }
  };

  useEffect(() => {
    getNgoPosts();
  }, [currentPage, limit, offset]);

  const navigate = useNavigate();

  const editHandle = () => {
    navigate("/addPost");
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
              <h3 class="page-title">Post</h3>
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
                        <th>Post</th>
                        <th>Photo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={index}>
                          <td>{item.content}</td>
                          <td>
                            {" "}
                            <img
                              src={item.image_url}
                              alt=""
                              srcSet=""
                              width={"350px"}
                              height={"200px"}
                            />
                          </td>
                          <td>
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

export default ViewPost;
