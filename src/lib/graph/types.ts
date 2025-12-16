export interface Vertex {
  id: string;
}

export interface Edge {
  source: string;
  target: string;
  weight?: number;
  label?: string;
}

export interface GraphJSON {
  nodes: Vertex[];
  edges: Edge[];
  directed: boolean;
}

export interface ShortestPath {
  source: string;
  target: string;
  distance: number | null;
}

export interface EccentricityResult {
  eccentricity: Record<string, number>;
  radius: number;
  center: string[];
}

export interface NegCycle {
  hasNegCycle: boolean;
  cycle: string[];
}

export interface FlowNode {
  id: string;
}

export interface FlowEdge {
  source: string;
  target: string;
  capacity: number;
  flow: number;
}

export interface FlowGraph {
  graphType: 'flow';
  maxflow: number;
  nodes: FlowNode[];
  edges: FlowEdge[];
}

export interface FlowGraphResult {
  graph: GraphJSON;
  maxflow: number;
}
