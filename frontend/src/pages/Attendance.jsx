import { useEffect, useEffectEvent, useState } from "react";
import axios from "axios";

export default function Attendance() {
  const [token] = useState(() => localStorage.getItem("token"));
  const [records, setRecords] = useState([]);

  const load = useEffectEvent(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/attendance", {
        headers: { authorization: token },
      });
      setRecords(res.data ?? []);
    } catch (err) {
      console.error("Failed to load attendance", err);
    }
  });

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container-fluid p-4">
      <h3>Attendance</h3>

      {records.length === 0 ? (
        <p className="text-muted">No attendance records found.</p>
      ) : (
        records.map((r) => (
          <div key={r._id} className="border-bottom py-2">
            {r.studentId} — {r.date} — <strong>{r.status}</strong>
          </div>
        ))
      )}
    </div>
  );
}
