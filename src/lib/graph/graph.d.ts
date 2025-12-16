import type {
  GraphJSON,
  Vertex,
  Edge,
  ShortestPath,
  EccentricityResult,
  FlowGraph,
} from './types';

declare module './graph.js' {
  const Module: () => Promise<any>;
  export default Module;

  export function loadDirectedGraph(fileContent: string): Promise<void>;
  export function loadUndirectedGraph(fileContent: string): Promise<void>;
  export function getGraphJSON(): Promise<GraphJSON | null>;
  export function deleteGraph(): Promise<void>;
  export function addVertex(v: Vertex): Promise<boolean>;
  export function addEdge(e: Edge): Promise<boolean>;
  export function deleteVertex(v: Vertex): Promise<boolean>;
  export function deleteEdge(v: Vertex, u: Vertex): Promise<boolean>;
  export function getOutdegree(v: Vertex): Promise<number>;
  export function getIndegree(v: Vertex): Promise<number>;
  export function getDegree(v: Vertex): Promise<number>;
  export function reverseGraph(): Promise<GraphJSON | null>;
  export function checkCycles(): Promise<boolean>;
  export function findUnreachable(v: Vertex): Promise<string[] | null>;
  export function kruskal(): Promise<GraphJSON | null>;
  export function eccCenterRaduis(): Promise<EccentricityResult | null>;
  export function shortestPaths(v: string): Promise<ShortestPath[] | null>;
  export function is_negcycle_here(start: string): Promise<string[] | null>;
  export function maxFlow(s: Vertex, t: Vertex): Promise<FLowGraph | null>;
}
