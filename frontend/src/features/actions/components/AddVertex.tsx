import { useState } from 'react';
import { Dialog } from '../../Dialog';
import { addVertex, getGraphJSON } from '../../../lib/graph';
import type { GraphJSON } from '../../../lib/graph/types';
import { useNotify } from '../../../hooks/useNotify';

interface AddVertexProps {
  onClose: () => void;
  onUpdate: (json: GraphJSON | null) => void;
}

export const AddVertex = ({ onClose, onUpdate }: AddVertexProps) => {
  const [value, setValue] = useState('');
  const { notify } = useNotify();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await addVertex({ id: value });
    if (!success) {
      notify({ type: 'error', message: `Вершина (${value})  уже существует!` });
    } else {
      const json = await getGraphJSON();
      onUpdate(json);
      notify({
        type: 'success',
        message: `Вершина ${value} успешно добавлена`,
      });
    }
    onClose();
  };

  return (
    <Dialog onClose={onClose} title="+ Вершина">
      <p>Введите имя новой вершины:</p>
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
