"use client";

import { useGraphStore } from "./lib/algorithms/store/graphStore";
import { algorithms, AlgorithmId } from "./lib/algorithms";

export function AlgorithmSelector() {
  const algorithmId = useGraphStore((s) => s.algorithmId);
  const setAlgorithm = useGraphStore((s) => s.setAlgorithm);
  const theme = useGraphStore((s) => s.theme);

  return (
    <div className="flex flex-col gap-2">
      <label
        className={`text-sm font-semibold ${
          theme === "dark" ? "text-zinc-300" : "text-zinc-700"
        }`}
      >
        Algorithm
      </label>
      <select
        value={algorithmId}
        onChange={(e) => setAlgorithm(e.target.value as AlgorithmId)}
        className={`w-full px-3 py-2 rounded-lg border transition-colors ${
          theme === "dark"
            ? "border-zinc-600 bg-zinc-900 text-white hover:border-zinc-500"
            : "border-zinc-300 bg-white text-black hover:border-zinc-400"
        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
      >
        {Object.values(algorithms).map((algo) => (
          <option key={algo.id} value={algo.id}>
            {algo.name}
          </option>
        ))}
      </select>
      <p
        className={`text-xs ${
          theme === "dark" ? "text-zinc-500" : "text-zinc-500"
        }`}
      >
        {algorithms[algorithmId].weighted
          ? "✓ Weighted graph support"
          : "Unweighted only"}
      </p>
    </div>
  );
}
