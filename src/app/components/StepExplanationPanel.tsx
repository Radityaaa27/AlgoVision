"use client";

import { useGraphStore } from "./lib/algorithms/store/graphStore";
import { getTranslation } from "./lib/algorithms/store/translations";
import { fmt } from "./lib/algorithms/types";

export function StepExplanationPanel() {
  const stepIndex = useGraphStore((s) => s.stepIndex);
  const steps = useGraphStore((s) => s.steps);
  const theme = useGraphStore((s) => s.theme);
  const language = useGraphStore((s) => s.language);
  const t = (key: string) => getTranslation(key, language);

  const step = steps[stepIndex];

  if (!step) {
    return (
      <div
        className={`rounded-lg p-4 ${
          theme === "dark" ? "bg-zinc-900 text-zinc-100" : "bg-zinc-50 text-zinc-900"
        }`}
      >
        <h3 className="text-lg font-bold mb-3">{t("stepExplanation.title")}</h3>
        <p className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
          {t("stepExplanation.noStepsAvailable")}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg p-4 ${
        theme === "dark" ? "bg-zinc-900 text-zinc-100" : "bg-zinc-50 text-zinc-900"
      }`}
    >
      <div className="mb-4">
        <p className={`text-xs font-semibold uppercase tracking-wide ${
          theme === "dark" ? "text-zinc-500" : "text-zinc-500"
        }`}>
          {t("stepExplanation.step")} {step.index + 1} of {steps.length}
        </p>
        <h3 className="text-lg font-bold mt-1">{step.title}</h3>
      </div>

      <div
        className={`p-3 rounded border-l-4 border-blue-500 ${
          theme === "dark" ? "bg-blue-900/20" : "bg-blue-50"
        }`}
      >
        <p className={`text-sm ${theme === "dark" ? "text-blue-300" : "text-blue-700"}`}>
          {step.why}
        </p>
      </div>

      {(step.visited?.length > 0 || step.frontier?.length > 0) && (
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          {step.visited?.length > 0 && (
            <div>
              <p className={`font-semibold ${theme === "dark" ? "text-green-400" : "text-green-600"}`}>
                {t("stepExplanation.visited")}
              </p>
              <p className={`font-mono text-xs mt-1 ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
                {step.visited.join(", ") || "—"}
              </p>
            </div>
          )}
          {step.frontier?.length > 0 && (
            <div>
              <p className={`font-semibold ${theme === "dark" ? "text-orange-400" : "text-orange-600"}`}>
                {t("stepExplanation.queue")}
              </p>
              <p className={`font-mono text-xs mt-1 ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
                {step.frontier.join(", ") || "—"}
              </p>
            </div>
          )}
        </div>
      )}

      {step.distances && Object.keys(step.distances).length > 0 && (
        <div className="mt-4">
          <p className={`text-sm font-semibold ${theme === "dark" ? "text-zinc-300" : "text-zinc-700"}`}>
            {t("stepExplanation.distance")}
          </p>
          <div className={`grid grid-cols-4 gap-2 mt-2 text-xs ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
            {Object.entries(step.distances)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([node, dist]) => (
                <div key={node} className="font-mono">
                  {node}: {fmt(dist)}
                </div>
              ))}
          </div>
        </div>
      )}

      {step.path && step.path.length > 0 && (
        <div className="mt-4 p-3 rounded bg-green-900/20 border border-green-600/30">
          <p className={`text-sm font-semibold ${theme === "dark" ? "text-green-400" : "text-green-600"}`}>
            Path Found
          </p>
          <p className={`font-mono text-sm mt-1 ${theme === "dark" ? "text-green-300" : "text-green-700"}`}>
            {step.path.join(" → ")}
          </p>
        </div>
      )}
    </div>
  );
}
