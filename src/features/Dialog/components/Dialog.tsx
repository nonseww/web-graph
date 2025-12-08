import classes from './Dialog.module.scss';
import X from '../assets/X.svg';

interface DialogProps {
  onClose: () => void;
  title: string;
  children?: import('react').ReactNode;
}

export const Dialog = ({ onClose, title, children }: DialogProps) => {
  return (
    <div className={classes.cover}>
      <div className={classes.dialogWindow}>
        <div className={classes.inner}>
          <img src={X} className={classes.x} onClick={onClose} />
          <h2 className={classes.title}>{title}</h2>
          <div className={classes.child}>{children}</div>
        </div>
      </div>
    </div>
  );
};
