import React, { useState } from "react";
import { ExportUnit, getNodeDisplayIdentifier } from "../data/export-unit";
import '../styles/TreeNode.css';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'

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
          <li className="children" key={child.identifier}>
            <TreeNode node={child} expanded={isChildExpanded(child)} onIdentifierClick={handleChildIdentifierClick}/>
          </li>
        ))}
      </ul>
    );
  };

  const handleIdentifierClick = () => {
    onIdentifierClick(node.identifier)
  }

  const hasChildren = (): boolean => {
    return !!node.children?.length;
  }

  return (
    <div>
      <div className="identifier" onClick={() => handleIdentifierClick()}>
        {hasChildren() && <span className="expand-icon">{expanded ? <IoIosArrowDown /> : <IoIosArrowForward />}</span>}
        {getNodeDisplayIdentifier(node)}
      </div>
      {expanded && getNodeChildren()}
    </div>
  );
};
