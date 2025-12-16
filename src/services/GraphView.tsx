import { useEffect, useRef } from 'react';
import { Network } from 'vis-network';
import 'vis-network/styles/vis-network.css';
import type { GraphJSON } from '../lib/graph/types.ts';
import { pastelColors } from '../data/node_colors.ts';

const getRandomColor = (): string => {
  const index = Math.floor(Math.random() * pastelColors.length);
  return pastelColors[index];
};

export const GraphView = ({ nodes, edges, directed }: GraphJSON) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const uniqueEdges = [];
    const seen = new Set();

    for (const e of edges) {
      const a = e.source;
      const b = e.target;

      const key = directed ? `${a}->${b}` : [a, b].sort().join('--');

      if (!seen.has(key)) {
        seen.add(key);
        uniqueEdges.push(e);
      }
    }

    const data = {
      nodes: nodes.map((v) => ({
        id: v.id,
        label: v.id,
        shape: 'ellipse',
        color: getRandomColor(),
      })),
      edges: uniqueEdges.map((e) => ({
        from: e.source,
        to: e.target,
        label: (() => {
          if (e.label && e.weight !== undefined && e.label !== 'no label')
            return `${e.weight} [${e.label}]`;
          if (e.label && e.label !== 'no label') return e.label;
          if (e.weight !== undefined) return String(e.weight);
          return '';
        })(),
        arrows: directed ? 'to' : undefined,
        width: Math.min(Math.max(e.weight ?? 1, 2), 10),
      })),
    };

    const options = {
      physics: {
        enabled: true,
        stabilization: true,
        barnesHut: {
          gravitationalConstant: -5000,
          centralGravity: 0.3,
          springLength: 400,
        },
      },
      edges: {
        font: { align: 'middle', size: 35 },
      },
      nodes: {
        font: { size: 40 },
      },
    };

    const network = new Network(containerRef.current, data, options);

    return () => network.destroy();
  }, [nodes, edges, directed]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        border: '1px solid #aaa',
        borderRadius: '8px',
      }}
    />
  );
};
