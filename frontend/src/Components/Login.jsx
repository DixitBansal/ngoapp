import React, { useState } from "react";
import "./Newapp.css";
import { useNavigate } from "react-router-dom";
import backhroundImage from "../bg.jpg";
import { login } from "../services/auth";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submitvalue = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJUYW5pa2EiLCJwYXNzd29yZCI6IiQyYSQwOCRjTXNxY3A1UnVScXlCU2xDYVhmdllPNGFqdGtRUFJzazdMci81MUlnWXNFbDlsRjNqZy5GTyIsInBob25lIjoiOTU0OTgxNjMzMCIsImVtYWlsIjoicmVnZXhAZ21haWwuY29tIiwiY2l0eSI6IkphaXB1ciIsInN0YXRlIjoiUmFqYXN0aGFuIiwiYmxvb2RfZ3JvdXAiOiJBQi0iLCJhZGRyZXNzIjpudWxsLCJpc192b2x1bnRlZXIiOm51bGwsImFjY190eXBlIjoidXNlciIsImNyZWF0ZWRfYXQiOiIyMDIzLTA0LTIzVDA3OjAwOjQwLjEzNVoiLCJ1cGRhdGVkX2F0IjoiMjAyMy0wNC0yOVQwNDo1MzozOS4zMzlaIiwiaXNfYWN0aXZlIjp0cnVlLCJpYXQiOjE2ODI3NDQ3ODQsImV4cCI6MTY4MzYwODc4NH0.aKvU5Xh_T399iLimWSgh4IneexY6ZWW6q-3uylIPfW0";

    if (email === "ykuldeep624@gmail.com" && password === "yadav123") {
      sessionStorage.setItem("userdata", JSON.stringify(data));
      localStorage.setItem("token", JSON.stringify(token));
      navigate("/admin", { state: { data: data } });
    } else {
      setError("invalid credentials");
    }
  };
  return (
    <section className="body">
      <div style={{ color: "red" }}>{error ? <span>{error}</span> : null}</div>
      <div className="background">
        <div id="login-modal">
          <div style={{ color: "red" }}>
            {error ? <span>{error}</span> : null}
          </div>
          <div className="login-background">
            <div className="shape"></div>
            <div className="shape"></div>
          </div>
          <form className="myform">
            <h3>Login Here</h3>

            <label for="username">Username</label>
            <input
              type="text"
              placeholder="Email or Phone"
              name="userName"
              id="userName"
              className="myinput"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <label for="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="pwd"
              className="myinput"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <button onClick={submitvalue} className="mybutton">
              Log In
            </button>
            <div className="social">
              <div className="go">
                <i className="fab fa-google"></i> Google
              </div>
              <div className="fb">
                <i className="fab fa-facebook"></i> Facebook
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
