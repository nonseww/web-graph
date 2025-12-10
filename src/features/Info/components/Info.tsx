import classes from './Info.module.scss';
import X from '../../../assets/X.svg';

interface InfoProps {
  children: React.ReactNode;
  onClose: () => void;
}

export const Info = ({ children, onClose }: InfoProps) => {
  return (
    <div className={classes.cover}>
      <div className={classes.dialogWindow}>
        <div className={classes.inner}>
          <img src={X} className={classes.x} onClick={onClose} />
          <h2 className={classes.title}>Справка</h2>
          {children}
        </div>
      </div>
    </div>
  );
};
