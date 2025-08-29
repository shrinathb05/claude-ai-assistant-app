const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8000";

export async function askBackend(prompt) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} • ${text}`);
  }

  const data = await res.json();
  if (data.error) throw new Error(data.error);

  return data.response || "";
}
