import { Language } from "./store/translations";

type TheoryData = { overview: string; time: string; space: string; best: string; worst: string; use: string[] };

const theoryEN: Record<string, TheoryData> = {
  bfs: {
    overview:
      "Breadth-First Search explores nodes layer by layer using a queue (FIFO). It processes all neighbors before moving deeper.",
    time: "O(V + E)",
    space: "O(V)",
    best: "Finds shortest path in unweighted graphs in linear time.",
    worst: "If graph is dense or all nodes are neighbors, queue can become very large.",
    use: [
      "Shortest path in unweighted graphs",
      "Maze solving (all moves cost 1)",
      "Social network analysis (degrees of separation)",
      "Web crawler level exploration",
    ],
  },
  dfs: {
    overview:
      "Depth-First Search commits to one path as deep as possible before backtracking, using a stack (LIFO).",
    time: "O(V + E)",
    space: "O(V) for recursion depth or explicit stack",
    best: "Very space-efficient for wide graphs; good for topological sort and cycle detection.",
    worst: "May explore a single long branch fully before finding the goal; can be slower on sparse goal graphs.",
    use: [
      "Topological sorting (DAG ordering)",
      "Cycle detection",
      "Strongly connected components (Tarjan, Kosaraju)",
      "Puzzle solving (N-queens, Sudoku)",
    ],
  },
  dijkstra: {
    overview:
      "Dijkstra's algorithm finds the shortest path in weighted graphs by always selecting the unvisited node with the smallest distance.",
    time: "O((V + E) log V) with binary heap; O(V²) with array",
    space: "O(V)",
    best: "Guaranteed shortest path in graphs with non-negative weights; efficient with good priority queue implementation.",
    worst: "If all edges have weight 1, BFS is faster. Fails with negative weights.",
    use: [
      "GPS/navigation systems (shortest driving route)",
      "Network routing protocols (OSPF)",
      "Robot pathfinding on weighted terrain",
      "Game AI (cost-aware shortest path)",
    ],
  },
  astar: {
    overview:
      "A* combines Dijkstra's greedy distance with a heuristic estimate to the goal, exploring smarter than pure Dijkstra.",
    time: "O((V + E) log V) best case with good heuristic; worst case O(V²) if heuristic is poor",
    space: "O(V) for open and closed sets",
    best: "Highly efficient when a good admissible heuristic exists (e.g., Euclidean distance).",
    worst: "If heuristic is terrible (always 0), it degrades to Dijkstra. If heuristic is inadmissible, optimality is lost.",
    use: [
      "Video game pathfinding (best for single queries)",
      "Puzzle solving (15-puzzle, Rubik's cube state space)",
      "Robot motion planning with position heuristics",
      "Resource-constrained search (find goal quickly)",
    ],
  },
};

const theoryID: Record<string, TheoryData> = {
  bfs: {
    overview:
      "Pencarian Luas Pertama menjelajahi node layer demi layer menggunakan antrian (FIFO). Ini memproses semua tetangga sebelum bergerak lebih dalam.",
    time: "O(V + E)",
    space: "O(V)",
    best: "Menemukan jalur terpendek di grafik yang tidak berbobot dalam waktu linier.",
    worst: "Jika grafik padat atau semua node adalah tetangga, antrian bisa menjadi sangat besar.",
    use: [
      "Jalur terpendek di grafik yang tidak berbobot",
      "Pemecahan labirin (semua gerakan biaya 1)",
      "Analisis jaringan sosial (derajat pemisahan)",
      "Eksplorasi level web crawler",
    ],
  },
  dfs: {
    overview:
      "Pencarian Mendalam Pertama berkomitmen pada satu jalur sedalam mungkin sebelum kembali, menggunakan tumpukan (LIFO).",
    time: "O(V + E)",
    space: "O(V) untuk kedalaman rekursi atau tumpukan eksplisit",
    best: "Sangat efisien ruang untuk grafik yang lebar; baik untuk pengurutan topologis dan deteksi siklus.",
    worst: "Mungkin menjelajahi satu cabang panjang sepenuhnya sebelum menemukan tujuan; bisa lebih lambat pada grafik tujuan jarang.",
    use: [
      "Pengurutan topologis (pengurutan DAG)",
      "Deteksi siklus",
      "Komponen yang terhubung kuat (Tarjan, Kosaraju)",
      "Pemecahan teka-teki (N-queens, Sudoku)",
    ],
  },
  dijkstra: {
    overview:
      "Algoritma Dijkstra menemukan jalur terpendek di grafik berbobot dengan selalu memilih node yang tidak dikunjungi dengan jarak terkecil.",
    time: "O((V + E) log V) dengan binary heap; O(V²) dengan array",
    space: "O(V)",
    best: "Jalur terpendek yang dijamin di grafik dengan bobot non-negatif; efisien dengan implementasi priority queue yang baik.",
    worst: "Jika semua tepi memiliki berat 1, BFS lebih cepat. Gagal dengan bobot negatif.",
    use: [
      "Sistem GPS/navigasi (rute berkendara terpendek)",
      "Protokol routing jaringan (OSPF)",
      "Pathfinding robot di medan berbobot",
      "AI game (pencarian jalur terpendek yang menyadari biaya)",
    ],
  },
  astar: {
    overview:
      "A* menggabungkan jarak greedy Dijkstra dengan perkiraan heuristik ke tujuan, menjelajahi lebih cerdas dari Dijkstra murni.",
    time: "O((V + E) log V) kasus terbaik dengan heuristik yang baik; kasus terburuk O(V²) jika heuristik buruk",
    space: "O(V) untuk set terbuka dan tertutup",
    best: "Sangat efisien ketika heuristik yang dapat diterima ada (mis., jarak Euclidean).",
    worst: "Jika heuristik mengerikan (selalu 0), ini merosot menjadi Dijkstra. Jika heuristik tidak dapat diterima, optimalitas hilang.",
    use: [
      "Pathfinding game video (terbaik untuk kueri tunggal)",
      "Pemecahan teka-teki (15-puzzle, ruang keadaan Rubik's cube)",
      "Perencanaan gerakan robot dengan heuristik posisi",
      "Pencarian yang dibatasi sumber daya (temukan tujuan dengan cepat)",
    ],
  },
};

export const theory: Record<Language, Record<string, TheoryData>> = {
  en: theoryEN,
  id: theoryID,
};

export const complexity: Record<string, { time: string; space: string }> = {
  bfs: { time: "O(V + E)", space: "O(V)" },
  dfs: { time: "O(V + E)", space: "O(V)" },
  dijkstra: { time: "O((V + E) log V)", space: "O(V)" },
  astar: { time: "O((V + E) log V) *", space: "O(V)" },
};
