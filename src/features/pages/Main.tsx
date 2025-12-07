import { useEffect, useState } from 'react';
import * as graph from '../../lib/graph/index.js';
import { GraphView } from '../../services/GraphView.js';
import type { Vertex, Edge } from '../../lib/graph/types.js';
import { Panel } from '../Panel/components/Panel.js';

export const Main = () => {
  const [nodes, setNodes] = useState<Vertex[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [directed, setDirected] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      const debugGraph: string = `
directed
1: (2, 0, no label) (3, 0, no label)
2: (1, 0, no label) (3, 0, no label)
3: (1, 0, no label) (2, 0, no label) (3, 0, no label)
4: (5, 0, no label)
5: (4, 0, no label)
6: No edges
7: (1, 0, no label)
`;
      await graph.loadDirectedGraph(debugGraph);
      await graph.addVertex({ id: 'A' });
      await graph.addEdge({ source: 'A', target: '1', weight: 999 });
      const json = await graph.getGraphJSON();
      console.log('nodes', json?.nodes);
      setNodes(json?.nodes ?? []);
      setEdges(json?.edges ?? []);
      setDirected(json?.directed ?? false);
      console.log(json);
    })();
  }, []);

  return (
    <main>
      <Panel />
      <GraphView nodes={nodes} edges={edges} directed={directed} />
    </main>
  );
};
