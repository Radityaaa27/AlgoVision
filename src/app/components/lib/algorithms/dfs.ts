import { AlgoStep, GraphEdge, GraphNode, buildAdjacency, reconstructPath } from "./types";

export function runDFS(
  nodes: GraphNode[],
  edges: GraphEdge[],
  startId: string,
  endId: string
): AlgoStep[] {
  const steps: AlgoStep[] = [];
  const adj = buildAdjacency(nodes, edges);
  const labelOf = (id: string) => nodes.find((n) => n.id === id)?.label ?? id;

  const visited = new Set<string>();
  const stack: string[] = [startId];
  const prev: Record<string, string | null> = {};
  nodes.forEach((n) => (prev[n.id] = null));

  let idx = 0;
  const push = (partial: Partial<AlgoStep>) => {
    steps.push({
      index: idx++,
      type: "init",
      current: null,
      visited: Array.from(visited),
      frontier: [...stack],
      title: "",
      why: "",
      next: "",
      ...partial,
    });
  };

  push({
    type: "init",
    title: `Push the source ${labelOf(startId)} onto the stack.`,
    why: "DFS commits to a single path as deep as possible before backtracking, using a stack (LIFO) instead of BFS's queue.",
    next: "Pop the top of the stack and visit it if unvisited.",
  });

  let found = false;
  while (stack.length > 0) {
    const u = stack.pop()!;
    if (visited.has(u)) {
      push({
        type: "skip",
        current: u,
        title: `${labelOf(u)} already visited — pop and discard.`,
        why: "The same node can be pushed onto the stack more than once before it's visited; duplicates are skipped.",
        next: "Pop the next item on the stack.",
      });
      continue;
    }
    visited.add(u);
    push({
      type: "visit",
      current: u,
      title: `Visit ${labelOf(u)}.`,
      why: "DFS dives into the most recently discovered node first, exploring one branch fully before returning to explore others.",
      next: `Push the unvisited neighbors of ${labelOf(u)}.`,
    });

    if (u === endId) {
      found = true;
      const path = reconstructPath(prev, endId);
      push({
        type: "path",
        current: u,
        path,
        title: `Target ${labelOf(endId)} found.`,
        why: "DFS guarantees a path exists once the target is visited, but not that it's the shortest one — only BFS and weighted search guarantee that.",
        next: "Walk the parent pointers backward to recover the path taken.",
      });
      break;
    }

    const neighbors = adj[u] ?? [];
    for (const { to, edgeId } of neighbors) {
      if (!visited.has(to)) {
        prev[to] = prev[to] ?? u;
        stack.push(to);
        push({
          type: "enqueue",
          current: u,
          activeEdge: edgeId,
          title: `Push ${labelOf(to)} onto the stack.`,
          why: "Pushing a neighbor doesn't visit it yet — it will only be explored once it reaches the top of the stack.",
          next: "Continue checking the remaining neighbors.",
        });
      }
    }
  }

  if (!found) {
    push({
      type: "unreachable",
      title: "Stack emptied without reaching the target.",
      why: "Every node reachable from the source has been visited and the target was never among them.",
      next: "Algorithm terminates — the target is unreachable.",
    });
  }

  return steps;
}