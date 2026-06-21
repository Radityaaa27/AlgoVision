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

    // Algorithm Step Explanations
    stepMessages: {
      dijkstraInit: "Dijkstra assumes nothing is reachable until proven otherwise, except the source, which costs nothing to reach.",
      dijkstraVisit: "Dijkstra always expands the unvisited node with the smallest tentative distance. Because all edge weights are non-negative, no shorter route to it can appear later.",
      dijkstraRelax: "This edge offers a path shorter than the currently recorded distance.",
      dijkstraFinalize: "Once the target is pulled from the frontier with a finalized minimum distance, no shorter path can exist.",
      dijkstraUnreachable: "Every remaining node is disconnected from the source given the current graph and edge weights.",
      
      bfsInit: "BFS starts at the source and explores in FIFO order. All distances are initialized to infinity except the source.",
      bfsDequeue: "Dequeue the first node in the queue and explore all its unvisited neighbors.",
      bfsEnqueue: "Add unvisited neighbors to the queue at distance 1 more than the parent.",
      bfsFinalize: "All nodes reachable from the source have been discovered at their shortest path distance.",
      
      dfsInit: "DFS uses a stack and explores as deep as possible before backtracking.",
      dfsVisit: "Visit the next unvisited neighbor recursively.",
      dfsBacktrack: "Backtrack because all neighbors have been visited.",
      dfsFinalize: "DFS traversal complete; all reachable nodes have been visited.",
      
      astarInit: "A* starts at the source with heuristic distance to the goal.",
      astarVisit: "Expand the node with the lowest f-score (cost + heuristic) in the open set.",
      astarRelax: "Check if neighbor has a better path through the current node.",
      astarFoundGoal: "Goal reached with optimal path under the heuristic.",
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

    // Algorithm Step Explanations
    stepMessages: {
      dijkstraInit: "Dijkstra menganggap tidak ada yang dapat dijangkau sampai terbukti sebaliknya, kecuali sumber, yang tidak ada biayanya untuk dijangkau.",
      dijkstraVisit: "Dijkstra selalu memperluas node yang tidak dikunjungi dengan jarak tentatif terkecil. Karena semua bobot tepi non-negatif, tidak ada rute yang lebih pendek ke sana yang dapat muncul nanti.",
      dijkstraRelax: "Tepi ini menawarkan jalur yang lebih pendek daripada jarak yang saat ini dicatat.",
      dijkstraFinalize: "Setelah target ditarik dari frontier dengan jarak minimum yang ditentukan, tidak ada jalur yang lebih pendek yang dapat ada.",
      dijkstraUnreachable: "Setiap node yang tersisa terputus dari sumber yang diberikan grafik saat ini dan bobot tepi.",
      
      bfsInit: "BFS dimulai dari sumber dan menjelajahi dalam urutan FIFO. Semua jarak diinisialisasi ke tak terbatas kecuali sumber.",
      bfsDequeue: "Hapus node pertama dari antrian dan jelajahi semua tetangga yang tidak dikunjungi.",
      bfsEnqueue: "Tambahkan tetangga yang tidak dikunjungi ke antrian pada jarak 1 lebih dari induk.",
      bfsFinalize: "Semua node yang dapat dijangkau dari sumber telah ditemukan pada jarak jalur terpendek mereka.",
      
      dfsInit: "DFS menggunakan tumpukan dan menjelajahi sedalam mungkin sebelum kembali.",
      dfsVisit: "Kunjungi tetangga yang tidak dikunjungi berikutnya secara rekursif.",
      dfsBacktrack: "Kembali karena semua tetangga telah dikunjungi.",
      dfsFinalize: "Traversal DFS selesai; semua node yang dapat dijangkau telah dikunjungi.",
      
      astarInit: "A* dimulai di sumber dengan jarak heuristik ke tujuan.",
      astarVisit: "Perluas node dengan f-score terendah (biaya + heuristik) dalam set terbuka.",
      astarRelax: "Periksa apakah tetangga memiliki jalur yang lebih baik melalui node saat ini.",
      astarFoundGoal: "Tujuan tercapai dengan jalur optimal di bawah heuristik.",
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

/**
 * Translate algorithm step explanations based on step content
 * Maps English explanations to translated versions
 */
export function translateStepExplanation(text: string, language: Language): string {
  if (language === "en") return text;
  
  const messageMap: Record<string, string> = {
    "Dijkstra assumes nothing is reachable until proven otherwise, except the source, which costs nothing to reach.":
      getTranslation("stepMessages.dijkstraInit", language),
    "Dijkstra always expands the unvisited node with the smallest tentative distance. Because all edge weights are non-negative, no shorter route to it can appear later.":
      getTranslation("stepMessages.dijkstraVisit", language),
    "This edge offers a path shorter than the currently recorded distance.":
      getTranslation("stepMessages.dijkstraRelax", language),
    "Once the target is pulled from the frontier with a finalized minimum distance, no shorter path can exist.":
      getTranslation("stepMessages.dijkstraFinalize", language),
    "Every remaining node is disconnected from the source given the current graph and edge weights.":
      getTranslation("stepMessages.dijkstraUnreachable", language),
    "BFS starts at the source and explores in FIFO order. All distances are initialized to infinity except the source.":
      getTranslation("stepMessages.bfsInit", language),
    "Dequeue the first node in the queue and explore all its unvisited neighbors.":
      getTranslation("stepMessages.bfsDequeue", language),
    "Add unvisited neighbors to the queue at distance 1 more than the parent.":
      getTranslation("stepMessages.bfsEnqueue", language),
    "All nodes reachable from the source have been discovered at their shortest path distance.":
      getTranslation("stepMessages.bfsFinalize", language),
    "DFS uses a stack and explores as deep as possible before backtracking.":
      getTranslation("stepMessages.dfsInit", language),
    "Visit the next unvisited neighbor recursively.":
      getTranslation("stepMessages.dfsVisit", language),
    "Backtrack because all neighbors have been visited.":
      getTranslation("stepMessages.dfsBacktrack", language),
    "DFS traversal complete; all reachable nodes have been visited.":
      getTranslation("stepMessages.dfsFinalize", language),
    "A* starts at the source with heuristic distance to the goal.":
      getTranslation("stepMessages.astarInit", language),
    "Expand the node with the lowest f-score (cost + heuristic) in the open set.":
      getTranslation("stepMessages.astarVisit", language),
    "Check if neighbor has a better path through the current node.":
      getTranslation("stepMessages.astarRelax", language),
    "Goal reached with optimal path under the heuristic.":
      getTranslation("stepMessages.astarFoundGoal", language),
  };

  // Try exact match first
  if (messageMap[text]) {
    return messageMap[text];
  }

  // Try partial match for messages with variable content (like node names)
  for (const [en, id] of Object.entries(messageMap)) {
    // Check if the start of the text matches (for messages with variable node names)
    if (text.startsWith(en.substring(0, 50))) {
      // Extract the common part and the variable part
      const commonEnd = en.length > 50 ? 50 : en.length;
      const variablePart = text.substring(commonEnd);
      return id + variablePart;
    }
  }

  return text;
}
