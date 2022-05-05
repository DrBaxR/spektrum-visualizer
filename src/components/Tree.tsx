import React, { useState } from "react";
import { ExportUnit } from "../model/export-unit";
import "./Tree.css";
import { TreeNode } from "./TreeNode";

interface Props {
  nodes: ExportUnit[];
}

export const Tree: React.FC<Props> = ({ nodes }) => {
  const [rootsExpanded, setRootsExpanded] = useState(() => {
    const map = new Map<string, boolean>();

    nodes.forEach(node => map.set(node.identifier, false));

    return map;
  });

  const isRootExpanded = (node: ExportUnit): boolean => {
    return !!rootsExpanded.get(node.identifier);
  };

  const handleRootIdentifierClick = (identifier: string): void => {
    setRootsExpanded(prev => {
      const newMap = new Map(prev);

      newMap.set(identifier, !newMap.get(identifier));

      return newMap;
    });
  };

  const mapNode = (node: ExportUnit) => {
    return (
      <li key={node.identifier}>
        <TreeNode
          expanded={isRootExpanded(node)}
          node={node}
          onIdentifierClick={handleRootIdentifierClick}
        />
      </li>
    );
  };

  return (
    <div className="tree-component">
      <ul>{nodes.map(n => mapNode(n))}</ul>
    </div>
  );
};
