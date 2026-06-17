interface GraphNode { id: string; label: string; x: number; y: number; }

interface GraphEdge { id: string; source: string; target: string; weight: number; directed?: boolean; }