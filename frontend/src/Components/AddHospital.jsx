import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddEmp() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [id, setId] = useState("");
  const [state, setState] = useState("");

  const [district, setDistrict] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [location, setLocation] = useState("");
  const [pincode, setPincode] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    const data = {
      name,
      address,
      id,
      email,
      district,
      state,
      pincode,
      phoneNo,
      location,
    };

    const Add = JSON.parse(localStorage.getItem("Hospital")) || [];

    localStorage.setItem("Hospital", JSON.stringify([...Add,data]));
    
    // navigate("/ViewHospital");
    navigate("/viewHospital");
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="row m-5">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <div className="col-12">
                  <h5 className="form-title">
                    <span>Add Hospital Details </span>
                  </h5>
                </div>

                <div className="form-group">
                  <label>Hospital-Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Hospital-Name Here ..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Hospital-Address</label>
                  <input
                    type="text"
                    className="form-control"
                    value={address}
            onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter Hospital-Address Here ..."
                    required
                  />
                </div>



                
                <div className="form-group">
                  <label>Hospital-ID </label>
                  <input
                    type="text"
                    className="form-control"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="Enter Hospital-ID Here ..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Hospital-Email </label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Hospital-Email Here ..."
                    required
                  />
                </div>

                

                <div className="form-group">
                  <label>District</label>
                  <input
                    type="text"
                    
                    className="form-control"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="Enter District Here ..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Hospital-Phone_No</label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    placeholder="Enter Hospital-Phone_No Here ..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    className="form-control"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="Enter State Here ..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Pincode</label>
                  <input
                    type="number"
                    className="form-control"
                    maxLength="6"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter Pincode Here ..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    className="form-control"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter Location Here ..."
                    required
                  />
                </div>
              </div>

              <div className="col-12">
                <input type="submit" className="form-control" />
              </div>
              <br />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddEmp;
