"use client";

import { Moon, Sun } from "lucide-react";
import { useGraphStore } from "./lib/algorithms/store/graphStore";

export function ThemeToggle() {
  const theme = useGraphStore((s) => s.theme);
  const toggleTheme = useGraphStore((s) => s.toggleTheme);

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-colors ${
        theme === "dark"
          ? "bg-zinc-800 hover:bg-zinc-700 text-yellow-400"
          : "bg-zinc-100 hover:bg-zinc-200 text-blue-600"
      }`}
      title="Toggle theme"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
