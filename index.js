const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const port = process.env.PORT || 80;
const connectDB = require("./config/db");

connectDB();

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

const indexRouter = require("./routes/index");
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");

app.use("/", indexRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
