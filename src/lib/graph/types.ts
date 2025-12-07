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
  path: string[];
  distance: number;
}

export interface EccentricityResult {
  eccentricity: Record<string, number>;
  radius: number;
  center: string[];
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

export interface FLowGraph {
  graphType: 'flow';
  nodes: FlowNode[];
  edges: FlowEdge[];
}
