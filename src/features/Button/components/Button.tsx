import classes from './Button.module.scss';

interface ButtonProps {
  onClick: () => void;
  text: string;
}

export const Button = ({ onClick, text }: ButtonProps) => {
  return (
    <button className={classes.btn} onClick={onClick}>
      {text}
    </button>
  );
};
