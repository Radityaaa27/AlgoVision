/**
 * Multi-language Translation System
 * Supports: English (en) and Indonesian (id)
 */

export type Language = "en" | "id";

export const translations = {
  en: {
    // Header
    header: {
      title: "AlgoVision",
      subtitle: "Interactive Algorithm Visualization Platform",
    },

    // Algorithm Selector
    algorithmSelector: {
      label: "Algorithm",
      dijkstra: "Dijkstra's Algorithm",
      astar: "A* Algorithm",
      bfs: "Breadth-First Search",
      dfs: "Depth-First Search",
    },

    // Complexity Panel
    complexityPanel: {
      title: "Complexity Analysis",
      timeComplexity: "Time Complexity",
      spaceComplexity: "Space Complexity",
    },

    // Theory Section
    theorySection: {
      title: "Algorithm Theory",
      useCase: "Use Cases",
      howItWorks: "How It Works",
      advantages: "Advantages",
      disadvantages: "Disadvantages",
    },

    // Control Panel
    control: {
      playback: "Playback",
      play: "Play",
      pause: "Pause",
      stepBackward: "Step backward",
      stepForward: "Step forward",
      reset: "Reset",
      speed: "Speed",
      speedMs: "ms",
      graph: "Graph",
      loadSample: "Load Sample",
      clear: "Clear Graph",
      addNode: "Add Node (click canvas)",
      removeNode: "Remove Node",
    },

    // Sidebar
    sidebar: {
      title: "Controls",
      selectAlgorithm: "Select Algorithm",
      runAlgorithm: "Run Algorithm",
      pleaseSetStart: "Please set start node first!",
      pleaseSetEnd: "Please set end node first!",
      noPathFound: "No path found!",
      pathFound: "Path found! Distance:",
      nodesVisited: "Nodes visited:",
    },

    // Graph Canvas
    graphCanvas: {
      actions: "Actions",
      setStart: "Set Start",
      selectStartNode: "Select Start Node",
      setEnd: "Set End",
      selectEndNode: "Select End Node",
      start: "Start",
      end: "End",
      hideDetails: "Hide details",
      showDetails: "Show details",
    },

    // Step Explanation
    stepExplanation: {
      title: "Step Details",
      noStepsAvailable: "No steps available",
      step: "Step",
      description: "Description",
      visited: "Visited",
      queue: "Queue",
      stack: "Stack",
      distance: "Distance",
      current: "Current",
    },

    // Theme
    theme: {
      darkMode: "Dark mode",
      lightMode: "Light mode",
    },

    // Language
    language: {
      language: "Language",
      english: "English",
      indonesian: "Bahasa Indonesia",
    },
  },

  id: {
    // Header
    header: {
      title: "AlgoVision",
      subtitle: "Platform Visualisasi Algoritma Interaktif",
    },

    // Algorithm Selector
    algorithmSelector: {
      label: "Algoritma",
      dijkstra: "Algoritma Dijkstra",
      astar: "Algoritma A*",
      bfs: "Pencarian Luas Pertama",
      dfs: "Pencarian Mendalam Pertama",
    },

    // Complexity Panel
    complexityPanel: {
      title: "Analisis Kompleksitas",
      timeComplexity: "Kompleksitas Waktu",
      spaceComplexity: "Kompleksitas Ruang",
    },

    // Theory Section
    theorySection: {
      title: "Teori Algoritma",
      useCase: "Kasus Penggunaan",
      howItWorks: "Cara Kerjanya",
      advantages: "Keuntungan",
      disadvantages: "Kerugian",
    },

    // Control Panel
    control: {
      playback: "Pemutaran",
      play: "Mainkan",
      pause: "Jeda",
      stepBackward: "Langkah mundur",
      stepForward: "Langkah maju",
      reset: "Atur Ulang",
      speed: "Kecepatan",
      speedMs: "ms",
      graph: "Grafik",
      loadSample: "Muat Sampel",
      clear: "Bersihkan Grafik",
      addNode: "Tambah Node (klik canvas)",
      removeNode: "Hapus Node",
    },

    // Sidebar
    sidebar: {
      title: "Kontrol",
      selectAlgorithm: "Pilih Algoritma",
      runAlgorithm: "Jalankan Algoritma",
      pleaseSetStart: "Silakan atur node awal terlebih dahulu!",
      pleaseSetEnd: "Silakan atur node akhir terlebih dahulu!",
      noPathFound: "Jalur tidak ditemukan!",
      pathFound: "Jalur ditemukan! Jarak:",
      nodesVisited: "Node yang dikunjungi:",
    },

    // Graph Canvas
    graphCanvas: {
      actions: "Aksi",
      setStart: "Atur Awal",
      selectStartNode: "Pilih Node Awal",
      setEnd: "Atur Akhir",
      selectEndNode: "Pilih Node Akhir",
      start: "Awal",
      end: "Akhir",
      hideDetails: "Sembunyikan detail",
      showDetails: "Tampilkan detail",
    },

    // Step Explanation
    stepExplanation: {
      title: "Detail Langkah",
      noStepsAvailable: "Tidak ada langkah yang tersedia",
      step: "Langkah",
      description: "Deskripsi",
      visited: "Dikunjungi",
      queue: "Antrian",
      stack: "Tumpukan",
      distance: "Jarak",
      current: "Saat Ini",
    },

    // Theme
    theme: {
      darkMode: "Mode gelap",
      lightMode: "Mode terang",
    },

    // Language
    language: {
      language: "Bahasa",
      english: "English",
      indonesian: "Bahasa Indonesia",
    },
  },
};

/**
 * Get translation for a specific key
 * Example: t("header.title", language)
 */
export function getTranslation(key: string, language: Language): string {
  const keys = key.split(".");
  let result: any = translations[language];

  for (const k of keys) {
    if (result && typeof result === "object" && k in result) {
      result = result[k];
    } else {
      console.warn(`Translation key not found: ${key} for language ${language}`);
      return key;
    }
  }

  return typeof result === "string" ? result : key;
}
