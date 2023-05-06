import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addBloodSource } from "../services/bloodSource";

function AddBB() {
  const location = useLocation();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [id, setId] = useState("");
  const [state, setState] = useState("");

  const [district, setDistrict] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const [pincode, setPincode] = useState("");
  const [email, setEmail] = useState("");
  const [select, setSelect] = useState("Blood-Bank");
  const [isactive, setIsActive] = useState(true);
  const [checkboxes, setCheckboxes] = useState({
    "A+": false,
    "B+": false,
    "AB+": false,
    "O+": false,
    "A-": false,
    "B-": false,
    "AB-": false,
    "O-": false,
  });

  //33 district in array format
  //const rajasthanDistricts = ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"];
  const details = ["Blood-Bank", "Hospital"];
  const rajasthanDistricts = [
    "Ajmer",
    "Alwar",
    "Banswara",
    "Baran",
    "Barmer",
    "Bharatpur",
    "Bhilwara",
    "Bikaner",
    "Bundi",
    "Chittorgarh",
    "Churu",
    "Dausa",
    "Dholpur",
    "Dungarpur",
    "Ganganagar",
    "Hanumangarh",
    "Jaipur",
    "Jaisalmer",
    "Jalore",
    "Jhalawar",
    "Jhunjhunu",
    "Jodhpur",
    "Karauli",
    "Kota",
    "Nagaur",
    "Pali",
    "Pratapgarh",
    "Rajsamand",
    "Sawai Madhopur",
    "Sikar",
    "Sirohi",
    "Tonk",
    "Udaipur",
    "Amer",
    "Bagru",
    "Bali",
    "Bandikui",
    "Bansur",
    "Behror",
    "Chomu",
    "Chirawa",
    "Falna",
    "Fatehpur",
    "Hindaun",
    "Kishangarh",
    "Kuchaman City",
    "Mahwa",
    "Mandalgarh",
    "Mandawa",
    "Merta City",
    "Nadbai",
    "Nawalgarh",
    "Neem-Ka-Thana",
    "Nokha",
    "Pilani",
    "Pilibanga",
    "Raisinghnagar",
    "Rajgarh (Alwar)",
    "Rajgarh (Churu)",
    "Rajnagar",
    "Ramganj Mandi",
    "Ramngarh",
    "Rawatbhata",
    "Sadri",
    "Sambhar",
    "Sardarshahar",
    "Sawai Madhopur",
    "Shahpura",
    "Shahpura",
    "Sheoganj",
    "Sikar",
    "Sujangarh",
    "Suratgarh",
    "Taranagar",
    "Todabhim",
    "Todaraisingh",
  ];

  const allState = ["Rajasthan"];

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const avail_bloods = [];
    for (let key in checkboxes) {
      if (checkboxes[key]) {
        avail_bloods.push(key);
      }
    }
    const data = {
      src_name: name,
      address,
      src_license: id,
      src_email: email,
      district,
      state,
      pincode,
      src_contact: phoneNo,
      category,

      src_type: select,
      avail_bloods,
      is_active: isactive,
    };

    console.log(data);

    const result = await addBloodSource(data);
    console.log(result);
    if (result.data.success) {
      alert(result.data.msg);
    } else {
      console.log(result);
    }

    // const Add = JSON.parse(localStorage.getItem("BloodBank")) || [];

    // localStorage.setItem("BloodBank", JSON.stringify([...Add, data]));
    // navigate("/viewBloodBank");
  };
  const handleCheckboxChange = (event) => {
    // console.log(event.target);
    const { name, checked } = event.target;
    console.log(name, checked);
    setCheckboxes((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const confirm = window.confirm("Are you sure?");
          if (confirm) {
            handleSubmit();
          }
        }}
      >
        <div className="row m-5">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <div className="col-12">
                  <h5 className="form-title">
                    <span>
                      {location.pathname === "/edit-blood-source"
                        ? "Edit Blood Source"
                        : "Add Blood Source"}{" "}
                    </span>
                  </h5>

                  <div className="form-group">
                    <label htmlFor="source" className="d-inline me-3">
                      Select source
                    </label>
                    <select
                      id="source"
                      name="source"
                      value={select}
                      onChange={(e) => {
                        setSelect(e.target.value);
                        console.log(select);
                      }}
                    >
                      {/* <option value=""> </option> */}
                      {details.map((bb) => (
                        <option key={bb} value={bb}>
                          {bb}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group mt-3">
                  <label className="d-inline me-3">Active</label>
                  <input
                    className="form-check-input mt-1"
                    type="checkbox"
                    value={isactive}
                    aria-label="Checkbox for following text input"
                    onChange={(e) => {
                      setIsActive(!isactive);
                      console.log(isactive);
                    }}
                  />
                </div>

                <div className="form-group">
                  <label>Name</label>
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
                  <label>category</label>
                  <input
                    type="text"
                    className="form-control"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Private / Government"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Address</label>
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
                  <label>Licence-No. </label>
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
                  <label>Email </label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Hospital-Email Here ..."
                    required
                  />
                </div>

                {/* <div className="form-group">
                  <label>District</label>
                  <input
                    type="text"
                   
                    className="form-control"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="Enter District Here ..."
                    required
                  />
                </div> */}

                <div className="form-group">
                  <label htmlFor="district">Select a district:</label>
                  <select
                    id="district"
                    name="district"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                  >
                    <option value="">Select District</option>
                    {rajasthanDistricts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>

                {/* <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    className="form-control"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="Enter State Here ..."
                    required
                  />
                </div> */}

                <div className="form-group">
                  <label htmlFor="district">Select State:</label>
                  <select
                    id="district"
                    name="district"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value="">Select State</option>
                    {allState.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                <h1 className="h1">Add Blood Group</h1>
                {/* select blood group */}

                <div className="for">
                  <div className="opt1">
                    <div className="row1">
                      <label>
                        <input
                          className="inp1 inputinput"
                          type="checkbox"
                          name="A-"
                          checked={checkboxes["A-"]}
                          onChange={handleCheckboxChange}
                          // onChange={(e) => console.log(e.target)}
                        />
                        <h1>B-</h1>
                      </label>
                    </div>
                    <br />
                    <div className="row1">
                      <label>
                        <input
                          className="inp2 inputinput"
                          type="checkbox"
                          name="B-"
                          checked={checkboxes["B-"]}
                          onChange={handleCheckboxChange}
                        />
                        <h1>A-</h1>
                      </label>
                    </div>
                    <br />
                    <div className="row1">
                      <label>
                        <input
                          className="inp3 inputinput"
                          type="checkbox"
                          name="AB-"
                          checked={checkboxes["AB-"]}
                          onChange={handleCheckboxChange}
                        />
                        <h1>AB-</h1>
                      </label>
                    </div>
                    <div className="row1">
                      <label>
                        <input
                          className="inp7 inputinput"
                          type="checkbox"
                          name="O-"
                          checked={checkboxes["O-"]}
                          onChange={handleCheckboxChange}
                        />
                        <h1>O-</h1>
                      </label>
                    </div>
                  </div>
                  <br />
                  <div className="opt1">
                    <div className="row1">
                      <label>
                        <input
                          className="inp4 inputinput"
                          type="checkbox"
                          name="A+"
                          checked={checkboxes["A+"]}
                          onChange={handleCheckboxChange}
                        />
                        <h1>A+</h1>
                      </label>
                    </div>
                    <br />
                    <div className="row1">
                      <label>
                        <input
                          className="inp5 inputinput"
                          type="checkbox"
                          name="B+"
                          checked={checkboxes["B+"]}
                          onChange={handleCheckboxChange}
                        />
                        <h1>B+</h1>
                      </label>
                    </div>
                    <br />
                    <div className="row1">
                      <label>
                        <input
                          className="inp6 inputinput"
                          type="checkbox"
                          name="AB+"
                          checked={checkboxes["AB+"]}
                          onChange={handleCheckboxChange}
                        />
                        <h1>AB+</h1>
                      </label>
                    </div>
                    <div className="row1">
                      <label>
                        <input
                          className="inp8 inputinput"
                          type="checkbox"
                          name="O+"
                          checked={checkboxes["O+"]}
                          onChange={handleCheckboxChange}
                        />
                        <h1>O+</h1>
                      </label>
                    </div>
                  </div>
                </div>
                {/* <div className="btn"> */}

                {/* <button onClick={submitHandle}> Submit </button> */}
                {/* </div> */}
                {/* </form> */}

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
                  <label>Phone_No</label>
                  <input
                    type="number"
                    className="form-control"
                    name="city"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    placeholder="Enter Hospital-Phone_No Here ..."
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

export default AddBB;
