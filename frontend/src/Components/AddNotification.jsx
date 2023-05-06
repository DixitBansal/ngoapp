import React from "react";
import { useState} from "react";
import {useNavigate} from "react-router-dom"

function AddNotification() {
  const [text, setText] = useState("");
  
  

  const navigate = useNavigate();

  const handleSubmit = () => {
    const data = {
      text,
      
    };
    
     const result = JSON.parse(localStorage.getItem("notification")) || [];


    localStorage.setItem("notification",JSON.stringify([...result, data]));
    navigate("/viewNotification")


  };
  


  return (
    <div>
      <form onSubmit={(e)=>{e.preventDefault();handleSubmit()}}>
      <div className="row m-5">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-body">
              <div className="col-12">
                <h5 className="form-title">
                  <span>Add Notification </span>
                </h5>
              </div>

              <div className="form-group">
                <label>Add-Notification </label>
                <input
                  type="text"
                  className="form-control"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                    placeholder="Add-Notification"
                  required
                />
              </div>

              

             

              <br/>
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


 export default AddNotification;
