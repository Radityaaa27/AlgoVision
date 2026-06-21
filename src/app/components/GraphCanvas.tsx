"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGraphStore } from "./lib/algorithms/store/graphStore";
import { StepExplanationPanel } from "./StepExplanationPanel";

/**
 * GraphCanvas Component
 * 
 * Main visualization panel featuring:
 * - HTML5 Canvas for graph rendering
 * - Interactive node placement (click to add)
 * - Drag-to-move node support
 * - Real-time algorithm visualization with color-coded states
 * - Collapsible right panel for step details and complexity
 */
export function GraphCanvas() {
  // ===== State from Zustand Store =====
  const nodes = useGraphStore((s) => s.nodes);
  const edges = useGraphStore((s) => s.edges);
  const addNode = useGraphStore((s) => s.addNode);
  const startId = useGraphStore((s) => s.startId);
  const endId = useGraphStore((s) => s.endId);
  const stepIndex = useGraphStore((s) => s.stepIndex);
  const steps = useGraphStore((s) => s.steps);
  const selectedNodeId = useGraphStore((s) => s.selectedNodeId);
  const selectNode = useGraphStore((s) => s.selectNode);
  const moveNode = useGraphStore((s) => s.moveNode);
  const theme = useGraphStore((s) => s.theme);
  const pendingAssign = useGraphStore((s) => s.pendingAssign);
  const setPendingAssign = useGraphStore((s) => s.setPendingAssign);
  const setStart = useGraphStore((s) => s.setStart);
  const setEnd = useGraphStore((s) => s.setEnd);

  // ===== Local State =====
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [showPanel, setShowPanel] = useState(true); // Toggle right panel visibility

  const currentStep = steps[stepIndex];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const bgColor = theme === "dark" ? "#000000" : "#ffffff";
    const gridColor = theme === "dark" ? "#1a1a1a" : "#f5f5f5";
    const textColor = theme === "dark" ? "#e4e4e7" : "#000000";
    const edgeColor = theme === "dark" ? "#52525b" : "#d4d4d8";

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Draw edges
    edges.forEach((edge) => {
      const source = nodes.find((n) => n.id === edge.source);
      const target = nodes.find((n) => n.id === edge.target);
      if (!source || !target) return;

      const isActive =
        currentStep?.activeEdge === edge.id ||
        currentStep?.visited?.includes(source.id) ||
        currentStep?.visited?.includes(target.id);

      ctx.strokeStyle = isActive ? "#3b82f6" : edgeColor;
      ctx.lineWidth = isActive ? 2.5 : 1.5;
      ctx.beginPath();
      ctx.moveTo(source.x, source.y);
      ctx.lineTo(target.x, target.y);
      ctx.stroke();

      // Edge weight
      const mx = (source.x + target.x) / 2;
      const my = (source.y + target.y) / 2;
      ctx.fillStyle = textColor;
      ctx.font = "12px monospace";
      ctx.textAlign = "center";
      ctx.fillText(`${edge.weight}`, mx, my - 8);
    });

    // Draw nodes
    nodes.forEach((node) => {
      const isStart = node.id === startId;
      const isEnd = node.id === endId;
      const isVisited = currentStep?.visited?.includes(node.id);
      const isFrontier = currentStep?.frontier?.includes(node.id);
      const isPath = currentStep?.path?.includes(node.id);

      let color: string;
      if (isStart) color = "#10b981";
      else if (isEnd) color = "#ef4444";
      else if (isPath) color = "#f59e0b";
      else if (isVisited) color = "#06b6d4";
      else if (isFrontier) color = "#8b5cf6";
      else color = theme === "dark" ? "#3f3f46" : "#e4e4e7";

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(node.x, node.y, 24, 0, Math.PI * 2);
      ctx.fill();

      // Highlight selected
      if (node.id === selectedNodeId) {
        ctx.strokeStyle = "#fbbf24";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 28, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Node label
      ctx.fillStyle = "white";
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(node.label, node.x, node.y);

      // Distance if available
      if (currentStep?.distances && node.id in currentStep.distances) {
        const dist = currentStep.distances[node.id];
        const distStr = dist === Infinity ? "∞" : String(dist);
        ctx.fillStyle = theme === "dark" ? "#a78bfa" : "#7c3aed";
        ctx.font = "11px monospace";
        ctx.fillText(distStr, node.x, node.y + 40);
      }
    });
  }, [nodes, edges, theme, selectedNodeId, currentStep, startId, endId]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicked on a node
    for (const node of nodes) {
      const dist = Math.hypot(node.x - x, node.y - y);
      if (dist < 24) {
        if (pendingAssign === "start") {
          setStart(node.id);
          return;
        }
        if (pendingAssign === "end") {
          setEnd(node.id);
          return;
        }
        selectNode(node.id);
        return;
      }
    }

    // Add new node
    if (!pendingAssign) {
      addNode(x, y);
    }
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (const node of nodes) {
      const dist = Math.hypot(node.x - x, node.y - y);
      if (dist < 24) {
        setDragging(node.id);
        return;
      }
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragging) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    moveNode(dragging, Math.max(30, Math.min(canvas.width - 30, x)), Math.max(30, Math.min(canvas.height - 30, y)));
  };

  const handleCanvasMouseUp = () => {
    setDragging(null);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 flex gap-2 p-4 overflow-hidden">
        {/* Canvas area - expands when panel is hidden */}
        <div
          className={`flex-1 rounded-lg overflow-hidden border transition-all ${
            theme === "dark" ? "border-zinc-800" : "border-zinc-200"
          }`}
        >
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            onClick={handleCanvasClick}
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
            onMouseLeave={handleCanvasMouseUp}
            style={{ cursor: dragging ? "grabbing" : "crosshair", display: "block" }}
          />
        </div>

        {/* Toggle Button - Always visible */}
        <button
          onClick={() => setShowPanel(!showPanel)}
          className={`px-2 rounded-lg transition-colors flex items-center justify-center ${
            theme === "dark"
              ? "bg-zinc-800 hover:bg-zinc-700 text-white"
              : "bg-zinc-100 hover:bg-zinc-200 text-black"
          }`}
          title={showPanel ? "Hide details" : "Show details"}
        >
          {showPanel ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

        {/* Right Panel - Collapsible */}
        {showPanel && (
          <div className="w-96 overflow-y-auto flex flex-col gap-3">
            <StepExplanationPanel />

            {/* Node/Edge context */}
            <div
              className={`rounded-lg p-4 ${
                theme === "dark" ? "bg-zinc-900 text-zinc-100" : "bg-zinc-50 text-zinc-900"
              }`}
            >
              <h3 className="text-lg font-bold mb-3">Actions</h3>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setPendingAssign(pendingAssign === "start" ? null : "start")}
                  className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                    pendingAssign === "start"
                      ? "bg-green-600 text-white"
                      : theme === "dark"
                        ? "bg-zinc-800 hover:bg-zinc-700 text-white"
                        : "bg-zinc-100 hover:bg-zinc-200 text-black"
                  }`}
                >
                  {pendingAssign === "start" ? "Select Start Node" : "Set Start"}
                </button>
                <button
                  onClick={() => setPendingAssign(pendingAssign === "end" ? null : "end")}
                  className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                    pendingAssign === "end"
                      ? "bg-red-600 text-white"
                      : theme === "dark"
                        ? "bg-zinc-800 hover:bg-zinc-700 text-white"
                        : "bg-zinc-100 hover:bg-zinc-200 text-black"
                  }`}
                >
                  {pendingAssign === "end" ? "Select End Node" : "Set End"}
                </button>
              </div>

              {startId && (
                <div className="mt-3 text-sm p-2 rounded bg-green-900/20 border border-green-600/30">
                  <p className={theme === "dark" ? "text-green-400" : "text-green-600"}>Start: {startId}</p>
                </div>
              )}
              {endId && (
                <div className="mt-2 text-sm p-2 rounded bg-red-900/20 border border-red-600/30">
                  <p className={theme === "dark" ? "text-red-400" : "text-red-600"}>End: {endId}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
