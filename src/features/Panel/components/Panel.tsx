import classes from './Panel.module.scss';
import Menu from '../assets/Menu.svg';
import { useState } from 'react';
import { Button } from '../../Button';
import { FileUploader } from '../../FileUploader/index';
import { AddVertex, AddEdge, DeleteVertex, DeleteEdge } from '../../actions';
import type { GraphJSON } from '../../../lib/graph/types';

interface PanelProps {
  onFileLoad: (content: string) => void;
  onUpdate: (json: GraphJSON | null) => void;
}

export const Panel = ({ onFileLoad, onUpdate }: PanelProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openAction, setOpenAction] = useState<{
    addVertex: boolean;
    addEdge: boolean;
    deleteVertex: boolean;
    deleteEdge: boolean;
  }>({
    addVertex: false,
    addEdge: false,
    deleteVertex: false,
    deleteEdge: false,
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
          <h2 className={classes.title}>Действия</h2>
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
          <Button
            onClick={() => {
              setIsOpen(false);
              setOpenAction((prev) => ({ ...prev, deleteVertex: true }));
            }}
            text="- Вершина"
          />
          <Button
            onClick={() => {
              setIsOpen(false);
              setOpenAction((prev) => ({ ...prev, deleteEdge: true }));
            }}
            text="- Ребро"
          />
          <Button onClick={() => {}} text="Обращение графа" />
          <Button onClick={() => {}} text="Кратчайшие пути" />
        </div>
      </div>

      {openAction['addVertex'] && (
        <AddVertex
          onClose={() =>
            setOpenAction((prev) => ({ ...prev, addVertex: false }))
          }
          onUpdate={onUpdate}
        />
      )}

      {openAction['addEdge'] && (
        <AddEdge
          onClose={() => setOpenAction((prev) => ({ ...prev, addEdge: false }))}
          onUpdate={onUpdate}
        />
      )}

      {openAction['deleteVertex'] && (
        <DeleteVertex
          onClose={() =>
            setOpenAction((prev) => ({ ...prev, deleteVertex: false }))
          }
          onUpdate={onUpdate}
        />
      )}

      {openAction['deleteEdge'] && (
        <DeleteEdge
          onClose={() =>
            setOpenAction((prev) => ({ ...prev, deleteEdge: false }))
          }
          onUpdate={onUpdate}
        />
      )}
    </>
  );
};
