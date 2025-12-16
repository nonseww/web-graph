import classes from './Panel.module.scss';
import Menu from '../assets/Menu.svg';
import { useState } from 'react';
import { Button } from '../../Button';
import { FileUploader } from '../../FileUploader/index';
import {
  AddVertex,
  AddEdge,
  DeleteVertex,
  DeleteEdge,
  GetIndegree,
  GetOutdegree,
  GetDegree,
  Reverse,
  ShortestPaths,
  CheckCycles,
  FindUnreachable,
  Kruskal,
  EccCenterRaduis,
  MaxFlow,
  IsNegCycleHere,
} from '../../actions';
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
    indegree: boolean;
    outdegree: boolean;
    degree: boolean;
    reverse: boolean;
    shortest: boolean;
    checkCycles: boolean;
    findUnreachable: boolean;
    kruskal: boolean;
    centerRad: boolean;
    negCycle: boolean;
    maxflow: boolean;
  }>({
    addVertex: false,
    addEdge: false,
    deleteVertex: false,
    deleteEdge: false,
    indegree: false,
    outdegree: false,
    degree: false,
    reverse: false,
    shortest: false,
    checkCycles: false,
    findUnreachable: false,
    kruskal: false,
    centerRad: false,
    negCycle: false,
    maxflow: false,
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
          <Button
            onClick={() => {
              setIsOpen(false);
              setOpenAction((prev) => ({ ...prev, indegree: true }));
            }}
            text="Полустепень захода"
          />
          <Button
            onClick={() => {
              setIsOpen(false);
              setOpenAction((prev) => ({ ...prev, outdegree: true }));
            }}
            text="Полустепень исхода"
          />
          <Button
            onClick={() => {
              setIsOpen(false);
              setOpenAction((prev) => ({ ...prev, degree: true }));
            }}
            text="Степень вершины"
          />
          <Button
            onClick={() => {
              setIsOpen(false);
              setOpenAction((prev) => ({ ...prev, reverse: true }));
            }}
            text="Обращение графа"
          />
          <Button
            onClick={() => {
              setIsOpen(false);
              setOpenAction((prev) => ({ ...prev, shortest: true }));
            }}
            text="Кратчайшие пути"
          />

          <Button
            onClick={() => {
              setIsOpen(false);
              setOpenAction((prev) => ({ ...prev, checkCycles: true }));
            }}
            text="Проверить на ацикличность"
          />

          <Button
            onClick={() => {
              setIsOpen(false);
              setOpenAction((prev) => ({ ...prev, findUnreachable: true }));
            }}
            text="Найти недостижимые"
          />

          <Button
            onClick={() => {
              setIsOpen(false);
              setOpenAction((prev) => ({ ...prev, kruskal: true }));
            }}
            text="Построить остов"
          />

          <Button
            onClick={() => {
              setIsOpen(false);
              setOpenAction((prev) => ({ ...prev, centerRad: true }));
            }}
            text="Центр, эксцентриситет, радиус"
          />

          <Button
            onClick={() => {
              setIsOpen(false);
              setOpenAction((prev) => ({ ...prev, negCycle: true }));
            }}
            text="Отрицательный цикл"
          />

          <Button
            onClick={() => {
              setIsOpen(false);
              setOpenAction((prev) => ({ ...prev, maxflow: true }));
            }}
            text="Максимальный поток"
          />
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

      {openAction['indegree'] && (
        <GetIndegree
          onClose={() =>
            setOpenAction((prev) => ({ ...prev, indegree: false }))
          }
        />
      )}

      {openAction['outdegree'] && (
        <GetOutdegree
          onClose={() =>
            setOpenAction((prev) => ({ ...prev, outdegree: false }))
          }
        />
      )}

      {openAction['degree'] && (
        <GetDegree
          onClose={() => setOpenAction((prev) => ({ ...prev, degree: false }))}
        />
      )}

      {openAction['reverse'] && (
        <Reverse
          onClose={() => setOpenAction((prev) => ({ ...prev, reverse: false }))}
        />
      )}

      {openAction['shortest'] && (
        <ShortestPaths
          onClose={() =>
            setOpenAction((prev) => ({ ...prev, shortest: false }))
          }
        />
      )}

      {openAction['checkCycles'] && (
        <CheckCycles
          onClose={() =>
            setOpenAction((prev) => ({ ...prev, checkCycles: false }))
          }
        />
      )}

      {openAction['findUnreachable'] && (
        <FindUnreachable
          onClose={() =>
            setOpenAction((prev) => ({ ...prev, findUnreachable: false }))
          }
        />
      )}

      {openAction['kruskal'] && (
        <Kruskal
          onClose={() => setOpenAction((prev) => ({ ...prev, kruskal: false }))}
        />
      )}

      {openAction['centerRad'] && (
        <EccCenterRaduis
          onClose={() =>
            setOpenAction((prev) => ({ ...prev, centerRad: false }))
          }
        />
      )}

      {openAction['negCycle'] && (
        <IsNegCycleHere
          onClose={() =>
            setOpenAction((prev) => ({ ...prev, negCycle: false }))
          }
        />
      )}

      {openAction['maxflow'] && (
        <MaxFlow
          onClose={() => setOpenAction((prev) => ({ ...prev, maxflow: false }))}
        />
      )}
    </>
  );
};
