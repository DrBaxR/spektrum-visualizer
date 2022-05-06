import React from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { ExportUnit, getNodeDisplayIdentifier, getUnitIcon } from "../../../model/export-unit";
import { ProgressBar } from "../../ProgressBar";

interface Props {
  onIdentifierClicked: () => void;
  node: ExportUnit;
  expanded: boolean;
}

export const TreeHeader: React.FC<Props> = ({ onIdentifierClicked, node, expanded }) => {
  const hasChildren = () => {
    return !!node.children?.length;
  }

  return (
    <div className="identifier" onClick={onIdentifierClicked}>
      {getUnitIcon(node)}
      <div className="coverage-metric">
        <ProgressBar progress={node.coverage} />
      </div>
      <div className="coverage-metric">
        <ProgressBar progress={node.testAmount} />
      </div>
      {hasChildren() && (
        <span className="expand-icon">
          {expanded ? <IoIosArrowDown /> : <IoIosArrowForward />}
        </span>
      )}
      {
        <div className={!hasChildren() ? "end-node-identifier" : ""}>
          {getNodeDisplayIdentifier(node)}
        </div>
      }
    </div>
  );
};
