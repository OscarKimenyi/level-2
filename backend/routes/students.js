const router = require("express").Router();
const Student = require("../models/Student");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// GET WITH SEARCH + PAGINATION
router.get("/", auth, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const search = req.query.search || "";

  const query = {
    name: { $regex: search, $options: "i" },
  };

  const students = await Student.find(query)
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Student.countDocuments(query);

  res.json({ students, totalPages: Math.ceil(total / limit) });
});

// ADD
router.post("/", auth, async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});

router.post("/self", auth, async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});

// UPDATE
router.put("/:id", auth, async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body);
  res.json("Updated");
});

// DELETE (ADMIN)
router.delete("/:id", admin, async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

module.exports = router;
