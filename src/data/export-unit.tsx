/* eslint-disable react/jsx-key */
/* eslint-disable react/react-in-jsx-scope */
import { GrProjects, GrStatusUnknown } from "react-icons/gr";
import {
  VscSymbolNamespace,
  VscFile,
  VscSymbolClass,
  VscSymbolMethod
} from "react-icons/vsc";

enum UnitTypes {
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

const iconMap = new Map([
  [UnitTypes.project, <GrProjects />],
  [UnitTypes.file, <VscFile />],
  [UnitTypes.namespace, <VscSymbolNamespace />],
  [UnitTypes.class, <VscSymbolClass />],
  [UnitTypes.method, <VscSymbolMethod />]
]);
export const getUnitIcon = (unit: ExportUnit): JSX.Element => {
  const iconNullable = iconMap.get(unit.type);
  const icon = iconNullable !== undefined ? iconNullable : <GrStatusUnknown />;
  return icon;
};
