import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setMessages((msgs) => [...msgs, { role: "user", content: input }]);
    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input })
      });
      const data = await res.json();
      setMessages((msgs) => [...msgs, { role: "assistant", content: data.response || data.error }]);
    } catch (err) {
      setMessages((msgs) => [...msgs, { role: "assistant", content: "Error contacting backend." }]);
    }
    setInput("");
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h1>Claude AI Assistant</h1>
      <div style={{ marginBottom: "1rem" }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ margin: "0.5rem 0", color: msg.role === "user" ? "#222" : "#4169e1" }}>
            <strong>{msg.role === "user" ? "You:" : "Claude:"}</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type your message..."
        style={{ width: "80%", padding: "0.5rem" }}
        disabled={loading}
      />
      <button onClick={sendMessage} disabled={loading} style={{ marginLeft: "1rem", padding: "0.5rem 1rem" }}>
        Send
      </button>
    </div>
  );
}

export default App;