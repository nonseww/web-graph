import classes from './Popup.module.scss';
import { Button } from '../../Button';
import Alert from '../assets/Alert.svg';
import { useEffect } from 'react';
import { useEnterKey } from '../../../hooks/useEnterKey';

interface PopupProps {
  type: 'success' | 'error' | 'result';
  message: string | null;
  onClose: () => void;
}

export const Popup = ({ type, message, onClose }: PopupProps) => {
  useEnterKey(onClose);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        onClose();
      },
      type === 'result' ? 100000 : 3000
    );
    const audio = new Audio(
      type === 'error' ? 'notif-error.mp3' : '/notif.mp3'
    );
    audio.play();

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={classes.mainWindow}>
      <div className={classes.inner}>
        <div className={classes.errorBox}>
          {type === 'error' && <img src={Alert} className={classes.alert} />}
          <h3 className={classes.title}>{type.toUpperCase()}</h3>
        </div>
        <p className={classes.message}>{message ?? 'Неизвестная ошибка.'}</p>
        <Button onClick={onClose} text="Понял." className={classes.btn} />
      </div>
    </div>
  );
};
