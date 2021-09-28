const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth; // 因為auth是routes return的obj中的一個property
const courseRoute = require("./routes").course;
const passport = require("passport");
require("./config/passport")(passport); // require後直接執行，並將passport作為property帶入
const cors = require("cors");

// connect to mongoDB
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to mongo Atlas");
  })
  .catch((e) => {
    console.log(e);
  });

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cors());
app.use("/api/user", authRoute); // 後端的route都加個api, 是因為前端是用react寫，在前後端整合時會清楚很多
app.use(
  "/api/courses",
  passport.authenticate("jwt", { session: false }),
  courseRoute
);

// port listen
app.listen(8787, () => {
  console.log("Server running on port 8787");
});
