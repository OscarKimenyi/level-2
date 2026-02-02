import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import LogoutButton from "../components/LogoutButton";
import DarkToggle from "../components/DarkToggle";
import StatsChart from "../components/StatsChart";
import CourseChart from "../components/CourseChart";
import ExportButtons from "../components/ExportButtons";

export default function Dashboard() {
  const role = localStorage.getItem("role");
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [course, setCourse] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  const load = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/students?search=${search}&page=${page}`,
      { headers: { authorization: token } },
    );
    setStudents(res.data.students);
    setTotal(res.data.totalPages);
  };

  useEffect(() => {
    let ignore = false;

    const fetchStudents = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/students?search=${search}&page=${page}`,
          { headers: { authorization: token } },
        );

        if (!ignore) {
          setStudents(res.data.students);
          setTotal(res.data.totalPages);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load students");
      }
    };

    fetchStudents();

    return () => {
      ignore = true;
    };
  }, [page, search, token]);

  const save = async () => {
    if (editId) {
      await axios.put(
        `http://localhost:5000/api/students/${editId}`,
        { name, regNo, course },
        { headers: { authorization: token } },
      );
      toast.success("Updated");
      setEditId(null);
    } else {
      await axios.post(
        "http://localhost:5000/api/students",
        { name, regNo, course },
        { headers: { authorization: token } },
      );
      toast.success("Added");
    }
    setName("");
    setRegNo("");
    setCourse("");
    load();
  };

  const del = async (id) => {
    await axios.delete(`http://localhost:5000/api/students/${id}`, {
      headers: { authorization: token },
    });
    toast.success("Deleted");
    load();
  };

  return (
    <div className="container-fluid p-4">
      <Navbar />
      <br />
      <input
        className="form-control mb-2"
        placeholder="Search student..."
        onChange={(e) => setSearch(e.target.value)}
      />
      {role === "admin" && (
        <>
          <div className="row">
            <div className="col">
              <input
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col">
              <input
                className="form-control"
                placeholder="Reg No"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
              />
            </div>
            <div className="col">
              <input
                className="form-control"
                placeholder="Course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              />
            </div>
          </div>

          <button className="btn btn-primary mt-2" onClick={save}>
            {editId ? "Update" : "Add"}
          </button>
        </>
      )}

      <ExportButtons students={students} />

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>RegNo</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.regNo}</td>
              <td>{s.course}</td>
              <td>
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => {
                    setEditId(s._id);
                    setName(s.name);
                    setRegNo(s.regNo);
                    setCourse(s.course);
                  }}
                >
                  Edit
                </button>

                {role === "admin" && (
                  <button
                    className="btn btn-sm btn-danger ms-2"
                    onClick={() => del(s._id)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-2">
        {[...Array(total)].map((_, i) => (
          <button
            key={i}
            className="btn btn-sm btn-secondary me-1"
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <StatsChart students={students} />
      <CourseChart students={students} />
    </div>
  );
}
