import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addCamp, editCamp } from "../services/bloodCamp";
import { getStates } from "../services/utils";

function AddCamp() {
  const navigate = useNavigate();
  const location = useLocation();
  const receivedData = location.state?.data;
  const { camp_id } = receivedData ?? "";
  const [name, setName] = useState(
    receivedData ? receivedData.camp_name ?? "" : ""
  );
  const [date, setDate] = useState(
    receivedData ? receivedData.date.slice(10) ?? "" : ""
  );
  const [address, setAddress] = useState(
    receivedData ? receivedData.camp_address ?? "" : ""
  );
  const [district, setDistrict] = useState(
    receivedData ? receivedData.camp_district ?? "" : ""
  );
  const [city, setCity] = useState("");
  const [state, setState] = useState(
    receivedData ? receivedData.camp_state ?? "" : ""
  );
  const [conducted, setConducted] = useState(
    receivedData ? receivedData.conducted_by ?? "" : ""
  );
  const [organized, setOrganized] = useState(
    receivedData ? receivedData.organized_by ?? "" : ""
  );
  const [time, setTime] = useState(receivedData ? receivedData.time ?? "" : "");
  const [contact, setContact] = useState(
    receivedData ? receivedData.contact ?? "" : ""
  );

  const [disabled, setDisabled] = useState(false);

  console.log("received data=", receivedData);

  const handleSubmit = async (e) => {
    const data = {
      camp_id,
      camp_name: name,
      date: date,
      camp_address: address,
      camp_district: district,
      contact,
      camp_state: state,
      conducted_by: conducted,
      organized_by: organized,
      time,
    };
    const confirm = window.confirm("Are you sure?");
    if (confirm) {
      const res = await (location.pathname === "/edit-camp"
        ? editCamp(data)
        : addCamp(data));
      console.log(">>>>>>>>>>>>>>>>>>>>>>res", res);
      if (res.data.success) {
        alert(res.data.message);
        navigate("/viewcamp");
      } else {
        console.log(res);
        alert(res.data.message ?? "Something went wrong.");
      }
    }
  };
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

  const getState = async () => {
    const res = await getStates();
    if (res.data.success) {
      return res.data.data.states;
    } else {
      return res.data.data.msg;
    }
  };
  const states = getState();
  console.log("states=", states);

  const handleChange = (event) => {
    setDate(event.target.value);
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
                    <span>
                      {location.pathname == "/edit-camp"
                        ? "Edit Blood-Camp Details"
                        : "Add Blood-camp Dtails"}{" "}
                    </span>
                  </h5>
                </div>

                <div className="form-group">
                  <label>Camp-Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter camp Here ..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Date-Created</label>
                  <input
                    type="date"
                    className="form-control"
                    value={date}
                    onChange={handleChange}
                    placeholder="Enter Date Here ..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Address </label>
                  <input
                    type="text"
                    className="form-control"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter Name Here ..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone:</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-control"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Enter Contact details"
                    required
                  />
                </div>

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

                <div className="form-group">
                  <label>Conducted-By</label>
                  <input
                    type="text"
                    className="form-control"
                    value={conducted}
                    onChange={(e) => setConducted(e.target.value)}
                    placeholder="Enter Name Here ..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Organized-By</label>
                  <input
                    type="text"
                    className="form-control"
                    value={organized}
                    onChange={(e) => setOrganized(e.target.value)}
                    placeholder="Enter Name Here ..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    className="form-control"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="Enter Time Here ..."
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

export default AddCamp;
