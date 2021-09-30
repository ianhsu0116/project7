import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../services/auth.service";
import CourseService from "../services/course.service";

const CourseComponent = (props) => {
  const { currentUser, setCurrentUser } = props;
  const history = useHistory();
  const handleTakeToLogin = () => {
    history.push("/login");
  };
  let [courseData, setCourseData] = useState(null);
  useEffect(() => {
    console.log("Useing Effect");
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
    } else {
      _id = "";
    }

    if (currentUser.user.role === "instructor") {
      CourseService.get(_id)
        .then((data) => {
          setCourseData(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (currentUser.user.role === "student") {
      CourseService.getEnrolledCourses(_id)
        .then((data) => {
          console.log(data);
          setCourseData(data.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  }, []);

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
      {currentUser && courseData && courseData.length !== 0 && (
        <div>
          <p>Here is the courses you have</p>
          {courseData.map((course) => (
            <div className="card mb-2" style={{ width: "900px" }}>
              <div className="card-body">
                <h4 className="card-title">{course.title}</h4>
                <p className="card-description">{course.description}</p>
                <p>
                  <strong>Student Count: {course.students.length}</strong>
                </p>
                <button className="btn btn-primary">
                  CoursePrice: {course.price}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseComponent;
