const router = require("express").Router();
const Student = require("../models/Student");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// Get All
router.get("/", auth, async (req, res) => {
  res.json(await Student.find());
});

// Add
router.post("/", auth, async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});

// Update
router.put("/:id", auth, async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body);
  res.json("Updated");
});

// Delete (ADMIN ONLY)
router.delete("/:id", admin, async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

module.exports = router;
