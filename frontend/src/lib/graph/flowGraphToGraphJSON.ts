import type { FlowGraph } from './types';
import type { FlowGraphResult } from './types';

export const flowGraphToGraphJSON = (flow: FlowGraph): FlowGraphResult => {
  return {
    graph: {
      directed: true,
      nodes: flow.nodes.map((n) => ({ id: n.id })),
      edges: flow.edges.map((e) => ({
        source: e.source,
        target: e.target,
        weight: e.flow,
        label: String(e.capacity),
      })),
    },
    maxflow: flow.maxflow,
  };
};
