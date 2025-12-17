import classes from './Info.module.scss';
import X from '../../../assets/X.svg';
import Back from '../../../assets/Back.svg';

interface InfoProps {
  children: React.ReactNode;
  onClose: () => void;
  isArticle: boolean;
  onCloseArticle?: () => void;
}

export const Info = ({
  children,
  onClose,
  isArticle,
  onCloseArticle,
}: InfoProps) => {
  return (
    <div className={classes.cover}>
      <div className={classes.dialogWindow}>
        <div className={classes.inner}>
          <img src={X} className={classes.x} onClick={onClose} />
          {isArticle && (
            <img src={Back} className={classes.back} onClick={onCloseArticle} />
          )}
          <h2 className={classes.title}>Справка</h2>
          {children}
        </div>
      </div>
    </div>
  );
};
