export interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  weight: number;
}

export type StepType =
  | "init"
  | "visit"
  | "relax"
  | "skip"
  | "enqueue"
  | "path"
  | "done"
  | "unreachable";

export interface AlgoStep {
  index: number;
  type: StepType;
  current: string | null;
  visited: string[];
  frontier: string[];
  distances?: Record<string, number>;
  fScores?: Record<string, number>;
  activeEdge?: string | null;
  path?: string[];
  title: string;
  why: string;
  next: string;
}

export interface AdjEntry {
  to: string;
  weight: number;
  edgeId: string;
}

export function buildAdjacency(
  nodes: GraphNode[],
  edges: GraphEdge[]
): Record<string, AdjEntry[]> {
  const adj: Record<string, AdjEntry[]> = {};
  nodes.forEach((n) => (adj[n.id] = []));
  edges.forEach((e) => {
    if (!adj[e.source] || !adj[e.target]) return;
    adj[e.source].push({ to: e.target, weight: e.weight, edgeId: e.id });
    adj[e.target].push({ to: e.source, weight: e.weight, edgeId: e.id });
  });
  return adj;
}

export function fmt(n: number): string {
  if (!Number.isFinite(n)) return "∞";
  return Number.isInteger(n) ? `${n}` : n.toFixed(1);
}

export function findEdgeId(
  edges: GraphEdge[],
  a: string,
  b: string
): string | null {
  const e = edges.find(
    (e) => (e.source === a && e.target === b) || (e.source === b && e.target === a)
  );
  return e ? e.id : null;
}

export function reconstructPath(
  prev: Record<string, string | null>,
  endId: string
): string[] {
  const path: string[] = [];
  let cur: string | null = endId;
  const guard = new Set<string>();
  while (cur !== null && !guard.has(cur)) {
    path.unshift(cur);
    guard.add(cur);
    cur = prev[cur] ?? null;
  }
  return path;
}

export function euclidean(a: GraphNode, b: GraphNode): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}