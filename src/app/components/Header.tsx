"use client";

import { useGraphStore } from "./lib/algorithms/store/graphStore";
import { ThemeToggle } from "./ThemeToggle";
import { getTranslation } from "./lib/algorithms/store/translations";
import { Globe } from "lucide-react";

export function Header() {
  const theme = useGraphStore((s) => s.theme);
  const language = useGraphStore((s) => s.language);
  const setLanguage = useGraphStore((s) => s.setLanguage);
  const t = (key: string) => getTranslation(key, language);

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
          <h1 className="text-3xl font-bold tracking-tight">{t("header.title")}</h1>
          <p className={`text-sm ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
            {t("header.subtitle")}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="flex items-center gap-2">
            <Globe size={18} />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as "en" | "id")}
              className={`px-3 py-2 rounded-lg border transition-colors ${
                theme === "dark"
                  ? "bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
                  : "bg-zinc-100 border-zinc-300 text-black hover:bg-zinc-200"
              }`}
              title={t("language.language")}
            >
              <option value="en">{t("language.english")}</option>
              <option value="id">{t("language.indonesian")}</option>
            </select>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
