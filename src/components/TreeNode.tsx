import React, { useState } from "react";
import { ExportUnit, getNodeDisplayIdentifier, getUnitIcon } from "../model/export-unit";
import './TreeNode.css';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'
import { ProgressBar } from "./ProgressBar";
import { Search } from "./Search";

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
  const [filteredChildren, setFilteredChildren] = useState(node.children);

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
        {filteredChildren?.map(child => (
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

  const handleFilterValueChange = (newValue: string) => {
    const filteredChildren = node.children.filter(c => {
      const splitId = c.identifier.split("->");
      const shortId = splitId[splitId.length - 1];
      return shortId.toLowerCase().includes(newValue.toLowerCase());
    })

    setFilteredChildren(filteredChildren);
  }

  const hasChildren = (): boolean => {
    return !!node.children?.length;
  }

  return (
    <div className="tree-node-component">
      <div className="header">
        <div className="identifier" onClick={() => handleIdentifierClick()}>
          {getUnitIcon(node)}
          <div className="coverage-metric">
            <ProgressBar progress={node.coverage} />
          </div>
          <div className="coverage-metric">
            <ProgressBar progress={node.testAmount} />
          </div>
          {hasChildren() && <span className="expand-icon">{expanded ? <IoIosArrowDown /> : <IoIosArrowForward />}</span>}
          {<div className={!hasChildren() ? "end-node-identifier" : ""}>{getNodeDisplayIdentifier(node)}</div>}
        </div>
        {hasChildren() && expanded && <Search onValueChanged={handleFilterValueChange} />}
      </div>

      {expanded && getNodeChildren()}
    </div>
  );
};
