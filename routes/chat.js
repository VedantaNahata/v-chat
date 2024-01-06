const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

router.get("/", protect, function (req, res) {
  const userName = req.user.name;
  res.render("chat", { userName });
});

module.exports = router;
