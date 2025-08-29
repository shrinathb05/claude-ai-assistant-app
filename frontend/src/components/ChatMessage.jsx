import React from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // or 'github.css' for light
import { User, Bot, Copy } from "lucide-react";

function Bubble({ role, children }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`group max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-3 shadow-sm border
        ${isUser
          ? "bg-brand-600 text-white border-brand-600"
          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
        }`}
      >
        <div className="flex items-start gap-2">
          <div className={`mt-0.5 ${isUser ? "text-white" : "text-brand-600"}`}>
            {isUser ? <User size={18} /> : <Bot size={18} />}
          </div>
          <div className="prose-chat">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChatMessage({ msg, index }) {
  const isUser = msg.role === "user";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(msg.content || "");
    } catch {}
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 250, damping: 20, delay: Math.min(index * 0.02, 0.2) }}
      className="relative"
    >
      <Bubble role={msg.role}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
{msg.content}
        </ReactMarkdown>

        {!isUser && (
          <button
            onClick={handleCopy}
            className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-3 right-2 bg-slate-900/80 text-white dark:bg-slate-100 dark:text-slate-900 border border-slate-700 dark:border-slate-300 rounded-md px-2 py-1 text-xs inline-flex items-center gap-1"
            title="Copy"
          >
            <Copy size={14} /> Copy
          </button>
        )}
      </Bubble>
    </motion.div>
  );
}
