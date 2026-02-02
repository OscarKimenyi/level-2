import axios from 'axios'
import {useEffect,useState} from 'react'


export default function Dashboard(){
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");

  const token = localStorage.getItem("token");

  const load = async () => {
    const res = await axios.get("http://localhost:5000/api/students", {
      headers: { authorization: token },
    });
    setStudents(res.data);
  };

  useEffect(() => {
    let isMounted = true;
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/students", {
          headers: { authorization: token },
        });
        if (isMounted) setStudents(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStudents();
    return () => {
      isMounted = false;
    };
  }, [token]);

  const add = async () => {
    await axios.post(
      "http://localhost:5000/api/students",
      { name },
      { headers: { authorization: token } },
    );
    load();
  }

  return (
    <div className="container">
      <h2>Students</h2>
      <input
        className="form-control"
        placeholder="Student Name"
        onChange={(e) => setName(e.target.value)}
      />
      <button className="btn btn-success mt-2" onClick={add}>
        Add
      </button>

      <ul className="list-group mt-3">
        {students.map((s) => (
          <li key={s._id} className="list-group-item">
            {s.name}
          </li>
        ))}
      </ul>
    </div>
  );
}