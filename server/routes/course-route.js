const router = require("express").Router();
const Course = require("../models").courseModel;
const courseValidation = require("../validation").courseValidation;

router.use((req, res, next) => {
  console.log("A request is coming in course-route");
  next();
});

// get all courses
router.get("/", (req, res) => {
  Course.find({})
    .populate("instructor", ["username", "email"])
    .then((course) => {
      res.send(course);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// get specific course
router.get("/:_id", (req, res) => {
  let _id = req.params;
  Course.findOne({ _id })
    .populate("instructor", ["username", "email"])
    .then((course) => {
      res.send(course);
    })
    .catch((err) => {
      res.send(err);
    });
});

// get specific course select by instructor's _id
router.get("/instructor/:_instructor_id", (req, res) => {
  let { _instructor_id } = req.body;

  Course.find({ instructor: _instructor_id })
    .populate("instructor", ["username", "email"])
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send("Can not get course data");
    });
});

// post new course
router.post("/", async (req, res) => {
  // validate the input before making a new course
  const { error } = courseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if the user are student or instructor
  if (req.user.isStudent()) {
    return res.status(400).send("Only instructor can post a new course");
  }

  let { title, description, price } = req.body;
  let newCourse = new Course({
    title,
    description,
    price,
    instructor: req.user._id,
  });

  try {
    await newCourse.save();
    res.status(200).send("New course has been saved!");
  } catch (err) {
    res.status(400).send("cannot save course");
  }
});

// update the course
router.patch("/:_id", async (req, res) => {
  // validate the input before update course
  const { error } = courseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let { _id } = req.params;
  let course = await Course.findOne({ _id });

  // check if the coures exsit or not
  if (!course) {
    res.status(404);
    return res.json({
      success: false,
      message: "Course not found",
    });
  }

  if (course.instructor.equals(req.user._id) || req.user.isAdmin()) {
    Course.findOneAndUpdate({ _id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then(() => {
        res.status(200);
        res.json({
          success: true,
          message: "Update success!",
        });
      })
      .catch((err) => {
        res.status(404);
        res.json({
          success: false,
          message: err,
        });
      });
  } else {
    res.status(403);
    return res.json({
      success: false,
      message: "Only the instructor of the course can edit the course!",
    });
  }
});

// delete the course
router.delete("/:_id", async (req, res) => {
  let { _id } = req.params;
  let course = await Course.findOne({ _id });

  // check if the coures exsit or not
  if (!course) {
    res.status(404);
    return res.json({
      success: false,
      message: "Course not found",
    });
  }

  if (course.instructor.equals(req.user._id) || req.user.isAdmin()) {
    Course.findOneAndDelete({ _id }, { new: true })
      .then(() => {
        res.status(200);
        res.json({
          success: true,
          message: "Success delete the course!",
        });
      })
      .catch((err) => {
        res.status(404);
        res.json({
          success: false,
          message: err,
        });
      });
  } else {
    res.status(403);
    return res.json({
      success: false,
      message:
        "Only the instructor of the course or web admin can delete the course!",
    });
  }
});

module.exports = router;
