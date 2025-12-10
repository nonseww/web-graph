import { useState, useEffect, useCallback } from 'react';
import * as graph from '../../lib/graph/index';
import { GraphView } from '../../services/GraphView';
import type { Vertex, Edge, GraphJSON } from '../../lib/graph/types';
import { Panel } from '../Panel/index';
import { convertToGraphString } from '../../utils/convertToGraphString';
import { Popup } from '../reactions/index';
import { useNotify } from '../../hooks/useNotify';
import { Help } from '../Help';
import { Download } from '../Download';

export const Main = () => {
  const [nodes, setNodes] = useState<Vertex[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [directed, setDirected] = useState<boolean>(false);
  const { notify, notification, clear } = useNotify();

  const onUpdate = (json: GraphJSON | null) => {
    setNodes(json?.nodes ?? []);
    setEdges(json?.edges ?? []);
    setDirected(json?.directed ?? false);
  };

  const assignGraph = useCallback(async (data: any) => {
    if (data.directed) {
      await graph.loadDirectedGraph(convertToGraphString(data));
    } else {
      await graph.loadUndirectedGraph(convertToGraphString(data));
    }
  }, []);

  useEffect(() => {
    (async () => {
      const saved = localStorage.getItem('graph');
      if (saved) {
        try {
          const data = JSON.parse(saved);
          setNodes(data.nodes || []);
          setEdges(data.edges || []);
          setDirected(data.directed || false);
          await assignGraph(data);
          notify({
            type: 'success',
            message: 'Граф успешно загружен из памяти',
          });
        } catch (e) {
          notify({ type: 'error', message: 'Ошибка чтения графа!' });
          console.error('Ошибка чтения графа!', e);
          return;
        }
      }
    })();
  }, [assignGraph]);

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
      notify({ type: 'error', message: 'Не удалось определить тип графа!' });
      console.error('Не удалось определить тип графа');
      return;
    }

    const json = await graph.getGraphJSON();
    setNodes(json?.nodes ?? []);
    setEdges(json?.edges ?? []);
    notify({ type: 'success', message: 'Граф успешно загружен' });
  };

  return (
    <main>
      <Panel onFileLoad={handleFileLoad} onUpdate={onUpdate} />
      <GraphView nodes={nodes} edges={edges} directed={directed} />
      {notification.type && (
        <Popup
          type={notification.type}
          message={notification?.message}
          onClose={clear}
        />
      )}
      <Help />
      <Download />
    </main>
  );
};
