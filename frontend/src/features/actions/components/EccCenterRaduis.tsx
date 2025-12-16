import { eccCenterRaduis } from '../../../lib/graph/graphModule';
import { useEffect } from 'react';
import { useNotify } from '../../../hooks/useNotify';
import type { EccentricityResult } from '../../../lib/graph/types';

interface EccCenterRaduisProps {
  onClose: () => void;
}

export const EccCenterRaduis = ({ onClose }: EccCenterRaduisProps) => {
  const { notify } = useNotify();

  useEffect(() => {
    (async () => {
      const result: EccentricityResult | null = await eccCenterRaduis();
      if (!result) {
        notify({ type: 'error', message: null });
      } else {
        const eccentricities = Object.entries(result.eccentricity)
          .map(([vertex, value]) => `${vertex}: ${value}`)
          .join('\n');

        const message =
          `Эксцентриситет вершин:\n${eccentricities}\n\n` +
          `Радиус графа: ${result.radius}\n` +
          `Центр графа: ${result.center.join(', ')}`;

        notify({
          type: 'result',
          message: message,
        });
      }
      onClose();
    })();
  }, []);

  return <></>;
};
