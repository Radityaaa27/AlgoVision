import {
  AlgoStep,
  GraphEdge,
  GraphNode,
  buildAdjacency,
  euclidean,
  fmt,
  reconstructPath,
  findEdgeId,
} from "./types";

export function runAStar(
  nodes: GraphNode[],
  edges: GraphEdge[],
  startId: string,
  endId: string
): AlgoStep[] {
  const steps: AlgoStep[] = [];
  const adj = buildAdjacency(nodes, edges);
  const labelOf = (id: string) => nodes.find((n) => n.id === id)?.label ?? id;
  const getNode = (id: string) => nodes.find((n) => n.id === id)!;

  const gScore: Record<string, number> = {};
  const fScore: Record<string, number> = {};
  const prev: Record<string, string | null> = {};
  const closed = new Set<string>();
  const open = new Set<string>([startId]);
  const heur = (id: string) => euclidean(getNode(id), getNode(endId));

  nodes.forEach((n) => {
    gScore[n.id] = Infinity;
    fScore[n.id] = Infinity;
    prev[n.id] = null;
  });
  gScore[startId] = 0;
  fScore[startId] = heur(startId);

  let idx = 0;
  const push = (partial: Omit<Partial<AlgoStep>, "distances" | "fScores">) => {
    steps.push({
      index: idx++,
      type: "init",
      current: null,
      visited: Array.from(closed),
      frontier: Array.from(open),
      distances: { ...gScore },
      fScores: { ...fScore },
      title: "",
      why: "",
      next: "",
      ...partial,
    });
  };

  push({
    type: "init",
    title: `A* Search: start from ${labelOf(startId)}, goal is ${labelOf(endId)}.`,
    why: "A* combines Dijkstra's greedy distance tracking with a heuristic estimate to reach the goal faster.",
    next: "Select the open node with lowest f-score.",
  });

  let found = false;
  while (open.size > 0) {
    let lowest: string | null = null;
    let lowestF = Infinity;
    for (const u of open) {
      if (fScore[u] < lowestF) {
        lowestF = fScore[u];
        lowest = u;
      }
    }

    if (!lowest) break;
    const u = lowest;

    push({
      type: "visit",
      current: u,
      title: `Pop ${labelOf(u)} (f=${fmt(fScore[u])}) from open set.`,
      why: `f(${labelOf(u)}) = g + h = ${fmt(gScore[u])} + ${fmt(heur(u))}. This is the node most promising toward the goal.`,
      next: u === endId ? `Goal found!` : `Check neighbors of ${labelOf(u)}.`,
    });

    if (u === endId) {
      found = true;
      const path = reconstructPath(prev, endId);
      push({
        type: "path",
        title: `Goal reached! Path: ${path.map(labelOf).join(" → ")}`,
        why: "Backtrack through parent pointers to build the path.",
        next: "Done.",
        path,
      });
      break;
    }

    open.delete(u);
    closed.add(u);

    for (const { to: v, weight: w } of adj[u]) {
      if (closed.has(v)) {
        push({
          type: "skip",
          current: u,
          activeEdge: findEdgeId(edges, u, v),
          title: `${labelOf(v)} already in closed set; skip.`,
          why: "We've already found the best path to this node.",
          next: `Check next neighbor of ${labelOf(u)}.`,
        });
        continue;
      }

      const tentG = gScore[u] + w;
      if (tentG < gScore[v]) {
        prev[v] = u;
        gScore[v] = tentG;
        fScore[v] = gScore[v] + heur(v);
        if (!open.has(v)) {
          open.add(v);
          push({
            type: "enqueue",
            current: u,
            activeEdge: findEdgeId(edges, u, v),
            title: `Relax: ${labelOf(v)} now g=${fmt(gScore[v])}, f=${fmt(fScore[v])}. Add to open.`,
            why: `Tentative distance via ${labelOf(u)} is better. Include ${labelOf(v)} in open set for later exploration.`,
            next: `Check next neighbor of ${labelOf(u)}.`,
          });
        } else {
          push({
            type: "relax",
            current: u,
            activeEdge: findEdgeId(edges, u, v),
            title: `Update: ${labelOf(v)} g=${fmt(gScore[v])}, f=${fmt(fScore[v])}.`,
            why: `Better path found to ${labelOf(v)} through ${labelOf(u)}. Update its scores.`,
            next: `Check next neighbor of ${labelOf(u)}.`,
          });
        }
      } else {
        push({
          type: "skip",
          current: u,
          activeEdge: findEdgeId(edges, u, v),
          title: `${labelOf(v)}: tentative g=${fmt(tentG)} ≥ current g=${fmt(gScore[v])}; skip.`,
          why: "No improvement; keep the existing best path to this node.",
          next: `Check next neighbor of ${labelOf(u)}.`,
        });
      }
    }
  }

  if (!found) {
    push({
      type: "unreachable",
      title: `Goal ${labelOf(endId)} is unreachable from ${labelOf(startId)}.`,
      why: "The open set became empty; no path exists.",
      next: "Done.",
    });
  }

  return steps;
}
