import {
  AlgoStep,
  GraphEdge,
  GraphNode,
  buildAdjacency,
  fmt,
  reconstructPath,
} from "./types";

export function runDijkstra(
  nodes: GraphNode[],
  edges: GraphEdge[],
  startId: string,
  endId: string
): AlgoStep[] {
  const steps: AlgoStep[] = [];
  const adj = buildAdjacency(nodes, edges);
  const labelOf = (id: string) => nodes.find((n) => n.id === id)?.label ?? id;

  const dist: Record<string, number> = {};
  const prev: Record<string, string | null> = {};
  const visited = new Set<string>();
  nodes.forEach((n) => {
    dist[n.id] = Infinity;
    prev[n.id] = null;
  });
  dist[startId] = 0;

  let idx = 0;
  const push = (partial: Omit<Partial<AlgoStep>, "distances">) => {
    steps.push({
      index: idx++,
      type: "init",
      current: null,
      visited: Array.from(visited),
      frontier: nodes
        .filter((n) => !visited.has(n.id) && Number.isFinite(dist[n.id]))
        .sort((a, b) => dist[a.id] - dist[b.id])
        .map((n) => n.id),
      distances: { ...dist },
      title: "",
      why: "",
      next: "",
      ...partial,
    });
  };

  push({
    type: "init",
    title: `Initialize: distance(${labelOf(startId)}) = 0, every other node = ∞.`,
    why: "Dijkstra assumes nothing is reachable until proven otherwise, except the source, which costs nothing to reach.",
    next: "Pick the unvisited node with the smallest tentative distance.",
  });

  while (true) {
    let u: string | null = null;
    let best = Infinity;
    nodes.forEach((n) => {
      if (!visited.has(n.id) && dist[n.id] < best) {
        best = dist[n.id];
        u = n.id;
      }
    });

    if (u === null) {
      push({
        type: "unreachable",
        title: "No unvisited node has a finite distance left.",
        why: "Every remaining node is disconnected from the source given the current graph and edge weights.",
        next: "Algorithm terminates — some nodes stay unreachable.",
      });
      break;
    }

    visited.add(u);
    push({
      type: "visit",
      current: u,
      title: `Node ${labelOf(u)} finalized at distance ${fmt(dist[u])}.`,
      why: "Dijkstra always expands the unvisited node with the smallest tentative distance. Because all edge weights are non-negative, no shorter route to it can appear later.",
      next: `Relax every edge leaving ${labelOf(u)}.`,
    });

    if (u === endId) {
      const path = reconstructPath(prev, endId);
      push({
        type: "path",
        current: u,
        path,
        title: `Target ${labelOf(endId)} finalized — shortest distance is ${fmt(dist[u])}.`,
        why: "Once the target is pulled from the frontier with a finalized minimum distance, no shorter path can exist.",
        next: "Walk the parent pointers backward from the target to the source to recover the path.",
      });
      break;
    }

    for (const { to, weight, edgeId } of adj[u] ?? []) {
      if (visited.has(to)) continue;
      const alt = dist[u] + weight;
      if (alt < dist[to]) {
        const old = dist[to];
        dist[to] = alt;
        prev[to] = u;
        push({
          type: "relax",
          current: u,
          activeEdge: edgeId,
          title: `Relax ${labelOf(to)}: ${fmt(old)} → ${fmt(alt)}.`,
          why: `Reaching ${labelOf(to)} through ${labelOf(u)} costs ${fmt(dist[u])} + ${fmt(weight)} = ${fmt(alt)}, which beats the previous best.`,
          next: "Continue checking the remaining neighbors.",
        });
      } else {
        push({
          type: "skip",
          current: u,
          activeEdge: edgeId,
          title: `Skip ${labelOf(to)}: ${fmt(dist[to])} is already ≤ ${fmt(dist[u] + weight)}.`,
          why: "Routing through the current node would not improve the existing tentative distance.",
          next: "Continue checking the remaining neighbors.",
        });
      }
    }
  }

  return steps;
}