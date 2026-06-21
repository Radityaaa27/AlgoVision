import { GraphEdge, GraphNode } from "../../types";

export const defaultNodes: GraphNode[] = [
  { id: "A", label: "A", x: 80, y: 220 },
  { id: "B", label: "B", x: 260, y: 80 },
  { id: "C", label: "C", x: 260, y: 360 },
  { id: "D", label: "D", x: 460, y: 80 },
  { id: "E", label: "E", x: 460, y: 220 },
  { id: "F", label: "F", x: 460, y: 360 },
  { id: "G", label: "G", x: 660, y: 220 },
];

export const defaultEdges: GraphEdge[] = [
  { id: "e-A-B", source: "A", target: "B", weight: 4 },
  { id: "e-A-C", source: "A", target: "C", weight: 2 },
  { id: "e-B-D", source: "B", target: "D", weight: 5 },
  { id: "e-B-E", source: "B", target: "E", weight: 1 },
  { id: "e-C-E", source: "C", target: "E", weight: 6 },
  { id: "e-C-F", source: "C", target: "F", weight: 3 },
  { id: "e-D-G", source: "D", target: "G", weight: 3 },
  { id: "e-E-G", source: "E", target: "G", weight: 4 },
  { id: "e-F-G", source: "F", target: "G", weight: 2 },
  { id: "e-E-F", source: "E", target: "F", weight: 2 },
];

export const defaultStartId = "A";
export const defaultEndId = "G";