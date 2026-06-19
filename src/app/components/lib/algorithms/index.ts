import { runAStar } from "./astar";
import { runBFS } from "./bfs";
import { runDFS } from "./dfs";
import { runDijkstra } from "./diijakstra";
import { complexity, theory } from "./theory";
import { AlgoStep, GraphEdge, GraphNode } from "./types";

export type AlgorithmId = "dijkstra" | "astar" | "bfs" | "dfs";

export interface AlgorithmDef {
  id: AlgorithmId;
  name: string;
  short: string;
  weighted: boolean;
  run: (nodes: GraphNode[], edges: GraphEdge[], startId: string, endId: string) => AlgoStep[];
}

export const algorithms: Record<AlgorithmId, AlgorithmDef> = {
  dijkstra: {
    id: "dijkstra",
    name: "Dijkstra's Algorithm",
    short: "Dijkstra",
    weighted: true,
    run: runDijkstra,
  },
  astar: {
    id: "astar",
    name: "A* Search",
    short: "A*",
    weighted: true,
    run: runAStar,
  },
  bfs: {
    id: "bfs",
    name: "Breadth First Search",
    short: "BFS",
    weighted: false,
    run: runBFS,
  },
  dfs: {
    id: "dfs",
    name: "Depth First Search",
    short: "DFS",
    weighted: false,
    run: runDFS,
  },
};

export { complexity, theory };
export * from "./types";