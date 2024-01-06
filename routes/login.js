const express = require("express");
const { loginUser } = require("../controllers/userController")
const router = express.Router();

router.get("/", function (req, res) {
  res.render("login");
});

router.route("/").post(loginUser);

module.exports = router;