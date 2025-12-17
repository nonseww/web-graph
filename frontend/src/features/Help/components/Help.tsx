import { useState } from 'react';
import HelpSVG from '../assets/Help.svg';
import classes from './Help.module.scss';
import { Info } from '../../Info/index';
import { Button } from '../../Button';
import * as HELP_INFO from '../../../data/help';

export const Help = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isArticleOpen, setIsArticleOpen] = useState<boolean>(false);
  const [openAction, setOpenAction] = useState<{
    bfs: boolean;
    dfs: boolean;
    reverseGraph: boolean;
    cycles: boolean;
    eccentricity: boolean;
    degree: boolean;
    spanningTree: boolean;
    unreachable: boolean;
    dijkstra: boolean;
    bellmanFord: boolean;
    floydWarshall: boolean;
    goldbergRao: boolean;
  }>({
    bfs: false,
    dfs: false,
    reverseGraph: false,
    cycles: false,
    eccentricity: false,
    degree: false,
    spanningTree: false,
    unreachable: false,
    dijkstra: false,
    bellmanFord: false,
    floydWarshall: false,
    goldbergRao: false,
  });

  const onCloseArticle = () => {
    setOpenAction({
      bfs: false,
      dfs: false,
      reverseGraph: false,
      cycles: false,
      eccentricity: false,
      degree: false,
      spanningTree: false,
      unreachable: false,
      dijkstra: false,
      bellmanFord: false,
      floydWarshall: false,
      goldbergRao: false,
    });
    setIsArticleOpen(false);
  };

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
        <Info
          onClose={() => setIsOpen(false)}
          isArticle={isArticleOpen}
          onCloseArticle={onCloseArticle}
        >
          {!isArticleOpen && (
            <div>
              <Button
                onClick={() => {
                  setIsArticleOpen(true);
                  setOpenAction((prev) => ({ ...prev, bfs: true }));
                }}
                text="BFS"
              />

              <Button
                onClick={() => {
                  setIsArticleOpen(true);
                  setOpenAction((prev) => ({ ...prev, dfs: true }));
                }}
                text="DFS"
              />

              <Button
                onClick={() => {
                  setIsArticleOpen(true);
                  setOpenAction((prev) => ({ ...prev, reverseGraph: true }));
                }}
                text="Обращение графа"
              />

              <Button
                onClick={() => {
                  setIsArticleOpen(true);
                  setOpenAction((prev) => ({ ...prev, cycles: true }));
                }}
                text="Циклы"
              />

              <Button
                onClick={() => {
                  setIsArticleOpen(true);
                  setOpenAction((prev) => ({ ...prev, eccentricity: true }));
                }}
                text="Эксцентриситет, радиус, центр"
              />

              <Button
                onClick={() => {
                  setIsArticleOpen(true);
                  setOpenAction((prev) => ({ ...prev, degree: true }));
                }}
                text="Степень вершины"
              />

              <Button
                onClick={() => {
                  setIsArticleOpen(true);
                  setOpenAction((prev) => ({ ...prev, spanningTree: true }));
                }}
                text="Остовное дерево (Краскал)"
              />

              <Button
                onClick={() => {
                  setIsArticleOpen(true);
                  setOpenAction((prev) => ({ ...prev, unreachable: true }));
                }}
                text="Недостижимые вершины"
              />

              <Button
                onClick={() => {
                  setIsArticleOpen(true);
                  setOpenAction((prev) => ({ ...prev, dijkstra: true }));
                }}
                text="Алгоритм Дейкстры"
              />

              <Button
                onClick={() => {
                  setIsArticleOpen(true);
                  setOpenAction((prev) => ({ ...prev, bellmanFord: true }));
                }}
                text="Беллман–Форд"
              />

              <Button
                onClick={() => {
                  setIsArticleOpen(true);
                  setOpenAction((prev) => ({ ...prev, floydWarshall: true }));
                }}
                text="Флойд–Уоршелл"
              />

              <Button
                onClick={() => {
                  setIsArticleOpen(true);
                  setOpenAction((prev) => ({ ...prev, goldbergRao: true }));
                }}
                text="Голдберг–Рао"
              />
            </div>
          )}

          {openAction.bfs && (
            <div dangerouslySetInnerHTML={{ __html: HELP_INFO.BFS_INFO }} />
          )}

          {openAction.dfs && (
            <div dangerouslySetInnerHTML={{ __html: HELP_INFO.DFS_INFO }} />
          )}

          {openAction.reverseGraph && (
            <div
              dangerouslySetInnerHTML={{ __html: HELP_INFO.REVERSE_GRAPH_INFO }}
            />
          )}

          {openAction.cycles && (
            <div dangerouslySetInnerHTML={{ __html: HELP_INFO.CYCLES_INFO }} />
          )}

          {openAction.eccentricity && (
            <div
              dangerouslySetInnerHTML={{ __html: HELP_INFO.ECCENTRICITY_INFO }}
            />
          )}

          {openAction.degree && (
            <div dangerouslySetInnerHTML={{ __html: HELP_INFO.DEGREE_INFO }} />
          )}

          {openAction.spanningTree && (
            <div
              dangerouslySetInnerHTML={{
                __html: HELP_INFO.MST_KRUSKAL_INFO,
              }}
            />
          )}

          {openAction.unreachable && (
            <div
              dangerouslySetInnerHTML={{
                __html: HELP_INFO.UNREACHABLE_INFO,
              }}
            />
          )}

          {openAction.dijkstra && (
            <div
              dangerouslySetInnerHTML={{ __html: HELP_INFO.DIJKSTRA_INFO }}
            />
          )}

          {openAction.bellmanFord && (
            <div
              dangerouslySetInnerHTML={{ __html: HELP_INFO.BELLMAN_FORD_INFO }}
            />
          )}

          {openAction.floydWarshall && (
            <div
              dangerouslySetInnerHTML={{
                __html: HELP_INFO.FLOYD_WARSHALL_INFO,
              }}
            />
          )}

          {openAction.goldbergRao && (
            <div
              dangerouslySetInnerHTML={{ __html: HELP_INFO.GOLDBERG_RAO_INFO }}
            />
          )}
        </Info>
      )}
    </>
  );
};
