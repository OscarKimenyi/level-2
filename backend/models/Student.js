const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: String,
  regNo: String,
  course: String,
});

module.exports = mongoose.model("Student", StudentSchema);
