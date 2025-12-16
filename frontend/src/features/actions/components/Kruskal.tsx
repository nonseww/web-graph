import type { GraphJSON } from '../../../lib/graph/types';
import { useState, useEffect } from 'react';
import { useNotify } from '../../../hooks/useNotify';
import { kruskal } from '../../../lib/graph/graphModule';
import { MiniGraph } from '../../MiniGraph';

interface KruskalProps {
  onClose: () => void;
}

export const Kruskal = ({ onClose }: KruskalProps) => {
  const { notify } = useNotify();
  const [isOpen, setIsOpen] = useState(false);
  const [treeGraph, setTreeGraph] = useState<GraphJSON>();

  useEffect(() => {
    (async () => {
      const graph = await kruskal();
      console.log(graph);
      if (graph === null || graph.edges.length === 0) {
        notify({
          type: 'error',
          message: 'Ошибка построения остовного дерева',
        });
      } else {
        notify({
          type: 'success',
          message: 'Остовное дерево построено успешно',
        });
        setTreeGraph(graph);
        setIsOpen(true);
      }
    })();
  }, []);

  return (
    <>
      {isOpen && (
        <MiniGraph
          onClose={() => {
            onClose();
            setIsOpen(false);
          }}
          graph={treeGraph}
        />
      )}
    </>
  );
};
