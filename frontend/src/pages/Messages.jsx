import axios from "axios";
import { useEffect, useEffectEvent, useState } from "react";

export default function Messages() {
  const [token] = useState(() => localStorage.getItem("token"));
  const [msg, setMsg] = useState("");
  const [list, setList] = useState([]);

  // This one is only called from useEffect → safe with useEffectEvent
  const fetchMessages = useEffectEvent(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/messages", {
        headers: { authorization: token },
      });
      setList(res.data ?? []);
    } catch (err) {
      console.error("Failed to load messages:", err);
    }
  });

  useEffect(() => {
    fetchMessages();
  }, [token]); // re-runs when token changes

  // Separate plain async function for manual calls (called from button)
  const reloadMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/messages", {
        headers: { authorization: token },
      });
      setList(res.data ?? []);
    } catch (err) {
      console.error("Failed to reload messages:", err);
    }
  };

  const send = async () => {
    if (!msg.trim()) return;

    try {
      await axios.post(
        "http://localhost:5000/api/messages",
        { sender: "me", receiver: "admin", message: msg },
        { headers: { authorization: token } },
      );
      setMsg("");
      await reloadMessages(); // ← plain function, no problem
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div className="container-fluid p-4">
      <h3>Messages</h3>

      <div
        className="mb-4 border rounded p-3 bg-light"
        style={{ maxHeight: "400px", overflowY: "auto" }}
      >
        {list.length === 0 ? (
          <p className="text-muted text-center">No messages yet.</p>
        ) : (
          list.map((m) => (
            <div
              key={m._id}
              className={`mb-2 p-2 rounded ${
                m.sender === "me"
                  ? "bg-primary text-white ms-auto"
                  : "bg-secondary text-white"
              }`}
              style={{ maxWidth: "70%", width: "fit-content" }}
            >
              <small className="d-block opacity-75">{m.sender}</small>
              {m.message}
            </div>
          ))
        )}
      </div>

      <div className="input-group">
        <input
          className="form-control"
          placeholder="Type your message..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send())
          }
        />
        <button className="btn btn-primary" onClick={send}>
          Send
        </button>
      </div>
    </div>
  );
}
