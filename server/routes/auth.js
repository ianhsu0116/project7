const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const User = require("../models").userModel;
const jwt = require("jsonwebtoken");

router.use((req, res, next) => {
  console.log("A request is coming in to auth.js");
  next();
});

// 很常會需要用postman測試各個router有無正常運作，所以放一個Test route
router.get("/testAPI", (req, res) => {
  const msgObj = {
    message: "Test API is working",
  };
  // res.json() 跟 res.send() 雷同，不過json是送出一個json格式的object
  return res.json(msgObj);
});

// 註冊
router.post("/register", async (req, res) => {
  // check the validation of data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check igf the user exist
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).send("Email has already been register.");

  // register the user
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });

  try {
    const saveUser = await newUser.save();
    res.status(200).send({
      msg: "Success",
      savedObject: saveUser,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

//登入
router.post("/login", (req, res) => {
  // check the validation of the data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if the user exist
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(400).send(err);

    if (!user) {
      res.status(401).send("User not found");
    } else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (err) return res.status(400).send(err);

        if (isMatch) {
          const tokenObject = { _id: user._id, email: user.email };
          const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);

          res.status(200).send({
            seccess: true,
            token: "JWT " + token,
            user,
          });
        } else {
          res.status(401).send("Wrong email or password");
        }
      });
    }
  });
});

module.exports = router;
