import React, { useState } from "react";
import { useHistory } from "react-router-dom"; // 在react等同node的 => redirect
import AuthService from "../services/auth.service";

const RegisterComponent = () => {
  const history = useHistory();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");
  let [message, setMessage] = useState("");

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeRole = (e) => {
    setRole(e.target.value);
  };
  const handleRegister = () => {
    AuthService.register(username, email, password, role)
      .then(() => {
        window.alert(
          "Registeration Succeeds! You are now redirect to the login page"
        );
        history.push("/login");
      })
      .catch((error) => {
        setMessage(error.response.data);
        console.log(error.response.data);
      });
  };
  return (
    <div>
      <div style={{ padding: "3rem" }} className="col-md-12">
        <div>
          {/* 下面語法等同 if(message){} */}
          {message && <div className="alert alert-danger">{message}</div>}
          <div>
            <label htmlFor="username">Username</label>
            <input
              onChange={handleChangeUsername}
              type="text"
              className="form-control"
              name="username"
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="email">email</label>
            <input
              onChange={handleChangeEmail}
              type="text"
              className="form-control"
              name="email"
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChangePassword}
              type="password"
              className="form-control"
              name="password"
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="password">role</label>
            <input
              onChange={handleChangeRole}
              type="text"
              className="form-control"
              name="role"
            />
          </div>
          <br />
          <button onClick={handleRegister} className="btn btn-primary">
            <span>Register</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
