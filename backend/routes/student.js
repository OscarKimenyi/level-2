const router = require("express").Router();
const Student = require("../models/Student");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  res.json(await Student.find());
});

router.post("/", auth, async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});

router.put("/:id", auth, async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body);
  res.json("Updated");
});

router.delete("/:id", auth, async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

module.exports = router;
