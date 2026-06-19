"use client";

import { useEffect } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { GraphCanvas } from "./components/GraphCanvas";
import { useGraphStore } from "./components/lib/algorithms/store/graphStore";

export default function Home() {
  const theme = useGraphStore((s) => s.theme);

  // Auto-play animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      useGraphStore.setState((s) => {
        if (!s.isPlaying) return {};
        const next = s.stepIndex + 1;
        if (next >= s.steps.length) {
          return { isPlaying: false };
        }
        return { stepIndex: next };
      });
    }, useGraphStore.getState().speedMs);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`flex flex-col h-screen ${theme === "dark" ? "dark" : ""}`}>
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <GraphCanvas />
      </div>
    </div>
  );
}
