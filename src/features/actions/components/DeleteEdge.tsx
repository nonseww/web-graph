import { useState } from 'react';
import { Dialog } from '../../Dialog';
import { deleteEdge, getGraphJSON } from '../../../lib/graph';
import type { GraphJSON } from '../../../lib/graph/types';

interface DeleteEdgeProps {
  onClose: () => void;
  onUpdate: (json: GraphJSON | null) => void;
}

export const DeleteEdge = ({ onClose, onUpdate }: DeleteEdgeProps) => {
  const [v, setV] = useState<string>('');
  const [u, setU] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(v, u);
    await deleteEdge({ id: v }, { id: u });
    const json = await getGraphJSON();
    onUpdate(json);
    onClose();
  };

  return (
    <Dialog onClose={onClose} title="- Ребро">
      <p>Введите удалямое ребро:</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="v-id"
          name="v-id"
          required
          value={v}
          placeholder="Вершина 1"
          onChange={(e) => setV(e.target.value)}
        />
        <input
          type="text"
          id="u-id"
          name="u-id"
          required
          value={u}
          placeholder="Вершина 2"
          onChange={(e) => setU(e.target.value)}
        />
        <button type="submit">OK</button>
      </form>
    </Dialog>
  );
};
