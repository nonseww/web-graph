import classes from './Button.module.scss';

interface ButtonProps {
  onClick: () => void;
  text: string;
  className?: string;
}

export const Button = ({ onClick, text, className }: ButtonProps) => {
  return (
    <button className={`${classes.btn} ${className ?? ''}`} onClick={onClick}>
      {text}
    </button>
  );
};
