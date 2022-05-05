/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-key */
import { GrProjects } from "react-icons/gr";
import {
  VscSymbolNamespace,
  VscFile,
  VscSymbolClass,
  VscSymbolMethod
} from "react-icons/vsc";
import { UnitTypes } from "../model/export-unit";

export const iconTypeMap = new Map([
  [UnitTypes.project, <GrProjects />],
  [UnitTypes.file, <VscFile />],
  [UnitTypes.namespace, <VscSymbolNamespace />],
  [UnitTypes.class, <VscSymbolClass />],
  [UnitTypes.method, <VscSymbolMethod />]
]);
