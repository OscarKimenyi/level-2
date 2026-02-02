import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import Loader from "../components/Loader";
import LogoutButton from "../components/LogoutButton";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const loadStudents = useCallback(async () => {
    setLoading(true);
    const res = await axios.get("http://localhost:5000/api/students", {
      headers: { authorization: token },
    });
    setStudents(res.data);
    setLoading(false);
  }, [token]);

  useEffect(() => {
    Promise.resolve().then(loadStudents);
  }, [loadStudents]);

  const addStudent = async () => {
    if (!name) return alert("Enter name");

    await axios.post(
      "http://localhost:5000/api/students",
      { name },
      { headers: { authorization: token } },
    );

    setName("");
    loadStudents();
  };

  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:5000/api/students/${id}`, {
      headers: { authorization: token },
    });
    loadStudents();
  };

  const updateStudent = async (id) => {
    await axios.put(
      `http://localhost:5000/api/students/${id}`,
      { name },
      { headers: { authorization: token } },
    );
    setEditingId(null);
    setName("");
    loadStudents();
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        <h2>Students</h2>
        <LogoutButton />
      </div>

      <input
        className="form-control"
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {editingId ? (
        <button
          className="btn btn-warning mt-2"
          onClick={() => updateStudent(editingId)}
        >
          Update
        </button>
      ) : (
        <button className="btn btn-success mt-2" onClick={addStudent}>
          Add
        </button>
      )}

      {loading && <Loader />}

      <table className="table mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => {
                    setEditingId(s._id);
                    setName(s.name);
                  }}
                >
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-danger ms-2"
                  onClick={() => deleteStudent(s._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
