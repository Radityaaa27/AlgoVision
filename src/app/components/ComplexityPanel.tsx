"use client";

import { useGraphStore } from "./lib/algorithms/store/graphStore";
import { getTranslation } from "./lib/algorithms/store/translations";
import { complexity } from "./lib/algorithms/theory";

export function ComplexityPanel() {
  const algorithmId = useGraphStore((s) => s.algorithmId);
  const theme = useGraphStore((s) => s.theme);
  const language = useGraphStore((s) => s.language);
  const nodes = useGraphStore((s) => s.nodes);
  const edges = useGraphStore((s) => s.edges);
  const t = (key: string) => getTranslation(key, language);

  const V = nodes.length;
  const E = edges.length;
  const comp = complexity[algorithmId];

  return (
    <div
      className={`rounded-lg p-4 ${
        theme === "dark" ? "bg-zinc-900 text-zinc-100" : "bg-zinc-50 text-zinc-900"
      }`}
    >
      <h3 className="text-lg font-bold mb-3">{t("complexityPanel.title")}</h3>

      <div className={`text-sm p-3 rounded border ${
        theme === "dark"
          ? "border-zinc-700 bg-zinc-800/50"
          : "border-zinc-300 bg-zinc-100/50"
      }`}>
        <p className={`${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
          V (vertices) = <span className="font-mono font-bold">{V}</span>
        </p>
        <p className={`${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
          E (edges) = <span className="font-mono font-bold">{E}</span>
        </p>
      </div>

      <div className="mt-4 space-y-2">
        <div>
          <p className={`text-xs font-semibold ${theme === "dark" ? "text-zinc-300" : "text-zinc-700"}`}>
            {t("complexityPanel.timeComplexity")}
          </p>
          <p className={`text-sm font-mono ${theme === "dark" ? "text-cyan-400" : "text-cyan-600"}`}>
            {comp?.time}
          </p>
        </div>
        <div>
          <p className={`text-xs font-semibold ${theme === "dark" ? "text-zinc-300" : "text-zinc-700"}`}>
            {t("complexityPanel.spaceComplexity")}
          </p>
          <p className={`text-sm font-mono ${theme === "dark" ? "text-purple-400" : "text-purple-600"}`}>
            {comp?.space}
          </p>
        </div>
      </div>
    </div>
  );
}
