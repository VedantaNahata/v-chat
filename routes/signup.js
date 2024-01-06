const express = require("express");
const { signupUser } = require("../controllers/userController")
const router = express.Router();

router.get("/", function (req, res) {
  res.render("signup");
});

router.route("/").post(signupUser);

module.exports = router;