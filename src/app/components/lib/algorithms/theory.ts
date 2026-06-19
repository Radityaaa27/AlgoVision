export const theory: Record<string, { overview: string; time: string; space: string; best: string; worst: string; use: string[] }> = {
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

export const complexity: Record<string, { time: string; space: string }> = {
  bfs: { time: "O(V + E)", space: "O(V)" },
  dfs: { time: "O(V + E)", space: "O(V)" },
  dijkstra: { time: "O((V + E) log V)", space: "O(V)" },
  astar: { time: "O((V + E) log V) *", space: "O(V)" },
};
