import { useState } from 'react';
import { Dialog } from '../../Dialog';
import { getDegree } from '../../../lib/graph/graphModule';
import { useNotify } from '../../../hooks/useNotify';

interface GetDegreeProps {
  onClose: () => void;
}

export const GetDegree = ({ onClose }: GetDegreeProps) => {
  const [value, setValue] = useState('');
  const { notify } = useNotify();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await getDegree({ id: value });
    if (result === -1) {
      notify({ type: 'error', message: null });
    } else if (result === -2) {
      notify({ type: 'error', message: `Вершина (${value}) не существует!` });
    } else {
      notify({
        type: 'result',
        message: `Степень вершины (${value}) равна ${result}`,
      });
    }
    onClose();
  };

  return (
    <Dialog onClose={onClose} title="Степень вершины">
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
