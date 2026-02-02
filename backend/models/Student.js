const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  regNo: { type: String, required: true, unique: true },
  course: { type: String, required: true },
});

module.exports = mongoose.model("Student", StudentSchema);
