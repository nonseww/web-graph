import type { GraphJSON } from '../../../lib/graph/types';
import { useNotify } from '../../../hooks/useNotify';
import { useEffect, useState } from 'react';
import { Modal } from '../../Modal';
import { deleteGraph } from '../../../lib/graph/graphModule';

interface DeleteGraphProps {
  onClose: () => void;
  onUpdate: (json: GraphJSON | null) => void;
}

export const DeleteGraph = ({ onClose, onUpdate }: DeleteGraphProps) => {
  const [isOkay, setIsOkay] = useState<boolean>(false);
  const { notify } = useNotify();

  useEffect(() => {
    (async () => {
      if (isOkay) {
        const success: boolean = await deleteGraph();
        if (!success) {
          notify({ type: 'error', message: `Ошибка удаления графа!` });
        } else {
          onUpdate(null);
        }
      }
      onClose();
    })();
  }, [isOkay]);

  return (
    <Modal
      title="Вы уверены, что хотите удалить граф?"
      onClose={() => setIsOkay(false)}
      onChange={(answer: boolean) => setIsOkay(answer)}
    />
  );
};
