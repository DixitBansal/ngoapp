import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost, generatePresignedUrl } from "../services/ngoPosts";
// import { resolve } from "chart.js/dist/helpers/helpers.options";

function AddPost() {
  const [fileFormat, setFileFormat] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [submitText, setSubmitText] = useState("Submit");
  // const [photo, setPhoto] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const data = {
      fileFormat,
      type: "post",
      // photo,
    };
    const response = await generatePresignedUrl(data);
    if (response.data.success) {
      const url = response.data.data;
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

      await fetch(url, requestOptions)
        .then((response) => {
          if (response.ok) {
            const image_url = response.url?.split("?Content")?.[0];

            console.log("File uploaded successfully");
            return image_url;
          } else {
            console.error("Error uploading file");
          }
        })
        .then(async (image_url) => {
          const data = { image_url, content: text };
          const createngoPost = await createPost(data);
          // console.log(createngoPost);
          if (createngoPost.data.success) {
            setDisabled(false);
            setSubmitText("Submit");
            alert(createngoPost.data.msg);
          }
        })
        .catch((error) => {
          setDisabled(false);
          setSubmitText("Submit");
          console.error(error);
        });
    } else {
      alert(response.data.message);
      setDisabled(false);
      setSubmitText("Submit");
    }

    // const result = JSON.parse(localStorage.getItem("post")) || [];

    // localStorage.setItem("post", JSON.stringify([...result, data]));
    // navigate("/ViewPost");
  };
  const handleFileChange = async (e) => {
    e.preventDefault();
    let promise = new Promise((resolve, reject) => {
      resolve(e.target.files[0]);
      reject("error while uploading");
    }).then((value) => {
      // console.log(value);
      setFile(value);
      setFileFormat(value.type);
    });
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const confirm = window.confirm("are you sure?");
          if (confirm) {
            setDisabled(true);
            setSubmitText("Loading...");
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
                    <span>Add Post </span>
                  </h5>
                </div>

                <div className="form-group">
                  <label> Post </label>
                  <input
                    type="text"
                    className="form-control"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter Post"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Add Photo </label>
                  <input
                    onChange={handleFileChange}
                    type="file"
                    placeholder="Input Box"
                    required
                  />
                </div>
                <br />
              </div>
              <div className="col-12">
                <input
                  type="submit"
                  disabled={disabled}
                  className="form-control"
                  value={submitText}
                />
              </div>
              <br />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddPost;
