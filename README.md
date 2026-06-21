# AlgoVision

> Interactive Algorithm Visualization Platform for Computer Science Students.

AlgoVision is an educational web application that helps students understand algorithms through interactive visualizations, step-by-step execution, complexity analysis, and theoretical explanations.

The goal of this project is to bridge the gap between algorithm theory and practical understanding by providing an intuitive visual learning experience.

**Live Demo:** http://localhost:3000 (after running locally)

---

## 🎬 Quick Start Demo

### How to Use in 30 Seconds:

```
1️⃣ Click "Load Sample" → Pre-made graph appears
2️⃣ Choose algorithm → Select Dijkstra, A*, BFS, or DFS
3️⃣ Click "Set Start" → Pick a green starting node
4️⃣ Click "Set End" → Pick a red goal node
5️⃣ Press ▶️ Play → Watch it explore step-by-step
6️⃣ Read explanations → Understand WHY each step happens
```

### Visual Overview:

**Layout:**

```
┌─────────────────────────────────────────────────────────┐
│  AlgoVision    🌙 Dark/Light Toggle                     │
├──────────────┬──────────────────────────────────────────┤
│              │                                          │
│  Algorithm   │     Interactive Canvas                   │
│  Selector    │     ┌──────────────────┐               │
│              │     │  A ──4── B  C    │               │
│  ▶️ Play     │     │  │      / \ \    │   📊 Step     │
│  ⏪ Step     │     │  2    1  6  3    │   Info        │
│  ⏩ Step     │     │  │      \│/      │               │
│  🔄 Reset    │     │  C ──2── E ──4── G               │
│              │     │         / \      │               │
│  ⏱️ Speed    │     │        4   2     │               │
│              │     └──────────────────┘               │
│  📖 Theory   │                                          │
│              │     🟢 Start: A                          │
│  🔍 Complexity│    🔴 End: G                           │
│              │                                          │
└──────────────┴──────────────────────────────────────────┘
```

---

## Features

### Graph Algorithms

Currently supported with full step-by-step visualization:

- **Dijkstra's Algorithm** — Weighted graphs, greedy shortest-path, O((V + E) log V)
- **A\* Search** — Informed search with heuristics, extremely efficient for pathfinding
- **Breadth First Search (BFS)** — Unweighted graphs, guaranteed shortest-path by edges
- **Depth First Search (DFS)** — Explores deeply, excellent for cycles & topological sort

### Interactive Visualization

- **Dynamic Graph Canvas** — Click to add nodes, drag to move them
- **Real-time Rendering** — Node positions, edge weights, visual states update instantly
- **Algorithm Animation** — Play/pause/step through execution with customizable speed
- **Color-Coded States**:
  - 🟢 Green: Start node
  - 🔴 Red: End node
  - 🔵 Cyan: Visited nodes
  - 🟣 Purple: Frontier (open set)
  - 🟠 Orange: Final path

### Learning Support

- **Step Explanations** — Each step shows what's happening and why
- **Complexity Analysis** — Time/space complexity for current graph
- **Algorithm Theory** — Detailed descriptions, use cases, advantages/disadvantages
- **Real-World Applications** — See how algorithms are used in industry
- **Distance Tracking** — Visual display of distance/f-score for each node

### User Experience

- **Modern Responsive Design** — Clean, intuitive interface
- **Dark / Light Mode Toggle** — Eye-friendly theme selection
- **Interactive Controls**:
  - ▶️ Play/Pause animation
  - ⏪/⏩ Step backward/forward through execution
  - 🔄 Reset to start
  - ⏱️ Speed slider (100ms–2000ms per step)
  - 📊 Load sample graph or clear all
- **Real-time Updates** — Graph changes trigger immediate algorithm recomputation

---

## Tech Stack

### Frontend Framework

- **Next.js 16** (App Router) — React framework with SSR/SSG support
- **React 19** — UI components with hooks
- **TypeScript** — Type-safe development
- **Tailwind CSS 4** — Utility-first styling

### State Management

- **Zustand** — Lightweight, performant store for graph & algorithm state

### Visualization

- **HTML5 Canvas** — Custom graph rendering (nodes, edges, path highlighting)
- **Canvas API** — No heavy libraries, full control over rendering

### Development Tools

- **ESLint** — Code quality and style consistency
- **PostCSS 4** — CSS processing pipeline

---

## Project Structure

```text
src/
├── app/
│   ├── layout.tsx                    # Root layout wrapper
│   ├── page.tsx                      # Main app page with auto-play loop
│   ├── globals.css                   # Global Tailwind styles
│   └── components/
│       ├── Header.tsx                # Title & theme toggle
│       ├── Sidebar.tsx               # Left panel with controls
│       ├── GraphCanvas.tsx           # Main canvas & explanation panel
│       ├── AlgorithmSelector.tsx     # Dropdown to choose algorithm
│       ├── Control.tsx               # Playback & speed controls
│       ├── StepExplanationPanel.tsx  # Current step details
│       ├── TheorySection.tsx         # Algorithm theory & use cases
│       ├── ComplexityPanel.tsx       # Time/space complexity display
│       ├── ThemeToggle.tsx           # Dark/light mode button
│       └── lib/
│           ├── algorithms/
│           │   ├── types.ts          # Shared types & utilities
│           │   ├── index.ts          # Algorithm registry
│           │   ├── astar.ts          # A* implementation
│           │   ├── bfs.ts            # BFS implementation
│           │   ├── dfs.ts            # DFS implementation
│           │   ├── diijakstra.ts     # Dijkstra implementation
│           │   ├── theory.ts         # Algorithm theory & complexity data
│           │   └── store/
│           │       ├── graphStore.ts # Zustand state management
│           │       └── data/
│           │           └── defaultGraph.ts  # Sample graph for demo
```

### Key File Descriptions

| File              | Purpose                                                                   |
| ----------------- | ------------------------------------------------------------------------- |
| `graphStore.ts`   | Central state: nodes, edges, algorithm selection, playback, step tracking |
| `types.ts`        | Interfaces: `GraphNode`, `GraphEdge`, `AlgoStep`, algorithm output format |
| `[algorithm].ts`  | Algorithm implementations; each exports `run()` function                  |
| `theory.ts`       | Educational data: complexity analysis, descriptions, use cases            |
| `GraphCanvas.tsx` | Main UI: canvas rendering, drag-to-move, click-to-add nodes               |

---

## 🎓 What You'll Learn

| Algorithm    | Best For                          | Time           | Space |
| ------------ | --------------------------------- | -------------- | ----- |
| **Dijkstra** | GPS navigation, network routing   | O((V+E)logV)   | O(V)  |
| **A\***      | Game AI, robot pathfinding        | O((V+E)logV)\* | O(V)  |
| **BFS**      | Social networks, maze solving     | O(V+E)         | O(V)  |
| **DFS**      | Topological sort, cycle detection | O(V+E)         | O(V)  |

### Real Example:

```
🗺️ Find shortest route from City A → City G

Starting graph:
    A ──4── B
    │      /
    2    1
    │  /
    C ──2── E ──4── G

✅ Dijkstra finds: A → C → E → G (Cost: 8)
✅ See every step colored on the canvas
✅ Read explanation for each decision
✅ Compare complexity: Why not DFS?
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+ or 20 LTS
- **npm** or **pnpm** package manager
- **Git** (optional, for cloning)

### Installation

1. **Clone or download the repository**

```bash
git clone https://github.com/yourusername/algovision.git
cd algovision
```

2. **Install dependencies**

```bash
npm install
```

Or with pnpm:

```bash
pnpm install
```

3. **Run development server**

```bash
npm run dev
```

Or with pnpm:

```bash
pnpm dev
```

4. **Open in browser**

```
http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

---

## How to Use

### Basic Workflow

1. **Load Graph** — Click "Load Sample" to start with a pre-configured graph
2. **Select Algorithm** — Choose from Dijkstra, A\*, BFS, or DFS dropdown
3. **Set Start/End** — Click "Set Start" button, then click a node; repeat for "Set End"
4. **Play Animation** — Press ▶️ Play or use ⏩ Step Forward
5. **Observe** — Watch nodes change color, read explanations on the right panel
6. **Adjust Speed** — Use the speed slider to slow down or speed up

### Custom Graph

- **Add Nodes** — Click anywhere on canvas to add a node
- **Move Nodes** — Drag nodes around the canvas
- **View Theory** — Expand "About" panel to read algorithm details
- **Check Complexity** — See O(n) analysis for current graph size

---

## Algorithm Details

### Dijkstra's Algorithm

**Best For:** Finding shortest path in weighted graphs with non-negative weights

- **Time:** O((V + E) log V) with binary heap
- **Space:** O(V)
- **Use Cases:** GPS navigation, network routing (OSPF), cost optimization
- **Key Idea:** Always pick the unvisited node with smallest distance

### A\* Search

**Best For:** Pathfinding in games, robotics, puzzles with a known goal location

- **Time:** O((V + E) log V) with good heuristic (best case: O(E))
- **Space:** O(V)
- **Use Cases:** Game NPC movement, delivery routing, motion planning
- **Key Idea:** Dijkstra + heuristic estimate to goal = smarter exploration

### Breadth-First Search (BFS)

**Best For:** Shortest path in unweighted graphs, level-by-level exploration

- **Time:** O(V + E)
- **Space:** O(V)
- **Use Cases:** Maze solving, social networks (degrees of separation), web crawling
- **Key Idea:** FIFO queue ensures we explore all neighbors before going deeper

### Depth-First Search (DFS)

**Best For:** Cycle detection, topological sort, deep exploration of structure

- **Time:** O(V + E)
- **Space:** O(V)
- **Use Cases:** Topological sorting, cycle detection, strongly connected components
- **Key Idea:** LIFO stack; commits to one path until dead-end, then backtracks

---

## Educational Goals

AlgoVision is designed to help students:

- ✅ **Visualize** abstract algorithm concepts in real-time
- ✅ **Understand** why each step happens (not just memorize)
- ✅ **Compare** different algorithms on the same graph
- ✅ **Measure** complexity impact: see O(n) behavior in action
- ✅ **Experiment** by building custom graphs
- ✅ **Retain** knowledge through interactive learning

---

## Planned Features (Roadmap)

### Phase 2: More Algorithms

- Prim's Minimum Spanning Tree
- Kruskal's Minimum Spanning Tree
- Bellman-Ford (handles negative weights)
- Floyd-Warshall (all-pairs shortest path)
- Topological Sort visualization
- Strongly Connected Components (Tarjan, Kosaraju)

### Phase 3: Advanced Learning Tools

- **Algorithm Comparison Mode** — Run 2 algorithms side-by-side on same graph
- **Code Panel** — Show pseudocode alongside visualization
- **Practice Challenges** — Guided exercises with hints
- **Execution Statistics** — Count node visits, edge relaxations, etc.

### Phase 4: Community Features

- **Save/Share** — Export visualizations as images or shareable links
- **Classroom Mode** — Teacher dashboard, student progress tracking
- **User Accounts** — Save favorite graphs and settings
- **Discussion Forum** — Q&A about algorithms

### Phase 5: Advanced Features

- **3D Graph Visualization** — For larger, more complex graphs
- **Graph Import/Export** — Load graphs from JSON or GraphML format
- **Performance Profiling** — Benchmark different algorithms
- **AI Explanations** — AI-powered step descriptions

---

## Keyboard Shortcuts (Future)

| Key     | Action                |
| ------- | --------------------- |
| `Space` | Play/Pause            |
| `→`     | Step forward          |
| `←`     | Step backward         |
| `R`     | Reset                 |
| `C`     | Clear graph           |
| `D`     | Dark mode toggle      |
| `N`     | New node (click mode) |

_(To be implemented in Phase 2)_

---

## Performance

- **Smooth Animation** — 60 FPS canvas rendering
- **Instant Recomputation** — Algorithm re-runs < 50ms for typical graphs
- **Scalable** — Tested with graphs up to 100+ nodes
- **Low Memory** — Zustand store is highly optimized

---

## Browser Compatibility

| Browser              | Support                              |
| -------------------- | ------------------------------------ |
| Chrome/Edge          | ✅ Full                              |
| Firefox              | ✅ Full                              |
| Safari               | ✅ Full                              |
| Mobile (iOS/Android) | ⚠️ Partial (touch support improving) |

---

## Contributing

Contributions are welcome! Areas for help:

- 🐛 **Bug fixes** — Report issues with algorithm behavior
- 🎨 **UI improvements** — Better visualization or controls
- 📚 **Algorithm additions** — Implement new algorithms
- 📖 **Documentation** — Improve guides and examples
- 🧪 **Testing** — Add unit/integration tests

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-algorithm`)
3. Make changes and test locally
4. Commit with clear messages (`git commit -m "Add Prim's algorithm"`)
5. Push to your fork and submit a Pull Request

---

## Research & Inspiration

Many students struggle with abstract algorithm concepts. AlgoVision transforms this by making algorithms:

- **Visual** — See the algorithm unfold in real-time
- **Interactive** — Pause, step, and control execution
- **Explanatory** — Each step includes the "why", not just the "what"
- **Practical** — Understand real-world applications

This project is grounded in research from:

- 🎓 Computer Science Education (active learning benefits)
- 👁️ Human-Computer Interaction (visual cognition)
- 📊 Information Visualization (graph layout & perception)
- 🛠️ Software Engineering (clean architecture)

---

## Troubleshooting

### App won't load

```bash
# Clear next cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

### Algorithm takes too long

- Reduce graph size (fewer nodes/edges)
- Check for cycles (can cause infinite loops)
- Increase speed slider value

### Canvas not rendering

- Ensure browser supports HTML5 Canvas
- Check browser console for JavaScript errors
- Try a different browser

---

## FAQ

**Q: Can I use this in a classroom?**
A: Yes! Share the link with students. Classroom mode with progress tracking is planned for Phase 4.

**Q: Can I save my graphs?**
A: Not yet. Export as JSON is planned for Phase 3.

**Q: Is the source code available?**
A: Yes! This is open-source under MIT License.

**Q: Can I add my own algorithms?**
A: Yes! Follow the pattern in `src/app/components/lib/algorithms/` and submit a PR.

**Q: Does it work offline?**
A: Not currently. A PWA version is planned.

---

## Author

**Radit**

---

## License

MIT License — Feel free to use this project for educational, commercial, or personal purposes.

See [LICENSE](./LICENSE) file for details.

---

## Support

Have questions or found a bug?

- 📝 Open an issue on GitHub
- 💬 Start a discussion
- 📧 Email the maintainer

---

## Acknowledgments

- Built with ❤️ for CS students everywhere
- Inspired by excellent tools like VisuAlgo, Algorithm Visualizer
- Thanks to the open-source community

---

**Last Updated:** June 2026 | **Version:** 0.1.0
