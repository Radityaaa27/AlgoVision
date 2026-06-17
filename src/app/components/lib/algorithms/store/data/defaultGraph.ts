type StepKind = 'visit' | 'relax' | 'enqueue' | 'dequeue' | 'path' | 'done' | 'skip';
interface AlgoStep {

index: number;

type: StepKind;

nodeId?: string;

edgeId?: string;

frontier: string[]; // current queue/stack/open set node ids, ordered

visited: string[]; // visited so far

distances?: Record<string, number>; // current tentative distances (for dijkstra/A*)

path?: string[]; // current best known path to current node, or final path when done

current: string | null;

title: string; // "Current Step" text

why: string; // "Why" text

next: string; // "Next" text

}