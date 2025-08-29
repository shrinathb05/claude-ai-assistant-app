import React from "react";

export default function TypingDots({ className = "" }) {
  return (
    <div className={`text-slate-500 dark:text-slate-400 ${className}`}>
      <span className="dot" />
      <span className="dot" />
      <span className="dot" />
    </div>
  );
}
