const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();
const port = process.env.PORT || 80;
const connectDB = require("./config/db");

const { protect } = require("./middlewares/authMiddleware");

connectDB(process.env.URI);

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./public")));


const indexRouter = require("./routes/index");
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const chatRouter = require("./routes/chat");

app.use("/", indexRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/chat", protect, chatRouter);

app.use(function (req, res, next) {
  res.send("404");
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
