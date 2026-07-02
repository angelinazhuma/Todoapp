import { useEffect, useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const load = async () => {
    const res = await fetch(`${apiUrl}/api/v1/tasks`);
    setTasks(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    await fetch(`${apiUrl}/api/v1/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });
    setTitle("");
    load();
  };

  const toggle = async (id) => {
    await fetch(`${apiUrl}/api/v1/tasks/${id}`, { method: "PATCH" });
    load();
  };

  const del = async (id) => {
    await fetch(`${apiUrl}/api/v1/tasks/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Todo</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} />
      <button onClick={add}>Add</button>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <span onClick={() => toggle(t.id)} style={{ textDecoration: t.done ? "line-through" : "none", cursor: "pointer" }}>
              {t.title}
            </span>
            <button onClick={() => del(t.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
