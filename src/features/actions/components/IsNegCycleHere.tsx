import { is_negcycle_here } from '../../../lib/graph/graphModule';
import { useState } from 'react';
import { Dialog } from '../../Dialog';
import { useNotify } from '../../../hooks/useNotify';
import type { NegCycle } from '../../../lib/graph/types';

interface IsNegCycleHereProps {
  onClose: () => void;
}

export const IsNegCycleHere = ({ onClose }: IsNegCycleHereProps) => {
  const [value, setValue] = useState('');
  const { notify } = useNotify();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result: NegCycle | null = await is_negcycle_here(value);

    if (!result) {
      notify({
        type: 'error',
        message: `Вершина (${value}) не найдена!`,
      });
    } else {
      const message = result.hasNegCycle
        ? `Найдён отрицательный цикл:\n${result.cycle.join(' → ')}`
        : 'Отрицательный цикл не найден';

      notify({
        type: 'result',
        message,
      });
    }

    onClose();
  };

  return (
    <Dialog onClose={onClose} title="Поиск отрицательного цикла">
      <p>Введите имя вершины, с которой начать обход:</p>
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
