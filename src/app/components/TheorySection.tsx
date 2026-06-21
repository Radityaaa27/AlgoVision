"use client";

import { useGraphStore } from "./lib/algorithms/store/graphStore";
import { getTranslation } from "./lib/algorithms/store/translations";
import { theory, complexity } from "./lib/algorithms/theory";

export function TheorySection() {
  const algorithmId = useGraphStore((s) => s.algorithmId);
  const theme = useGraphStore((s) => s.theme);
  const language = useGraphStore((s) => s.language);
  const t = (key: string) => getTranslation(key, language);
  const algo = theory[algorithmId] || {};

  return (
    <div
      className={`rounded-lg p-4 ${
        theme === "dark" ? "bg-zinc-900 text-zinc-100" : "bg-zinc-50 text-zinc-900"
      }`}
    >
      <h3 className="text-lg font-bold mb-3">{t("theorySection.title")}</h3>
      <p className={`text-sm leading-relaxed mb-4 ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
        {algo.overview}
      </p>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className={`font-semibold ${theme === "dark" ? "text-zinc-300" : "text-zinc-700"}`}>Time</p>
          <p className={`${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>{algo.time}</p>
        </div>
        <div>
          <p className={`font-semibold ${theme === "dark" ? "text-zinc-300" : "text-zinc-700"}`}>Space</p>
          <p className={`${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>{algo.space}</p>
        </div>
      </div>

      <div className="mt-4 p-3 rounded border border-blue-500/30 bg-blue-500/5">
        <p className={`text-xs font-semibold ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}>
          Best Case
        </p>
        <p className={`text-xs mt-1 ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>{algo.best}</p>
      </div>

      <div className="mt-3">
        <p className={`text-xs font-semibold mb-2 ${theme === "dark" ? "text-zinc-300" : "text-zinc-700"}`}>
          {t("theorySection.useCase")}
        </p>
        <ul className={`text-xs space-y-1 ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
          {algo.use?.map((u, i) => (
            <li key={i}>• {u}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
