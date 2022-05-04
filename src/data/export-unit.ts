export interface ExportUnit {
  identifier: string,
  type: string,
  coverage: number,
  testAmount: number,
  children: ExportUnit[],
}

export const getNodeDisplayIdentifier = (node: ExportUnit): string => {
  const splitIdentifier = node.identifier.split("->");
  return splitIdentifier[splitIdentifier.length - 1];
};
