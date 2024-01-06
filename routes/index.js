const express = require("express");
const router = express.Router();
const getCookie = require("../config/getCookie");

router.get("/", function (req, res) {
  const token = getCookie(req, "token");

  if (token) {
    res.redirect("/chat");
  } else {
    res.render("index");
  }
});

module.exports = router;