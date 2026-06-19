"use client";

import { useGraphStore } from "./lib/algorithms/store/graphStore";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const theme = useGraphStore((s) => s.theme);

  return (
    <header
      className={`border-b ${
        theme === "dark"
          ? "border-zinc-800 bg-black text-white"
          : "border-zinc-200 bg-white text-black"
      } px-6 py-4 shadow-sm`}
    >
      <div className="flex max-w-7xl mx-auto items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AlgoVision</h1>
          <p className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
            Interactive Algorithm Visualization Platform
          </p>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
