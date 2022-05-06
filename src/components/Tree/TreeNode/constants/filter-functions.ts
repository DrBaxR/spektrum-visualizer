import { ExportUnit } from "../../../../model/export-unit";

export const tag = (unit: ExportUnit, amount: number): boolean => {
  return unit.testAmount * 100 > amount
}

export const tal = (unit: ExportUnit, amount: number): boolean => {
  return unit.testAmount * 100 < amount
}

export const tage = (unit: ExportUnit, amount: number): boolean => {
  return unit.testAmount * 100 >= amount
}

export const tale = (unit: ExportUnit, amount: number): boolean => {
  return unit.testAmount * 100 <= amount
}

export const cg = (unit: ExportUnit, amount: number): boolean => {
  return unit.coverage * 100 > amount
}

export const cl = (unit: ExportUnit, amount: number): boolean => {
  return unit.coverage * 100 < amount
}

export const cge = (unit: ExportUnit, amount: number): boolean => {
  return unit.coverage * 100 >= amount
}

export const cle = (unit: ExportUnit, amount: number): boolean => {
  return unit.coverage * 100 <= amount
}
