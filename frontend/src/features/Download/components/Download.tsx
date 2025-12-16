import DonwloadSVG from '../assets/Download.svg';
import classes from './Download.module.scss';
import { getGraphJSON } from '../../../lib/graph/graphModule';
import { convertToGraphString } from '../../../utils/convertToGraphString';
import { useNotify } from '../../../hooks/useNotify';

export const Download = () => {
  const { notify } = useNotify();

  const handleClick = async () => {
    const graphJson = await getGraphJSON();
    if (!graphJson) {
      notify({ type: 'error', message: 'Ошибка скачивания графа!' });
      return;
    }
    const graphTxt = convertToGraphString(graphJson);
    const blob = new Blob([graphTxt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'graph.txt';
    link.click();

    URL.revokeObjectURL(url);
    notify({ type: 'success', message: 'Граф скачан успешно' });
  };

  return (
    <div className={classes.imgBox}>
      <img
        src={DonwloadSVG}
        className={classes.downloadSvg}
        onClick={handleClick}
      />
    </div>
  );
};
