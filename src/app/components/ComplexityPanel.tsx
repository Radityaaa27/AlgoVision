export interface ComplexityInfo {
  best: string;
  average: string;
  worst: string;
  space: string;
}

export interface TheoryInfo {
  definition: string;
  useCases: string[];
  advantages: string[];
  disadvantages: string[];
  realWorld: string[];
}

export const complexity: Record<string, ComplexityInfo> = {
  dijkstra: {
    best: "O(E + V log V)",
    average: "O(E log V)",
    worst: "O(E log V)",
    space: "O(V)",
  },
  astar: {
    best: "O(E)",
    average: "O(E log V)",
    worst: "O(b^d)",
    space: "O(V)",
  },
  bfs: {
    best: "O(V + E)",
    average: "O(V + E)",
    worst: "O(V + E)",
    space: "O(V)",
  },
  dfs: {
    best: "O(V + E)",
    average: "O(V + E)",
    worst: "O(V + E)",
    space: "O(V)",
  },
};

export const theory: Record<string, TheoryInfo> = {
  dijkstra: {
    definition:
      "A greedy shortest-path algorithm that repeatedly finalizes the closest unvisited node and relaxes its outgoing edges, guaranteeing the shortest distance to every node from a single source — as long as no edge weight is negative.",
    useCases: [
      "Single-source shortest path on weighted graphs with non-negative weights",
      "Network routing protocols (e.g. OSPF link-state routing)",
      "Finding the cheapest sequence of connections in logistics or flight networks",
    ],
    advantages: [
      "Always finds the optimal shortest path for non-negative weights",
      "Works on both directed and undirected graphs",
      "Can stop early once the target is finalized",
    ],
    disadvantages: [
      "Breaks down with negative edge weights (use Bellman-Ford instead)",
      "Explores in every direction, even away from the target",
      "Naive implementations are O(V²); a binary heap is needed for O(E log V)",
    ],
    realWorld: [
      "GPS navigation and turn-by-turn routing engines",
      "Internet packet routing between routers",
      "Telecom and utility network design",
    ],
  },
  astar: {
    definition:
      "An informed search algorithm that extends Dijkstra by adding a heuristic estimate of the remaining distance to the goal, letting it prioritize promising nodes and usually reach the target while exploring far fewer nodes.",
    useCases: [
      "Pathfinding in video games and robotics",
      "Any shortest-path problem where a reasonable distance estimate to the goal exists",
      "Puzzle solving (e.g. the 15-puzzle, route planning)",
    ],
    advantages: [
      "Typically much faster than Dijkstra in practice",
      "Still optimal, provided the heuristic never overestimates (is admissible)",
      "Naturally biases the search toward the goal",
    ],
    disadvantages: [
      "Quality depends entirely on the heuristic; a bad one can perform worse than Dijkstra",
      "Extra memory needed to track g, h, and f scores per node",
      "Designing a good admissible heuristic isn't always straightforward",
    ],
    realWorld: [
      "Game NPC and unit pathfinding",
      "Ride-share and delivery route planning",
      "Robot motion planning",
    ],
  },
  bfs: {
    definition:
      "A level-by-level traversal that explores all neighbors of a node before moving deeper, using a FIFO queue. On an unweighted graph it guarantees the shortest path measured in number of edges.",
    useCases: [
      "Shortest path in unweighted or uniformly-weighted graphs",
      "Finding connected components",
      "Web crawling and social network 'degrees of separation'",
    ],
    advantages: [
      "Guarantees the fewest-edges path on unweighted graphs",
      "Simple to implement and reason about",
      "Naturally finds all nodes at a given distance from the source",
    ],
    disadvantages: [
      "Ignores edge weights entirely — not optimal on weighted graphs",
      "Can use more memory than DFS, since it holds an entire frontier level at once",
    ],
    realWorld: [
      "Finding the shortest number of connections between two people on a social graph",
      "Network broadcast and flood-fill algorithms",
      "Puzzle solvers where every move has equal cost",
    ],
  },
  dfs: {
    definition:
      "A traversal that commits to one path as deep as possible before backtracking, using a stack (explicit or via recursion). It does not guarantee shortest paths, but is excellent for exploring structure.",
    useCases: [
      "Topological sorting and cycle detection",
      "Maze generation and solving",
      "Finding connected components or strongly connected components",
    ],
    advantages: [
      "Lower memory footprint than BFS on wide graphs",
      "Naturally expresses recursive problems (backtracking, exhaustive search)",
      "Simple to implement with a stack or recursion",
    ],
    disadvantages: [
      "Does not guarantee the shortest path",
      "Can get very deep on large graphs (risk of stack overflow if recursive)",
    ],
    realWorld: [
      "Compilers resolving dependency order (topological sort)",
      "Solving mazes and puzzles",
      "Detecting cycles in build systems or package managers",
    ],
  },
};
