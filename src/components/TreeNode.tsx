import React, { useState } from "react";
import { ExportUnit } from "../data/export-unit";

interface Props {
  node: ExportUnit;
  expanded: boolean;
  onIdentifierClick: (identifier: string) => void;
}

export const TreeNode: React.FC<Props> = ({ node, expanded, onIdentifierClick }) => {
  const [childrenNodesExpanded, setChildrenNodesExpanded] = useState(() => {
    const map = new Map<string, boolean>();

    node.children?.forEach(child => map.set(child.identifier, false));

    return map;
  });

  const getNodeDisplayIdentifier = (node: ExportUnit): string => {
    const splitIdentifier = node.identifier.split("->");
    return splitIdentifier[splitIdentifier.length - 1];
  };

  const isChildExpanded = (child: ExportUnit): boolean => {
    return !!childrenNodesExpanded.get(child.identifier);
  };

  const handleChildIdentifierClick = (identifier: string): void => {
    setChildrenNodesExpanded(prev => {
      const newMap = new Map(prev);

      newMap.set(identifier, !newMap.get(identifier));

      return newMap;
    })
  }

  const getNodeChildren = () => {
    return (
      <ul>
        {node.children?.map(child => (
          <li key={child.identifier}>
            <TreeNode node={child} expanded={isChildExpanded(child)} onIdentifierClick={handleChildIdentifierClick}/>
          </li>
        ))}
      </ul>
    );
  };

  const handleIdentifierClick = () => {
    onIdentifierClick(node.identifier)
  }

  return (
    <div>
      <div className="identifier" onClick={() => handleIdentifierClick()}>{getNodeDisplayIdentifier(node)}</div>
      {expanded && getNodeChildren()}
    </div>
  );
};
