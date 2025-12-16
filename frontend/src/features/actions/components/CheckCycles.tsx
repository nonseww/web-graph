import { checkCycles } from '../../../lib/graph/graphModule';
import { useEffect } from 'react';
import { useNotify } from '../../../hooks/useNotify';

interface CheckCyclesProps {
  onClose: () => void;
}

export const CheckCycles = ({ onClose }: CheckCyclesProps) => {
  const { notify } = useNotify();

  useEffect(() => {
    (async () => {
      const result = await checkCycles();
      notify({
        type: 'result',
        message: result ? 'В графе есть цикл' : 'Граф ацикличен',
      });
      onClose();
    })();
  }, []);

  return <></>;
};
