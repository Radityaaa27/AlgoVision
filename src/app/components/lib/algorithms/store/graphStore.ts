import { create } from "zustand";
import { AlgoStep, GraphEdge, GraphNode } from "../types";
import { AlgorithmId, algorithms } from "../index";
import { defaultEdges, defaultEndId, defaultNodes, defaultStartId } from "./data/defaultGraph";

const LABELS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function nextLabel(existing: GraphNode[]): string {
  for (const ch of LABELS) {
    if (!existing.some((n) => n.label === ch)) return ch;
  }
  return `N${existing.length + 1}`;
}

interface GraphState {
  nodes: GraphNode[];
  edges: GraphEdge[];
  startId: string | null;
  endId: string | null;
  algorithmId: AlgorithmId;
  steps: AlgoStep[];
  stepIndex: number;
  isPlaying: boolean;
  speedMs: number;
  theme: "dark" | "light";
  selectedNodeId: string | null;
  selectedEdgeId: string | null;
  pendingAssign: "start" | "end" | null;

  setAlgorithm: (id: AlgorithmId) => void;
  addNode: (x: number, y: number) => void;
  removeNode: (id: string) => void;
  moveNode: (id: string, x: number, y: number) => void;
  addEdge: (source: string, target: string) => void;
  removeEdge: (id: string) => void;
  updateEdgeWeight: (id: string, weight: number) => void;
  setStart: (id: string) => void;
  setEnd: (id: string) => void;
  selectNode: (id: string | null) => void;
  selectEdge: (id: string | null) => void;
  setPendingAssign: (mode: "start" | "end" | null) => void;

  play: () => void;
  pause: () => void;
  reset: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  goToStep: (index: number) => void;
  setSpeed: (ms: number) => void;
  toggleTheme: () => void;
  loadSampleGraph: () => void;
  clearGraph: () => void;
}

function recompute(nodes: GraphNode[], edges: GraphEdge[], startId: string | null, endId: string | null, algorithmId: AlgorithmId): AlgoStep[] {
  if (!startId || !endId) return [];
  if (!nodes.some((n) => n.id === startId) || !nodes.some((n) => n.id === endId)) return [];
  try {
    return algorithms[algorithmId].run(nodes, edges, startId, endId);
  } catch {
    return [];
  }
}

export const useGraphStore = create<GraphState>((set) => ({
  nodes: defaultNodes,
  edges: defaultEdges,
  startId: defaultStartId,
  endId: defaultEndId,
  algorithmId: "dijkstra",
  steps: recompute(defaultNodes, defaultEdges, defaultStartId, defaultEndId, "dijkstra"),
  stepIndex: 0,
  isPlaying: false,
  speedMs: 900,
  theme: "dark",
  selectedNodeId: null,
  selectedEdgeId: null,
  pendingAssign: null,

  setAlgorithm: (id) =>
    set((s) => ({
      algorithmId: id,
      stepIndex: 0,
      isPlaying: false,
      steps: recompute(s.nodes, s.edges, s.startId, s.endId, id),
    })),

  addNode: (x, y) =>
    set((s) => {
      const label = nextLabel(s.nodes);
      const node: GraphNode = { id: label, label, x, y };
      const nodes = [...s.nodes, node];
      return {
        nodes,
        steps: recompute(nodes, s.edges, s.startId, s.endId, s.algorithmId),
        stepIndex: 0,
        isPlaying: false,
      };
    }),

  removeNode: (id) =>
    set((s) => {
      const nodes = s.nodes.filter((n) => n.id !== id);
      const edges = s.edges.filter((e) => e.source !== id && e.target !== id);
      const startId = s.startId === id ? null : s.startId;
      const endId = s.endId === id ? null : s.endId;
      return {
        nodes,
        edges,
        startId,
        endId,
        steps: recompute(nodes, edges, startId, endId, s.algorithmId),
        stepIndex: 0,
        isPlaying: false,
        selectedNodeId: null,
      };
    }),

  moveNode: (id, x, y) =>
    set((s) => {
      const nodes = s.nodes.map((n) => (n.id === id ? { ...n, x, y } : n));
      return { nodes, steps: recompute(nodes, s.edges, s.startId, s.endId, s.algorithmId) };
    }),

  addEdge: (source, target) =>
    set((s) => {
      if (source === target) return {};
      const exists = s.edges.some(
        (e) => (e.source === source && e.target === target) || (e.source === target && e.target === source)
      );
      if (exists) return {};
      const id = `e-${source}-${target}-${Date.now()}`;
      const edges = [...s.edges, { id, source, target, weight: 1 }];
      return {
        edges,
        steps: recompute(s.nodes, edges, s.startId, s.endId, s.algorithmId),
        stepIndex: 0,
        isPlaying: false,
      };
    }),

  removeEdge: (id) =>
    set((s) => {
      const edges = s.edges.filter((e) => e.id !== id);
      return {
        edges,
        steps: recompute(s.nodes, edges, s.startId, s.endId, s.algorithmId),
        stepIndex: 0,
        isPlaying: false,
        selectedEdgeId: null,
      };
    }),

  updateEdgeWeight: (id, weight) =>
    set((s) => {
      const w = Number.isFinite(weight) && weight > 0 ? weight : 1;
      const edges = s.edges.map((e) => (e.id === id ? { ...e, weight: w } : e));
      return {
        edges,
        steps: recompute(s.nodes, edges, s.startId, s.endId, s.algorithmId),
        stepIndex: 0,
        isPlaying: false,
      };
    }),

  setStart: (id) =>
    set((s) => ({
      startId: id,
      steps: recompute(s.nodes, s.edges, id, s.endId, s.algorithmId),
      stepIndex: 0,
      isPlaying: false,
      pendingAssign: null,
    })),

  setEnd: (id) =>
    set((s) => ({
      endId: id,
      steps: recompute(s.nodes, s.edges, s.startId, id, s.algorithmId),
      stepIndex: 0,
      isPlaying: false,
      pendingAssign: null,
    })),

  selectNode: (id) => set({ selectedNodeId: id, selectedEdgeId: null }),
  selectEdge: (id) => set({ selectedEdgeId: id, selectedNodeId: null }),
  setPendingAssign: (mode) => set({ pendingAssign: mode }),

  play: () =>
    set((s) => ({
      isPlaying: s.stepIndex < s.steps.length - 1 ? true : false,
    })),
  pause: () => set({ isPlaying: false }),
  reset: () => set({ stepIndex: 0, isPlaying: false }),
  stepForward: () =>
    set((s) => {
      const next = Math.min(s.stepIndex + 1, Math.max(s.steps.length - 1, 0));
      return { stepIndex: next, isPlaying: next < s.steps.length - 1 ? s.isPlaying : false };
    }),
  stepBackward: () => set((s) => ({ stepIndex: Math.max(s.stepIndex - 1, 0), isPlaying: false })),
  goToStep: (index) => set((s) => ({ stepIndex: Math.min(Math.max(index, 0), Math.max(s.steps.length - 1, 0)) })),
  setSpeed: (ms) => set({ speedMs: ms }),
  toggleTheme: () => set((s) => ({ theme: s.theme === "dark" ? "light" : "dark" })),

  loadSampleGraph: () =>
    set((s) => ({
      nodes: defaultNodes,
      edges: defaultEdges,
      startId: defaultStartId,
      endId: defaultEndId,
      steps: recompute(defaultNodes, defaultEdges, defaultStartId, defaultEndId, s.algorithmId),
      stepIndex: 0,
      isPlaying: false,
    })),

  clearGraph: () =>
    set(() => ({
      nodes: [],
      edges: [],
      startId: null,
      endId: null,
      steps: [],
      stepIndex: 0,
      isPlaying: false,
    })),
}));