import React, { useEffect, useState } from "react";
import { Moon, SunMedium, Github } from "lucide-react";

export default function Header() {
  const [dark, setDark] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("theme") === "dark" : true
  );

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-950/80 backdrop-blur">
      <div className="mx-auto max-w-4xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-brand-600 text-white font-semibold">AI</span>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
            Claude/Gemini Assistant
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/shrinathb05/claude-ai-assistant-app"
            target="_blank" rel="noreferrer"
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            title="GitHub"
          >
            <Github className="h-5 w-5 text-slate-600 dark:text-slate-300" />
          </a>
          <button
            onClick={() => setDark((d) => !d)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Toggle theme"
          >
            {dark ? (
              <SunMedium className="h-5 w-5 text-amber-300" />
            ) : (
              <Moon className="h-5 w-5 text-slate-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
