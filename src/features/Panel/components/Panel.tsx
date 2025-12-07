import classes from './Panel.module.scss';
import Menu from '../assets/Menu.svg';
import { useState } from 'react';
// import { Button } from '../../Button';
import { FileUploader } from '../../FileUploader/index';

interface PanelProps {
  onFileLoad: (content: string) => void;
}

export const Panel = ({ onFileLoad }: PanelProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <img
        src={Menu}
        className={classes.menu}
        onClick={() => setIsOpen((prev) => !prev)}
      ></img>
      <div className={`${classes.mainDiv} ${isOpen ? classes.open : ''}`}>
        <div className={classes.innerContainer}>
          <FileUploader onFileLoad={onFileLoad} />
        </div>
      </div>
    </>
  );
};
