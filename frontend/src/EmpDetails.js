import "../Css/Emp.css";
import { useState, useEffect } from "react";

function Table(e) {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Password</th>
            <th>City</th>
            <th>State</th>
            <th>Pincode</th>
            <th>Blood-Group</th>
          </tr>
        </thead>
        <tbody>
          {e.data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.email}</td>
              <td>{item.password}</td>
              <td>{item.city}</td>
              <td>{item.state}</td>
              <td>{item.pincode}</td>
              <td>{item.bloodGroup}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Form({ handleAdd }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const[state,setState] = useState("")
  const[pincode,setPincode] = useState("")
  const[bloodGroup,setBloodGroup] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAdd({ name, age, email, password ,city,state,pincode,bloodGroup});
    setName("");
    setAge("");
    setEmail("");
    setPassword("");
    setCity("");
    setState("");
    setPincode("");
    setBloodGroup("");
  };

  return (
    <div className="form" >
      <form onSubmit={handleSubmit}>
        <h1>Add Employee Details</h1>
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
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            placeholder="Enter Age Here ..."
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
            placeholder="Enter email here ..."
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password Here ..."
            required
          />
        </label>
        <br />
        <label>
          city:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter Name Here ..."
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
            placeholder="Enter Name Here ..."
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
            placeholder="Enter Name Here ..."
            required
          />
        </label>
        <br />
        <label>
          Blood-Group:
          <input
            type="text"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            required
            placeholder="Enter Age Here ..."
          />
        </label>

        <button type="submit">Add</button>
      </form>
    </div>
  );
}

function App() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("myData")) || [];
    setTableData(data);
  }, []);

  function addData(newData) {
    const updatedData = [...tableData, newData];
    setTableData(updatedData);
    localStorage.setItem("myData", JSON.stringify(updatedData));
  }

  return (
    <div className="form1">
      <Table data={tableData} />
      <Form handleAdd={addData} />
    </div>
  );
}

export default App;
