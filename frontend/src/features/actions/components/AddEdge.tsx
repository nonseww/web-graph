import { useState } from 'react';
import { Dialog } from '../../Dialog';
import { addEdge, getGraphJSON } from '../../../lib/graph';
import type { GraphJSON } from '../../../lib/graph/types';
import { useNotify } from '../../../hooks/useNotify';

interface AddEdgeProps {
  onClose: () => void;
  onUpdate: (json: GraphJSON | null) => void;
}

export const AddEdge = ({ onClose, onUpdate }: AddEdgeProps) => {
  const [v, setV] = useState<string>('');
  const [u, setU] = useState<string>('');
  const [w, setW] = useState<number | undefined>(undefined);
  const [l, setL] = useState<string>('');
  const { notify } = useNotify();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(v, u, w, l);
    const success = await addEdge({
      source: v,
      target: u,
      weight: w,
      label: l,
    });
    if (!success) {
      notify({ type: 'error', message: `Ребро (${v}, ${u}) уже существует!` });
    } else {
      const json = await getGraphJSON();
      onUpdate(json);
      notify({
        type: 'success',
        message: `Ребро (${v}, ${u}) успешно добавлено`,
      });
    }
    onClose();
  };

  return (
    <Dialog onClose={onClose} title="+ Ребро">
      <p>Введите новое ребро:</p>
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
