import Module from './graph.js';
import type {
  GraphJSON,
  Vertex,
  Edge,
  ShortestPath,
  EccentricityResult,
  FLowGraph,
} from './types';

let wasmInstance: any = null;

const initGraph = async () => {
  if (!wasmInstance) {
    wasmInstance = await Module();
  }
  return wasmInstance;
};

const toChar = (module: any, str: string): number => {
  const length = module.lengthBytesUTF8(str) + 1;
  const ptr = module._malloc(length);
  module.stringToUTF8(str, ptr, length);
  return ptr;
};

const toJSON = <T>(jsonStr: string): T | null => {
  try {
    return JSON.parse(jsonStr) as T;
  } catch (e) {
    console.error('Invalid JSON from WASM', jsonStr, e);
    return null;
  }
};

const toCharAny = (module: any, stringMas: string[]): number[] => {
  const ptrs = stringMas.map((str) => toChar(module, str));
  return ptrs;
};

export const loadDirectedGraph = async (fileContent: string): Promise<void> => {
  const module = await initGraph();
  const ptr = toChar(module, fileContent);
  module._load_directedGraph(ptr);
  module._free(ptr);
};

export const loadUndirectedGraph = async (
  fileContent: string
): Promise<void> => {
  const module = await initGraph();
  const ptr = toChar(module, fileContent);
  module._load_undirectedGraph(ptr);
  module._free(ptr);
};

export const getGraphJSON = async (): Promise<GraphJSON | null> => {
  const module = await initGraph();
  const ptr = module._get_graphJSON();
  const jsonStr = module.UTF8ToString(ptr);
  return toJSON<GraphJSON>(jsonStr);
};

export const deleteGraph = async (): Promise<void> => {
  const module = await initGraph();
  module._delete_graph();
};

export const addVertex = async (v: Vertex): Promise<boolean> => {
  const module = await initGraph();
  const ptr = toChar(module, v.id);
  const answer: boolean = module._add_vertex(ptr);
  module._free(ptr);
  return answer;
};

export const addEdge = async (e: Edge): Promise<boolean> => {
  const module = await initGraph();
  const ptrs = toCharAny(module, [e.source, e.target, e.label || '']);
  const answer: boolean = module._add_edge(
    ptrs[0],
    ptrs[1],
    e.weight || 0,
    ptrs[2]
  );
  ptrs.forEach((ptr) => module._free(ptr));
  return answer;
};

export const deleteVertex = async (v: Vertex): Promise<boolean> => {
  const module = await initGraph();
  const ptr = toChar(module, v.id);
  const answer = module._delete_vertex(ptr);
  module._free(ptr);
  return answer;
};

export const deleteEdge = async (v: Vertex, u: Vertex): Promise<boolean> => {
  const module = await initGraph();
  const ptrs = toCharAny(module, [v.id, u.id]);
  const answer = module._delete_edge(ptrs[0], ptrs[1]);
  ptrs.forEach((ptr) => module._free(ptr));
  return answer;
};

export const getOutdegree = async (v: Vertex): Promise<number> => {
  const module = await initGraph();
  const ptr = toChar(module, v.id);
  const result = module._get_outdegree(ptr);
  module._free(ptr);
  return result;
};

export const getIndegree = async (v: Vertex): Promise<number> => {
  const module = await initGraph();
  const ptr = toChar(module, v.id);
  const result = module._get_indegree(ptr);
  module._free(ptr);
  return result;
};

export const getDegree = async (v: Vertex): Promise<number> => {
  const module = await initGraph();
  const ptr = toChar(module, v.id);
  const result = module._get_degree(ptr);
  module._free(ptr);
  return result;
};

export const reverseGraph = async (): Promise<GraphJSON | null> => {
  const module = await initGraph();
  const ptr = module._reverse_graph();
  if (!ptr) return null;
  const jsonStr = module.UTF8ToString(ptr);
  return <GraphJSON>toJSON(jsonStr);
};

export const checkCycles = async (): Promise<boolean> => {
  const module = await initGraph();
  return !!module._check_cycles();
};

export const findUnreachable = async (v: Vertex): Promise<string[] | null> => {
  const module = await initGraph();
  const ptr = toChar(module, v.id);
  const result = module._find_unreachable(ptr);
  module._free(ptr);
  if (!result) return null;
  const jsonStr = module.UTF8ToString(result);
  return <string[]>toJSON(jsonStr);
};

export const kruskal = async (): Promise<GraphJSON | null> => {
  const module = await initGraph();
  const ptr = module._kruskal();
  if (!ptr) return null;
  const jsonStr = module.UTF8ToString(ptr);
  return <GraphJSON>toJSON(jsonStr);
};

export const eccCenterRaduis = async (): Promise<EccentricityResult | null> => {
  const module = await initGraph();
  const ptr = module._ecc_center_raduis();
  if (!ptr) return null;
  const jsonStr = module.UTF8ToString(ptr);
  return <EccentricityResult>toJSON(jsonStr);
};

export const shortestPaths = async (
  v: string
): Promise<ShortestPath | null> => {
  const module = await initGraph();
  const ptr = toChar(module, v);
  const result = module._shortest_paths(ptr);
  module._free(ptr);
  if (!result) return null;
  const jsonStr = module.UTF8ToString(result);
  return <ShortestPath>toJSON(jsonStr);
};

export const is_negcycle_here = async (
  start: string
): Promise<string[] | null> => {
  const module = await initGraph();
  const ptr = toChar(module, start);
  const result = module._is_negcycle_here(ptr);
  module._free(ptr);
  if (!result) return null;
  const jsonStr = module.UTF8ToString(result);
  return <string[]>toJSON(jsonStr);
};

export const maxFlow = async (
  s: Vertex,
  t: Vertex
): Promise<FLowGraph | null> => {
  const module = await initGraph();
  const ptrs = toCharAny(module, [s.id, t.id]);
  const result = module._max_flow(ptrs[0], ptrs[1]);
  ptrs.forEach((ptr) => module._free(ptr));
  if (!result) return null;
  const jsonStr = module.UTF8ToString(result);
  return <FLowGraph>toJSON(jsonStr);
};
