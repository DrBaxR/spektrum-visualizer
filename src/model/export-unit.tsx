/* eslint-disable react/jsx-key */
/* eslint-disable react/react-in-jsx-scope */
import { GrStatusUnknown } from "react-icons/gr";
import { iconTypeMap } from "../constants/type-icon-map";

export enum UnitTypes {
  project = "PROJECT",
  file = "FILE",
  namespace = "NAMESPACE",
  class = "CLASS",
  method = "METHOD"
}

export interface ExportUnit {
  identifier: string;
  type: UnitTypes;
  coverage: number;
  testAmount: number;
  children: ExportUnit[];
}

export const getNodeDisplayIdentifier = (node: ExportUnit): string => {
  const splitIdentifier = node.identifier.split("->");
  return splitIdentifier[splitIdentifier.length - 1];
};

export const getUnitIcon = (unit: ExportUnit): JSX.Element => {
  const iconNullable = iconTypeMap.get(unit.type);
  const icon = iconNullable !== undefined ? iconNullable : <GrStatusUnknown />;
  return icon;
};
