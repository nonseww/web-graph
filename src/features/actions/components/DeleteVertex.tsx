import { useState } from 'react';
import { Dialog } from '../../Dialog';
import { deleteVertex, getGraphJSON } from '../../../lib/graph';
import type { GraphJSON } from '../../../lib/graph/types';

interface DeleteVertexProps {
  onClose: () => void;
  onUpdate: (json: GraphJSON | null) => void;
}

export const DeleteVertex = ({ onClose, onUpdate }: DeleteVertexProps) => {
  const [value, setValue] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(value);
    await deleteVertex({ id: value });
    const json = await getGraphJSON();
    console.log('json', json);
    onUpdate(json);
    onClose();
  };

  return (
    <Dialog onClose={onClose} title="- Вершина">
      <p>Введите имя удаляемой вершины:</p>
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
