import { ExportUnit } from "../../../../model/export-unit";

export const getNameFilterFunction = (
  newValue: string
): ((node: ExportUnit) => boolean) => {
  return node => {
    const splitId = node.identifier.split("->");
    const shortId = splitId[splitId.length - 1];
    return shortId.toLowerCase().includes(newValue.toLowerCase());
  };
};
