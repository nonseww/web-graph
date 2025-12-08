import { useState } from 'react';
import { Dialog } from '../../Dialog';

interface AddVertexProps {
  onClose: () => void;
}

export const AddVertex = ({ onClose }: AddVertexProps) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(value);
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
