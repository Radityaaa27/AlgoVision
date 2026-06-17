import { AlgoStep, GraphEdge, GraphNode, buildAdjacency, reconstructPath } from "./types";

export function runBFS(
  nodes: GraphNode[],
  edges: GraphEdge[],
  startId: string,
  endId: string
): AlgoStep[] {
  const steps: AlgoStep[] = [];
  const adj = buildAdjacency(nodes, edges);
  const labelOf = (id: string) => nodes.find((n) => n.id === id)?.label ?? id;

  const visited = new Set<string>([startId]);
  const queue: string[] = [startId];
  const prev: Record<string, string | null> = {};
  nodes.forEach((n) => (prev[n.id] = null));

  let idx = 0;
  const push = (partial: Partial<AlgoStep>) => {
    steps.push({
      index: idx++,
      type: "init",
      current: null,
      visited: Array.from(visited),
      frontier: [...queue],
      title: "",
      why: "",
      next: "",
      ...partial,
    });
  };

  push({
    type: "init",
    title: `Enqueue the source ${labelOf(startId)} and mark it visited.`,
    why: "BFS explores level by level, so the source is the only node at distance 0 when the search begins.",
    next: "Dequeue the front of the queue and visit it.",
  });

  let found = false;
  while (queue.length > 0) {
    const u = queue.shift()!;
    push({
      type: "visit",
      current: u,
      title: `Dequeue and visit ${labelOf(u)}.`,
      why: "BFS processes nodes in the exact order they were discovered (FIFO), which is what guarantees the shortest path in an unweighted graph.",
      next: `Enqueue any unvisited neighbors of ${labelOf(u)}.`,
    });

    if (u === endId) {
      found = true;
      const path = reconstructPath(prev, endId);
      push({
        type: "path",
        current: u,
        path,
        title: `Target ${labelOf(endId)} found after ${path.length - 1} hop(s).`,
        why: "The first time BFS reaches a node is guaranteed to be via the fewest possible edges.",
        next: "Walk the parent pointers backward to recover the path.",
      });
      break;
    }

    for (const { to, edgeId } of adj[u] ?? []) {
      if (!visited.has(to)) {
        visited.add(to);
        prev[to] = u;
        queue.push(to);
        push({
          type: "enqueue",
          current: u,
          activeEdge: edgeId,
          title: `Enqueue ${labelOf(to)} (discovered via ${labelOf(u)}).`,
          why: "Each unvisited neighbor is marked visited and queued the first time it's seen, so it's never processed twice.",
          next: "Continue checking the remaining neighbors.",
        });
      }
    }
  }

  if (!found) {
    push({
      type: "unreachable",
      title: "Queue emptied without reaching the target.",
      why: "Every node reachable from the source has been visited and the target was never among them.",
      next: "Algorithm terminates — the target is unreachable.",
    });
  }

  return steps;
}