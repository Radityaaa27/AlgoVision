"use client";

import { AlgorithmSelector } from "./AlgorithmSelector";
import { Control } from "./Control";
import { ComplexityPanel } from "./ComplexityPanel";
import { TheorySection } from "./TheorySection";
import { useGraphStore } from "./lib/algorithms/store/graphStore";

export function Sidebar() {
  const theme = useGraphStore((s) => s.theme);

  return (
    <aside
      className={`w-80 border-r overflow-y-auto p-6 flex flex-col gap-6 ${
        theme === "dark"
          ? "border-zinc-800 bg-black"
          : "border-zinc-200 bg-white"
      }`}
    >
      <AlgorithmSelector />
      <div className={`h-px ${theme === "dark" ? "bg-zinc-800" : "bg-zinc-200"}`} />
      <Control />
      <div className={`h-px ${theme === "dark" ? "bg-zinc-800" : "bg-zinc-200"}`} />
      <TheorySection />
      <ComplexityPanel />
    </aside>
  );
}
