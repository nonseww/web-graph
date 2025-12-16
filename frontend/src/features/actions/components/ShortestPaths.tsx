import { shortestPaths } from '../../../lib/graph/graphModule';
import { useState } from 'react';
import { Dialog } from '../../Dialog';
import { useNotify } from '../../../hooks/useNotify';
import type { ShortestPath } from '../../../lib/graph/types';

interface ShortestPathsProps {
  onClose: () => void;
}

export const ShortestPaths = ({ onClose }: ShortestPathsProps) => {
  const [value, setValue] = useState('');
  const { notify } = useNotify();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result: ShortestPath[] | null = await shortestPaths(value);

    if (!result) {
      notify({
        type: 'error',
        message: `Вершина (${value}) не найдена!`,
      });
    } else {
      const message = result
        .map(({ source, target, distance }) =>
          distance === null
            ? `${source} → ${target}: недостижимо`
            : `${source} → ${target}: ${distance}`
        )
        .join('\n');

      notify({
        type: 'result',
        message,
      });
    }

    onClose();
  };

  return (
    <Dialog onClose={onClose} title="Кратчайшие пути до:">
      <p>Введите имя вершины:</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="vertex-id"
          name="vertex-id"
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">OK</button>
      </form>
    </Dialog>
  );
};
