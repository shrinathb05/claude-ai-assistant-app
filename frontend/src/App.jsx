import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import TypingDots from "./components/TypingDots";
import { askBackend } from "./lib/api";
import "./index.css";

export default function App() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I’m your Claude/Gemini assistant. How can I help today?" }
  ]);
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  // auto-scroll on new message
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (prompt) => {
    const userMsg = { role: "user", content: prompt };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const reply = await askBackend(prompt); // calls your FastAPI /chat
      const botMsg = { role: "assistant", content: reply || "_(no content)_" };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `⚠️ ${err.message || "Error contacting backend"}` }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-6 space-y-3">
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <ChatMessage key={i} msg={m} index={i} />
            ))}
          </AnimatePresence>

          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl px-4 py-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <TypingDots />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>
      </main>

      <ChatInput onSend={handleSend} disabled={loading} />
    </div>
  );
}
