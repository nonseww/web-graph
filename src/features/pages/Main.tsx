import { useState, useEffect } from 'react';
import * as graph from '../../lib/graph/index';
import { GraphView } from '../../services/GraphView';
import type { Vertex, Edge } from '../../lib/graph/types';
import { Panel } from '../Panel/index';

export const Main = () => {
  const [nodes, setNodes] = useState<Vertex[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [directed, setDirected] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem('graph');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setNodes(data.nodes || []);
        setEdges(data.edges || []);
        setDirected(data.directed || false);
      } catch (e) {
        console.error('Ошибка чтения графа!', e);
        return;
      }
    }
  }, []);

  useEffect(() => {
    if (nodes.length === 0 && edges.length === 0) return;
    localStorage.setItem('graph', JSON.stringify({ nodes, edges, directed }));
  }, [nodes, edges, directed]);

  const handleFileLoad = async (fileContent: string) => {
    const typeOfGraph: string = fileContent.split('\n')[0].trim().toLowerCase();
    if (typeOfGraph === 'directed') {
      await graph.loadDirectedGraph(fileContent);
      setDirected(true);
    } else if (typeOfGraph === 'undirected') {
      await graph.loadUndirectedGraph(fileContent);
      setDirected(false);
    } else {
      console.error('Не удалось определить тип графа');
      return;
    }

    const json = await graph.getGraphJSON();
    setNodes(json?.nodes ?? []);
    setEdges(json?.edges ?? []);
  };

  return (
    <main>
      <Panel onFileLoad={handleFileLoad} />
      <GraphView nodes={nodes} edges={edges} directed={directed} />
    </main>
  );
};
