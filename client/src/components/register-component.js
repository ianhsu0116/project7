import React, { useState } from "react";
import AuthService from "../services/auth.service";

const RegisterComponent = () => {
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");

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
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div style={{ padding: "3rem" }} className="col-md-12">
        <div>
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
