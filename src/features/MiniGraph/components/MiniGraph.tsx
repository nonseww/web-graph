import type { GraphJSON } from '../../../lib/graph/types';
import { GraphView } from '../../../services/GraphView';
import classes from './MiniGraph.module.scss';
import X from '../../../assets/X.svg';

interface MiniGraphProps {
  onClose: () => void;
  graph: GraphJSON | undefined;
}

export const MiniGraph = ({ graph, onClose }: MiniGraphProps) => {
  return (
    <div className={classes.overlay}>
      <div className={classes.view}>
        <img src={X} className={classes.view__x} onClick={onClose} />
        <GraphView
          nodes={graph?.nodes || []}
          edges={graph?.edges || []}
          directed={graph?.directed || false}
        />
      </div>
    </div>
  );
};
