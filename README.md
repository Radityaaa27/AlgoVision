# AlgoVision

> Interactive Algorithm Visualization Platform for Computer Science Students.

AlgoVision is an educational web application that helps students understand algorithms through interactive visualizations, step-by-step execution, complexity analysis, and theoretical explanations.

The goal of this project is to bridge the gap between algorithm theory and practical understanding by providing an intuitive visual learning experience.

---

## Features

### Graph Algorithms

Currently supported:

* Dijkstra's Algorithm
* A* Search
* Breadth First Search (BFS)
* Depth First Search (DFS)

### Interactive Visualization

* Dynamic graph rendering
* Node and edge visualization
* Algorithm execution animation
* Step-by-step traversal tracking
* Path highlighting

### Learning Support

* Detailed algorithm explanations
* Complexity analysis
* Theoretical background
* Educational notes and use cases

### User Experience

* Modern responsive interface
* Dark / Light mode
* Interactive controls
* Real-time updates

---

## Tech Stack

### Frontend

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS

### State Management

* Zustand

### Visualization

* Custom Graph Canvas

---

## Project Structure

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── GraphCanvas.tsx
│   ├── Controls.tsx
│   ├── StepExplanationPanel.tsx
│   ├── ComplexityPanel.tsx
│   ├── TheorySection.tsx
│   ├── AlgorithmSelector.tsx
│   ├── Sidebar.tsx
│   ├── Header.tsx
│   └── ThemeToggle.tsx
│
├── lib/
│   ├── algorithms/
│   │   ├── types.ts
│   │   ├── dijkstra.ts
│   │   ├── astar.ts
│   │   ├── bfs.ts
│   │   ├── dfs.ts
│   │   ├── theory.ts
│   │   └── index.ts
│   │
│   ├── store/
│   │   └── graphStore.ts
│   │
│   └── data/
│       └── defaultGraph.ts
```

---

## Getting Started

### Clone Repository

```bash
git clone https://github.com/yourusername/algovision.git
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Educational Goals

AlgoVision is designed to help students:

* Understand graph traversal algorithms
* Visualize shortest path computations
* Learn algorithmic thinking
* Compare algorithm behaviors
* Study complexity analysis in an interactive way

---

## Planned Features

### Algorithms

* Prim's Algorithm
* Kruskal's Algorithm
* Bellman-Ford
* Floyd-Warshall
* AVL Tree
* Red-Black Tree
* Binary Search Tree

### Learning Tools

* Algorithm comparison mode
* Execution speed controls
* Interactive graph editor
* Code visualization panel
* Practice challenges

### Advanced Features

* User progress tracking
* Saved visualizations
* Classroom mode
* AI-assisted explanations

---

## Research Motivation

Many students struggle to understand algorithms from static textbook examples.

AlgoVision aims to improve learning outcomes by transforming abstract algorithmic concepts into interactive visual experiences that can be explored step-by-step.

This project combines principles from:

* Computer Science Education
* Human-Computer Interaction
* Data Visualization
* Software Engineering

---

## Author

**Radit**

Computer Science Student

Aspiring Assistant Lecturer & Software Engineer

---

## License

MIT License
