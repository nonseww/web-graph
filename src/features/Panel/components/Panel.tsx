import classes from './Panel.module.scss';
import Menu from '../assets/Menu.svg';
import { useState } from 'react';

export const Panel = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <img
        src={Menu}
        className={classes.menu}
        onClick={() => setIsOpen((prev) => !prev)}
      ></img>
      <div className={`${classes.mainDiv} ${isOpen ? classes.open : ''}`}>
        Panel!
      </div>
    </>
  );
};
