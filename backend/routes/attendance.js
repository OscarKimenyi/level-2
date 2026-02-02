const router = require("express").Router();
const Attendance = require("../models/Attendance");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const a = new Attendance(req.body);
  await a.save();
  res.json(a);
});

router.get("/", auth, async (req, res) => {
  res.json(await Attendance.find());
});

module.exports = router;
