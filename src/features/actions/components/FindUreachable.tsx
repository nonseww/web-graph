import { findUnreachable } from '../../../lib/graph/graphModule';
import { useState } from 'react';
import { Dialog } from '../../Dialog';
import { useNotify } from '../../../hooks/useNotify';
import type { ShortestPath } from '../../../lib/graph/types';

interface FindUnreachableProps {
  onClose: () => void;
}

export const FindUnreachable = ({ onClose }: FindUnreachableProps) => {
  const [value, setValue] = useState('');
  const { notify } = useNotify();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result: string[] | null = await findUnreachable({ id: value });

    if (!result) {
      notify({
        type: 'error',
        message: `Вершина (${value}) не найдена!`,
      });
    } else if (result.length === 0) {
      notify({
        type: 'result',
        message: 'Недостижимых вершин нет.',
      });
    } else {
      const message = result.map((v) => `• ${v}`).join('\n');

      notify({
        type: 'result',
        message: `Недостижимые вершины:\n${message}`,
      });
    }

    onClose();
  };

  return (
    <Dialog onClose={onClose} title="Недостижимые из:">
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
