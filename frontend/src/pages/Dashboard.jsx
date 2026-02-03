import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import {
  Search,
  PlusCircle,
  Edit,
  Trash2,
  Download,
  BarChart3,
  Users,
} from "lucide-react";

export default function Dashboard() {
  const role = localStorage.getItem("role");
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [course, setCourse] = useState("");
  const courses = [
    "Software Engineering",
    "Computer Science",
    "Cyber Security",
    "Computer Engineering",
    "Information Technology",
    "Data Science",
    "Telecommunication Engineering",
  ];
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const load = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/students?search=${search}&page=${page}`,
        { headers: { authorization: token } },
      );
      setStudents(res.data.students);
      setTotal(res.data.totalPages);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load students");
    }
    setLoading(false);
  };

  const selfRegister = async () => {
    if (!name || !regNo || !course) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/students/self-register",
        { name, regNo, course },
        { headers: { authorization: token } },
      );
      toast.success("Successfully registered!");
      setName("");
      setRegNo("");
      setCourse("");
      load();
    } catch (err) {
      console.error(err);
      toast.error("Registration failed");
    }
  };

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/students?search=${search}&page=${page}`,
          { headers: { authorization: token } },
        );
        setStudents(res.data.students);
        setTotal(res.data.totalPages);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load students");
      }
      setLoading(false);
    };

    const delayDebounceFn = setTimeout(() => {
      fetchStudents();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [page, search, token]);

  const save = async () => {
    if (!name || !regNo || !course) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/students/${editId}`,
          { name, regNo, course },
          { headers: { authorization: token } },
        );
        toast.success("Student updated successfully!");
        setEditId(null);
      } else {
        await axios.post(
          "http://localhost:5000/api/students",
          { name, regNo, course },
          { headers: { authorization: token } },
        );
        toast.success("Student added successfully!");
      }
      setName("");
      setRegNo("");
      setCourse("");
      load();
    } catch (err) {
      console.error(err);
      toast.error("Operation failed");
    }
  };

  const del = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`http://localhost:5000/api/students/${id}`, {
          headers: { authorization: token },
        });
        toast.success("Student deleted successfully!");
        load();
      } catch (err) {
        console.error(err);
        toast.error("Delete failed");
      }
    }
  };

  const exportCSV = () => {
    const headers = ["Name,Registration No,Course"];
    const csvContent = students
      .map((s) => `${s.name},${s.regNo},${s.course}`)
      .join("\n");
    const blob = new Blob([headers + "\n" + csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students.csv";
    a.click();
  };

  return (
    <div
      className={`min-vh-100 ${localStorage.getItem("darkMode") === "true" ? "dark-mode" : ""}`}
    >
      <Navbar />

      <div className="container-fluid p-3 p-md-4">
        <div className="row mb-4">
          <div className="col-12">
            <div className="card fade-in">
              <div className="card-body">
                <h2 className="card-title d-flex align-items-center">
                  <Users className="me-3" size={32} />
                  Student Dashboard
                  <span className="badge bg-primary ms-3 fs-6">
                    {students.length} Students
                  </span>
                </h2>
                <p className="text-muted">
                  Manage student records and view statistics
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Stats Row */}
        <div className="row mb-4">
          <div className="col-md-8">
            <div className="card fade-in">
              <div className="card-body">
                <div className="input-group input-group-lg">
                  <span className="input-group-text bg-transparent border-end-0">
                    <Search size={20} />
                  </span>
                  <input
                    className="form-control border-start-0"
                    placeholder="Search students by name or registration number..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card fade-in h-100">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div>
                  <h6 className="text-muted mb-1">Total Students</h6>
                  <h3 className="mb-0">{students.length}</h3>
                </div>
                <BarChart3 size={48} className="text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        {(role === "admin" || role === "student") && (
          <div className="row mb-4 fade-in">
            <div className="col-12">
              <div className="card">
                <div className="card-header bg-transparent">
                  <h5 className="mb-0 d-flex align-items-center">
                    <PlusCircle className="me-2" />
                    {role === "admin" ? "Add New Student" : "Register Yourself"}
                  </h5>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-4">
                      <input
                        className="form-control"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="col-md-3">
                      <input
                        className="form-control"
                        placeholder="Registration Number"
                        value={regNo}
                        onChange={(e) => setRegNo(e.target.value)}
                      />
                    </div>
                    <div className="col-md-3">
                      <select
                        className="form-control"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                      >
                        <option value="">Select Course</option>
                        {courses.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-2">
                      {role === "admin" && (
                        <button
                          className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                          onClick={save}
                          disabled={loading}
                        >
                          {editId ? "Update" : "Add"}
                          {!editId && <PlusCircle className="ms-2" size={18} />}
                        </button>
                      )}
                      {role === "student" && (
                        <button
                          className="btn btn-success w-100 d-flex align-items-center justify-content-center"
                          onClick={selfRegister}
                          disabled={loading}
                        >
                          Register
                        </button>
                      )}
                    </div>
                  </div>
                  {editId && (
                    <div className="mt-3 text-muted">
                      <small>
                        Editing student record. Click "Update" to save or
                        "Cancel" to clear.
                      </small>
                      <button
                        className="btn btn-sm btn-outline-secondary ms-3"
                        onClick={() => {
                          setEditId(null);
                          setName("");
                          setRegNo("");
                          setCourse("");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Export Button */}
        {role === "admin" && (
          <div className="row mb-4">
            <div className="col-12">
              <div className="card fade-in">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Student Records</h5>
                    <button
                      className="btn btn-outline-primary d-flex align-items-center"
                      onClick={exportCSV}
                      disabled={students.length === 0}
                    >
                      <Download className="me-2" size={18} />
                      Export CSV
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Students Table */}
        <div className="row">
          <div className="col-12">
            <div className="card fade-in">
              <div className="card-body">
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3 text-muted">Loading students...</p>
                  </div>
                ) : (
                  <>
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Registration No</th>
                            <th>Course</th>
                            {role === "admin" && <th>Actions</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {students.map((s) => (
                            <tr
                              key={s._id}
                              className={editId === s._id ? "table-info" : ""}
                            >
                              <td>
                                <div className="d-flex align-items-center">
                                  <div
                                    className="avatar-circle bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                                    style={{ width: "40px", height: "40px" }}
                                  >
                                    {s.name.charAt(0).toUpperCase()}
                                  </div>
                                  {s.name}
                                </div>
                              </td>
                              <td className="fw-bold">{s.regNo}</td>
                              <td>
                                <span className="badge bg-primary bg-opacity-10 text-primary p-2">
                                  {s.course}
                                </span>
                              </td>
                              {role === "admin" && (
                                <td>
                                  <div className="btn-group" role="group">
                                    <button
                                      className="btn btn-sm btn-outline-primary d-flex align-items-center"
                                      onClick={() => {
                                        setEditId(s._id);
                                        setName(s.name);
                                        setRegNo(s.regNo);
                                        setCourse(s.course);
                                      }}
                                    >
                                      <Edit size={16} className="me-1" />
                                      Edit
                                    </button>
                                    <button
                                      className="btn btn-sm btn-outline-danger d-flex align-items-center ms-2"
                                      onClick={() => del(s._id)}
                                    >
                                      <Trash2 size={16} className="me-1" />
                                      Delete
                                    </button>
                                  </div>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {students.length === 0 && !loading && (
                      <div className="text-center py-5">
                        <Users size={64} className="text-muted mb-3" />
                        <h5>No students found</h5>
                        <p className="text-muted">
                          Try a different search or add new students
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        {total > 1 && (
          <div className="row mt-4">
            <div className="col-12">
              <div className="card fade-in">
                <div className="card-body">
                  <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-center mb-0">
                      <li
                        className={`page-item ${page === 1 ? "disabled" : ""}`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setPage(page - 1)}
                        >
                          Previous
                        </button>
                      </li>
                      {[...Array(total)].map((_, i) => (
                        <li
                          key={i}
                          className={`page-item ${page === i + 1 ? "active" : ""}`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setPage(i + 1)}
                          >
                            {i + 1}
                          </button>
                        </li>
                      ))}
                      <li
                        className={`page-item ${page === total ? "disabled" : ""}`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setPage(page + 1)}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
