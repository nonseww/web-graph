import { useState } from 'react';
import HelpSVG from '../assets/Help.svg';
import classes from './Help.module.scss';
import { Info } from '../../Info/index';

export const Help = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className={classes.imgBox}>
        <img
          src={HelpSVG}
          className={classes.helpSvg}
          onClick={() => setIsOpen((prev) => !prev)}
        />
      </div>

      {isOpen && (
        <Info onClose={() => setIsOpen(false)}>
          <p>Это будет справка</p>
        </Info>
      )}
    </>
  );
};
