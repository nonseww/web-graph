import type { GraphJSON } from '../../../lib/graph/types';
import { GraphView } from '../../../services/GraphView';
import classes from './MiniGraph.module.scss';
import X from '../../../assets/X.svg';
import Download from '../../../assets/Download.svg';
import { convertToGraphString } from '../../../utils/convertToGraphString';
import { useNotify } from '../../../hooks/useNotify';

interface MiniGraphProps {
  onClose: () => void;
  graph: GraphJSON | undefined;
}

export const MiniGraph = ({ graph, onClose }: MiniGraphProps) => {
  const { notify } = useNotify();

  const handleClick = async () => {
    if (!graph) {
      notify({ type: 'error', message: 'Ошибка скачивания графа!' });
      return;
    }
    const graphTxt = convertToGraphString({
      nodes: graph?.nodes,
      edges: graph?.edges,
      directed: graph?.directed,
    });
    const blob = new Blob([graphTxt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'graph.txt';
    link.click();

    URL.revokeObjectURL(url);
    notify({ type: 'success', message: 'Граф скачан успешно' });
  };

  return (
    <div className={classes.overlay}>
      <div className={classes.view}>
        <img src={X} className={classes.view__x} onClick={onClose} />
        <img
          src={Download}
          className={classes.view__download}
          onClick={handleClick}
        />
        <GraphView
          nodes={graph?.nodes || []}
          edges={graph?.edges || []}
          directed={graph?.directed || false}
        />
      </div>
    </div>
  );
};
