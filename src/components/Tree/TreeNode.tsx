import React, { useState } from "react";
import { ExportUnit } from "../../model/export-unit";
import './TreeNode.css';
import { Search } from "../Search";
import { TreeHeader } from "./TreeHeader";
import { MetricFilter, MetricFilterFormSchema } from "../MetricFilter";
import * as FilterFunctions from './constants/filter-functions';

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

  let nameFilterFunction: (node: ExportUnit) => boolean = () => true;
  let metricFilterFunction: (node: ExportUnit) => boolean = () => true;

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

  const filterChildren = () => {
    const filteredChildren = node.children.filter(c => {
      return nameFilterFunction(c) && metricFilterFunction(c);
    })

    setFilteredChildren(filteredChildren);
  }

  const handleFilterValueChange = (newValue: string) => {
    nameFilterFunction = node => {
      const splitId = node.identifier.split("->");
      const shortId = splitId[splitId.length - 1];
      return shortId.toLowerCase().includes(newValue.toLowerCase())
    };

    filterChildren();
  }

  const setMetricFilterFunction = (change: MetricFilterFormSchema): ((node: ExportUnit) => boolean) => {
    const amount = Number(change.amount);

    switch (change.metric) {
      case 'test': {
        // testAmount
        switch (change.operation) {
          case 'greater':
            return (node: ExportUnit) => FilterFunctions.tag(node, amount);
          case 'less':
            return (node: ExportUnit) => FilterFunctions.tal(node, amount);
          case 'greater-eq':
            return (node: ExportUnit) => FilterFunctions.tage(node, amount);
          case 'less-eq':
            return (node: ExportUnit) => FilterFunctions.tale(node, amount);
          default:
            return () => true
        }
      }
      case 'coverage': {
        // coverage
        switch (change.operation) {
          case 'greater':
            return (node: ExportUnit) => FilterFunctions.cg(node, amount);
          case 'less':
            return (node: ExportUnit) => FilterFunctions.cl(node, amount);
          case 'greater-eq':
            return (node: ExportUnit) => FilterFunctions.cge(node, amount);
          case 'less-eq':
            return (node: ExportUnit) => FilterFunctions.cle(node, amount);
          default:
            return () => true;
        }
      }
      default:
        return () => true;
    }
  }

  const handleMetricFilterChange = (change: MetricFilterFormSchema): void => {
    metricFilterFunction = setMetricFilterFunction(change);

    filterChildren();
  }

  const hasChildren = (): boolean => {
    return !!node.children?.length;
  }

  return (
    <div className="tree-node-component">
      <div className="header">
        <TreeHeader expanded={expanded} onIdentifierClicked={() => onIdentifierClick(node.identifier)} node={node} />

        {hasChildren() && expanded && (
        <div className="filters">
          <Search onValueChanged={handleFilterValueChange} />
          <MetricFilter onChange={handleMetricFilterChange}/>
        </div>)}
      </div>

      {expanded && getNodeChildren()}
    </div>
  );
};
