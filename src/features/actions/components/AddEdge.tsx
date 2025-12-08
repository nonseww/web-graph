import { useState } from 'react';
import { Dialog } from '../../Dialog';

interface AddEdgeProps {
  onClose: () => void;
}

export const AddEdge = ({ onClose }: AddEdgeProps) => {
  const [u, setU] = useState<string>('');
  const [v, setV] = useState<string>('');
  const [w, setW] = useState<number>();
  const [l, setL] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(u, v, w, l);
    onClose();
  };

  return (
    <Dialog onClose={onClose} title="+ Ребро">
      <p>Введите новое ребро:</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="u-id"
          name="u-id"
          required
          value={u}
          placeholder="Вершина 1"
          onChange={(e) => setU(e.target.value)}
        />
        <input
          type="text"
          id="v-id"
          name="v-id"
          required
          value={v}
          placeholder="Вершина 2"
          onChange={(e) => setV(e.target.value)}
        />
        <input
          type="number"
          id="w-id"
          name="w-id"
          value={w}
          placeholder="Вес (необязательно)"
          onChange={(e) => setW(Number(e.target.value))}
        />
        <input
          type="text"
          id="l-id"
          name="l-id"
          value={l}
          placeholder="Метка (необязательно)"
          onChange={(e) => setL(e.target.value)}
        />
        <button type="submit">OK</button>
      </form>
    </Dialog>
  );
};
