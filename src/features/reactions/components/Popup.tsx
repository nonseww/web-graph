import classes from './Popup.module.scss';
import { Button } from '../../Button';

interface PopupProps {
  type: 'success' | 'error';
  message: string | null;
  onClose: () => void;
}

export const Popup = ({ type, message, onClose }: PopupProps) => {
  return (
    <div className={classes.mainWindow}>
      <div className={classes.inner}>
        <h3 className={classes.title}>{type.toUpperCase()}</h3>
        <p className={classes.message}>{message ?? 'Неизвестная ошибка.'}</p>
        <Button onClick={onClose} text="Понял." className={classes.btn} />
      </div>
    </div>
  );
};
