import React, { useState } from "react";
import { ExportUnit } from "../data/export-unit";
import "../styles/Tree.css";

interface Props {
  nodes: ExportUnit[];
}

export const Tree: React.FC<Props> = ({ nodes }) => {

  const [expanded, setExpanded] = useState(false);

  const getNodeDisplayIdentifier = (node: ExportUnit): string => {
    const splitIdentifier = node.identifier.split("->");
    return splitIdentifier[splitIdentifier.length - 1];
  }

  const getNodeChildren = (node: ExportUnit) => {
    if (node.children?.length) {
      return expanded && <Tree nodes={node.children}/>
    }
  }

  const mapNode = (node: ExportUnit) => {
    return (
      <li key={node.identifier}>
        <div>{getNodeDisplayIdentifier(node)}</div>
        {getNodeChildren(node)}
      </li>
    );
  };

  return (
    <div>
      <ul>{nodes.map(n => mapNode(n))}</ul>
    </div>
  );
};
