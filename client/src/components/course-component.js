import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../services/auth.service";

const CourseComponent = (props) => {
  const history = useHistory();
  const { currentUser, setCurrentUser } = props;
  const handleTakeToLogin = () => {
    history.push("/login");
  };
  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>You must to login before seeing your courses </p>
          <button
            onClick={handleTakeToLogin}
            className="btn btn-primary btn-lg"
          >
            Take me to login page
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role == "instructor" && (
        <div>
          <h1>Welcome to instructor's course page</h1>
        </div>
      )}
      {currentUser && currentUser.user.role == "student" && (
        <div>
          <h1>Welcome to student's course page</h1>
        </div>
      )}
    </div>
  );
};

export default CourseComponent;
