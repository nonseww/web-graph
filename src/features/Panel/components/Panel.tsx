import classes from './Panel.module.scss';
import Menu from '../assets/Menu.svg';
import { useState } from 'react';
import { Button } from '../../Button';
import { FileUploader } from '../../FileUploader/index';
import { AddVertex, AddEdge } from '../../actions';

interface PanelProps {
  onFileLoad: (content: string) => void;
}

export const Panel = ({ onFileLoad }: PanelProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openAction, setOpenAction] = useState<{
    addVertex: boolean;
    addEdge: boolean;
  }>({
    addVertex: false,
    addEdge: false,
  });

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
          <Button
            onClick={() => {
              setIsOpen(false);
              setOpenAction((prev) => ({ ...prev, addVertex: true }));
            }}
            text="+ Вершина"
          />
          <Button
            onClick={() => {
              setIsOpen(false);
              setOpenAction((prev) => ({ ...prev, addEdge: true }));
            }}
            text="+ Ребро"
          />
          <Button onClick={() => {}} text="- Вершина" />
          <Button onClick={() => {}} text="- Ребро" />
          <Button onClick={() => {}} text="Обращение графа" />
          <Button onClick={() => {}} text="Кратчайшие пути" />
        </div>
      </div>

      {openAction['addVertex'] && (
        <AddVertex
          onClose={() =>
            setOpenAction((prev) => ({ ...prev, addVertex: false }))
          }
        />
      )}

      {openAction['addEdge'] && (
        <AddEdge
          onClose={() => setOpenAction((prev) => ({ ...prev, addEdge: false }))}
        />
      )}
    </>
  );
};
