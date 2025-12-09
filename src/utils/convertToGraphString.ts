import type { Vertex, Edge } from '../lib/graph/types';

export const convertToGraphString = (data: {
  nodes: Vertex[];
  edges: Edge[];
  directed: boolean;
}): string => {
  let lines: string[] = [];
  lines.push(data.directed ? 'directed' : 'undirected');
  for (const node of data.nodes) {
    const edgeStr = data.edges
      .filter((e) => e.source === node.id)
      .map((e) => `(${e.target}, ${e.weight ?? 0}, ${e.label ?? 'no label'})`)
      .join(' ');
    lines.push(`${node.id}: $${edgeStr || 'No edges'}`);
  }
  return lines.join('\n');
};
