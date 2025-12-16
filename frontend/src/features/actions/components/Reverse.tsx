import type { GraphJSON } from '../../../lib/graph/types';
import { useState, useEffect } from 'react';
import { useNotify } from '../../../hooks/useNotify';
import { reverseGraph } from '../../../lib/graph/graphModule';
import { MiniGraph } from '../../MiniGraph';

interface ReverseProps {
  onClose: () => void;
}

export const Reverse = ({ onClose }: ReverseProps) => {
  const { notify } = useNotify();
  const [isOpen, setIsOpen] = useState(false);
  const [revGraph, setRevGraph] = useState<GraphJSON>();

  useEffect(() => {
    (async () => {
      const graph = await reverseGraph();
      if (graph === null) {
        notify({ type: 'error', message: 'Ошибка обращения графа!' });
      } else {
        notify({ type: 'success', message: 'Граф обращен успешно' });
        setRevGraph(graph);
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
          graph={revGraph}
        />
      )}
    </>
  );
};
