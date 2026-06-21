"use client";

import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Plus, Trash2 } from "lucide-react";
import { useGraphStore } from "./lib/algorithms/store/graphStore";
import { getTranslation } from "./lib/algorithms/store/translations";

export function Control() {
  const isPlaying = useGraphStore((s) => s.isPlaying);
  const play = useGraphStore((s) => s.play);
  const pause = useGraphStore((s) => s.pause);
  const reset = useGraphStore((s) => s.reset);
  const stepForward = useGraphStore((s) => s.stepForward);
  const stepBackward = useGraphStore((s) => s.stepBackward);
  const speedMs = useGraphStore((s) => s.speedMs);
  const setSpeed = useGraphStore((s) => s.setSpeed);
  const clearGraph = useGraphStore((s) => s.clearGraph);
  const loadSampleGraph = useGraphStore((s) => s.loadSampleGraph);
  const theme = useGraphStore((s) => s.theme);
  const language = useGraphStore((s) => s.language);
  const t = (key: string) => getTranslation(key, language);

  const btnClass = `p-2 rounded-lg transition-colors ${
    theme === "dark"
      ? "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
      : "bg-zinc-100 hover:bg-zinc-200 text-black border border-zinc-300"
  }`;

  return (
    <div className="flex flex-col gap-4">
      {/* Playback Controls */}
      <div>
        <p
          className={`text-sm font-semibold mb-2 ${
            theme === "dark" ? "text-zinc-300" : "text-zinc-700"
          }`}
        >
          {t("control.playback")}
        </p>
        <div className="flex gap-2">
          <button onClick={stepBackward} className={btnClass} title={t("control.stepBackward")}>
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={isPlaying ? pause : play}
            className={`flex-1 p-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${
              isPlaying
                ? theme === "dark"
                  ? "bg-red-900 hover:bg-red-800 text-white"
                  : "bg-red-100 hover:bg-red-200 text-red-700"
                : theme === "dark"
                  ? "bg-green-900 hover:bg-green-800 text-white"
                  : "bg-green-100 hover:bg-green-200 text-green-700"
            }`}
            title={t("control.play")}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            <span className="text-sm font-medium">{isPlaying ? t("control.pause") : t("control.play")}</span>
          </button>
          <button onClick={stepForward} className={btnClass} title={t("control.stepForward")}>
            <ChevronRight size={18} />
          </button>
          <button onClick={reset} className={btnClass} title={t("control.reset")}>
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      {/* Speed Control */}
      <div>
        <label
          className={`text-sm font-semibold block mb-2 ${
            theme === "dark" ? "text-zinc-300" : "text-zinc-700"
          }`}
        >
          {t("control.speed")}: {speedMs}{t("control.speedMs")}
        </label>
        <input
          type="range"
          min="100"
          max="2000"
          step="100"
          value={speedMs}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Graph Actions */}
      <div>
        <p
          className={`text-sm font-semibold mb-2 ${
            theme === "dark" ? "text-zinc-300" : "text-zinc-700"
          }`}
        >
          {t("control.graph")}
        </p>
        <div className="flex flex-col gap-2">
          <button
            onClick={loadSampleGraph}
            className={`${btnClass} flex items-center justify-center gap-2`}
          >
            <Plus size={16} />
            {t("control.loadSample")}
          </button>
          <button
            onClick={clearGraph}
            className={`${btnClass} flex items-center justify-center gap-2`}
          >
            <Trash2 size={16} />
            {t("control.clear")}
          </button>
        </div>
      </div>
    </div>
  );
}
