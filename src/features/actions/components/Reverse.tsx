import type { GraphJSON } from '../../../lib/graph/types';
import { Modal } from '../../Modal';
import { useState, useEffect } from 'react';

interface ReverseProps {
  onClose: () => void;
  onUpdate: (json: GraphJSON | null) => void;
}

export const Reverse = ({ onClose, onUpdate }: ReverseProps) => {
  const [isOkay, setIsOkay] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (!isOpen) {
        if (isOkay) {

        }
        onClose();
    }
  }, [isOkay, isOpen])

  return (
    <Modal
      title="Вы уверены, что хотите инвертировать граф?"
      onClose={() => setIsOpen(false)}
      onChange={(answer: boolean) => setIsOkay(answer)}
    />
  );
};
