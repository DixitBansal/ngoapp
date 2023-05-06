import "../Css/Emp.css";
import { useState, useEffect } from "react";

function Table(props) {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            {/* <th>Address</th> */}
            <th>ID</th>
            <th>State</th>
            <th>District</th>
            <th>Pincode</th>
            {/* <th>Blood-Group</th> */}
            {/* <th>Phone-No.</th> */}
            <th>Email</th>
            <th>Location</th>
            <th><button>Edit</button>  <button>Delete</button></th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.address}</td>
              <td>{item.state}</td>
              <td>{item.district}</td>
              <td>{item.pincode}</td>
              <td>{item.PhoneNo}</td>
              <td>{item.email}</td>
              <td>{item.location}</td>
              <td>{item.edit}</td>
              {/* <td>{item.bloodGroup}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Form({ handleAdd }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");

  const [district, setDistrict] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [location, setLocation] = useState("");
  const [pincode, setPincode] = useState("");
  const [email, setEmail] = useState("");
//   const [bloodGroup, setBloodGroup] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // handleAdd({ name,address, email,district, state, pincode, bloodGroup });
    handleAdd({ name,address, email,district, state, pincode, phoneNo,location });
    setName("");
    setAddress("");
    setEmail("");
    setPhoneNo("");
    setDistrict("");
    setState("");
    setPincode("");
    // setBloodGroup("");
    setLocation("");
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h1>Add Hospital Details</h1>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name Here ..."
            required
          />
        </label>
        <br />
        <label>
        {/* Address: */}
        ID:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder="Enter ID Here ..."
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter Email here ..."
          />
        </label>
        <br />
        {/* <label>
        Phone-Number:
          <input
            type="number"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            placeholder="Enter password Here ..."
            required
          />
        </label> */}
        <br />
        <label>
        District:
          <input
            type="text"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            placeholder="Enter District Here ..."
            required
          />
        </label>
        <br />
        <label>
          State:
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="Enter State Here ..."
            required
          />
        </label>
        <br />
        <label>
          Pincode:
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Enter Pincode Here ..."
            required
          />
        </label>
        <br />
        <label>
    Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            placeholder="Enter Location Here ..."
          />
        </label>

        <button type="submit">Add</button>
      </form>
    </div>
  );
}

function Apps() {
  const [tableFormat, setTableFormat] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("allData")) || [];
    setTableFormat(data);
  }, []);

  function addData(newData) {
    const updatedData = [...tableFormat, newData];
    setTableFormat(updatedData);
    localStorage.setItem("allData", JSON.stringify(updatedData));
  }

  return (
    <div className="form1">
      <Table data={tableFormat} />
      <Form handleAdd={addData} />
    </div>
  );
}

export default Apps;
