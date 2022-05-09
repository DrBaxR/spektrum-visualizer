/* eslint-disable react/jsx-key */
/* eslint-disable react/react-in-jsx-scope */
import { GrProjects, GrStatusUnknown } from "react-icons/gr";
import {
  VscSymbolNamespace,
  VscFile,
  VscSymbolClass,
  VscSymbolMethod,
  VscPackage
} from "react-icons/vsc";

export enum UnitTypes {
  project = "PROJECT",
  file = "FILE",
  namespace = "NAMESPACE",
  class = "CLASS",
  method = "METHOD",
  package = "PACKAGE"
}

const iconTypeMap = new Map([
  [UnitTypes.project, <GrProjects />],
  [UnitTypes.file, <VscFile />],
  [UnitTypes.namespace, <VscSymbolNamespace />],
  [UnitTypes.class, <VscSymbolClass />],
  [UnitTypes.method, <VscSymbolMethod />],
  [UnitTypes.package, <VscPackage />]
]);

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
