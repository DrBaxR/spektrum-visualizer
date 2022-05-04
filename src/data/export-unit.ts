export interface ExportUnit {
  identifier: string,
  type: string,
  coverage: number,
  testAmount: number,
  children: ExportUnit[],
}
