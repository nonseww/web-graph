import { useState } from 'react';
import { Dialog } from '../../Dialog';
import { getOutdegree } from '../../../lib/graph';
import { useNotify } from '../../../hooks/useNotify';

interface GetOutdegreeProps {
  onClose: () => void;
}

export const GetOutdegree = ({ onClose }: GetOutdegreeProps) => {
  const [value, setValue] = useState('');
  const { notify } = useNotify();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await getOutdegree({ id: value });
    if (result === -1) {
      notify({ type: 'error', message: null });
    } else if (result === -2) {
      notify({ type: 'error', message: `Вершина (${value}) не существует!` });
    } else if (result === -3) {
      notify({
        type: 'error',
        message: `В неориентированном графе нет полустепени исхода!`,
      });
    } else {
      notify({
        type: 'result',
        message: `Полустепень исхода вершины (${value}) равна ${result}`,
      });
    }
    onClose();
  };

  return (
    <Dialog onClose={onClose} title="Полустепень исхода вершины">
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
