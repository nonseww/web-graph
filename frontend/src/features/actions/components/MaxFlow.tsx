import { maxFlow } from '../../../lib/graph/graphModule';
import { useNotify } from '../../../hooks/useNotify';
import { useState } from 'react';
import type {
  GraphJSON,
  FlowGraph,
  FlowGraphResult,
} from '../../../lib/graph/types';
import { Dialog } from '../../Dialog';
import { MiniGraph } from '../../MiniGraph';
import { flowGraphToGraphJSON } from '../../../lib/graph/flowGraphToGraphJSON';

interface MaxFlowProps {
  onClose: () => void;
}

export const MaxFlow = ({ onClose }: MaxFlowProps) => {
  const { notify } = useNotify();
  const [flowGraph, setFlowGraph] = useState<GraphJSON>();
  const [u, setU] = useState('');
  const [v, setV] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const graph: FlowGraph | null = await maxFlow({ id: u }, { id: v });
    console.log(graph);
    if (!graph) {
      notify({
        type: 'error',
        message: 'Ошибка построения максимального потока!',
      });
    } else {
      const flowGraphResult: FlowGraphResult = flowGraphToGraphJSON(graph);
      setFlowGraph(flowGraphResult.graph);
      setIsOpen(true);
      notify({
        type: 'result',
        message: `Максимальный поток = ${flowGraphResult.maxflow}`,
      });
    }
  };

  return (
    <>
      {!isOpen && (
        <Dialog onClose={onClose} title="Максимальный поток">
          <p>Введите имя истока и стока:</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="u-id"
              name="u-id"
              required
              value={u}
              onChange={(e) => setU(e.target.value)}
            />
            <input
              type="text"
              id="v-id"
              name="v-id"
              required
              value={v}
              onChange={(e) => setV(e.target.value)}
            />
            <button type="submit">OK</button>
          </form>
        </Dialog>
      )}

      {isOpen && (
        <MiniGraph
          onClose={() => {
            onClose();
            setIsOpen(false);
          }}
          graph={flowGraph}
        />
      )}
    </>
  );
};
