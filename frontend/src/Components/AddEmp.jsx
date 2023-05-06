import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generatePresignedUrl } from "../services/ngoPosts";
import { addemployee } from "../services/employee";

function AddEmp() {
  const [spinnerDisplay, setSpinnerDisplay] = useState("none");
  const [profile_img, setProfileImage] = useState(null);
  const [uploaderr, setUploaderr] = useState(false);
  const [file, setFile] = useState(null);
  const [fileFormat, setFileFormat] = useState("");

  const [name, setName] = useState("");
  // const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [district, setDistrict] = useState("");
  const [password, setPassword] = useState("");
  // const [city, setCity] = useState("");
  const [state, setState] = useState("");
  // const [pincode, setPincode] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [is_volunteer, SetIs_Volunteer] = useState("");
  const [is_active, setIs_Active] = useState(true);
  const [address, SetAddress] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const data = {
      profile_image: profile_img,
      username: name,
      phone,
      email,
      district,
      password,
      state,
      blood_group: bloodGroup,
      is_volunteer: is_active,
      address,
    };

    const confirm = window.confirm("Are you sure?");
    if (confirm) {
      const result = await addemployee(data);
      console.log(result);
      if (result.data.success) {
        alert(result.data.message);
      } else {
        console.log(result);
      }
    }
    // const result = JSON.parse(localStorage.getItem("mydata")) || [];

    // localStorage.setItem("mydata", JSON.stringify([...result, data]));
    // navigate("/ViewEmp");
  };

  const handleFileChange = async (e) => {
    e.preventDefault();
    let promise = new Promise((resolve, reject) => {
      resolve(e.target.files[0]);
      reject("error while uploading");
    })
      .then((value) => {
        // console.log(value);
        setFile(value);
        setFileFormat(value.type);
        const data = { file, fileFormat };
        return data;
      })
      .then((data) => {
        const { fileFormat, file } = data;
        console.log(data);
        const presignedData = {
          fileFormat,
          type: "user",
        };
        setSpinnerDisplay("inline-block");

        const response = generatePresignedUrl(presignedData);
        return response;
      })
      .then((presignedResponse) => {
        if (presignedResponse.data.success) {
          const url = presignedResponse.data.data;
          // const uploadParams = { url, file };
          const myHeaders = new Headers({
            "Content-Type": file.type,
            "x-amz-acl": "public-read",
          });
          const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: file,
          };
          console.log(url);
          const response = fetch(url, requestOptions);
          return response;
        } else {
          setUploaderr(true);
          const err = "error while uploading";
          return err;
        }
      })
      .then((response) => {
        if (response.ok) {
          setSpinnerDisplay("none");
          const image_url = response.url?.split("?Content")?.[0];
          setUploaderr(false);
          console.log("File uploaded successfully");
          setProfileImage(image_url);
          console.log(image_url);
        } else {
          setUploaderr(true);
          const err = "error while uploading";
          return err;
        }
      })
      .catch((err) => {
        setUploaderr(true);
        console.log(err);
      });
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
                    <span>Add Employee Details </span>
                  </h5>
                </div>

                <div className="form-group mt-3">
                  <label className="d-inline me-3">Volunteer</label>
                  <input
                    className="form-check-input "
                    type="checkbox"
                    value={is_active}
                    aria-label="Checkbox for following text input"
                    onChange={(e) => {
                      setIs_Active(!is_active);
                      console.log(is_active);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="d-inline">Upload profile image </label>
                  <span>
                    <div
                      className="spinner-border"
                      style={{ display: spinnerDisplay }}
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </span>
                  <input
                    type="file"
                    className="form-control"
                    // value={profile_img}
                    onChange={handleFileChange}
                    placeholder=""
                    required
                  />
                  <span className="text-danger">
                    {uploaderr
                      ? "Error occured while uploading please try again"
                      : ""}
                  </span>
                </div>

                <div className="form-group">
                  <label> Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Name Here ..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label> Phone</label>
                  <input
                    type="number"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone"
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
                    placeholder="Enter Name Here ..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label>district</label>
                  <input
                    type="text"
                    className="form-control"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="District"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={address}
                    onChange={(e) => SetAddress(e.target.value)}
                    placeholder="Address"
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
                    placeholder="state"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Blood-Group</label>
                  <input
                    type="text"
                    className="form-control"
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    placeholder="Enter Name Here ..."
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
