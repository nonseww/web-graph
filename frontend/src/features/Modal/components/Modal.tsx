import classes from './Modal.module.scss';
import X from '../../../assets/X.svg';

interface ModalProps {
  title: string;
  onClose: () => void;
  onChange: (answer: boolean) => void;
}

export const Modal = ({ title, onClose, onChange }: ModalProps) => {
  return (
    <div className={classes.cover}>
      <div className={classes.dialogWindow}>
        <div className={classes.inner}>
          <img src={X} className={classes.x} onClick={onClose} />
          <h2 className={classes.title}>{title}</h2>
        </div>
      </div>
    </div>
  );
};
