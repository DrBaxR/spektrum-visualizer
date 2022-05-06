import { ExportUnit } from "../../../../model/export-unit";
import { MetricFilterFormSchema } from "../../../MetricFilter";
import * as FilterFunctions from "../constants/filter-functions";

export const getMetricFilterFunction = (
  change: MetricFilterFormSchema
): ((node: ExportUnit) => boolean) => {
  const amount = Number(change.amount);

  switch (change.metric) {
    case "test": {
      // testAmount
      switch (change.operation) {
        case "greater":
          return (node: ExportUnit) => FilterFunctions.tag(node, amount);
        case "less":
          return (node: ExportUnit) => FilterFunctions.tal(node, amount);
        case "greater-eq":
          return (node: ExportUnit) => FilterFunctions.tage(node, amount);
        case "less-eq":
          return (node: ExportUnit) => FilterFunctions.tale(node, amount);
        default:
          return () => true;
      }
    }
    case "coverage": {
      // coverage
      switch (change.operation) {
        case "greater":
          return (node: ExportUnit) => FilterFunctions.cg(node, amount);
        case "less":
          return (node: ExportUnit) => FilterFunctions.cl(node, amount);
        case "greater-eq":
          return (node: ExportUnit) => FilterFunctions.cge(node, amount);
        case "less-eq":
          return (node: ExportUnit) => FilterFunctions.cle(node, amount);
        default:
          return () => true;
      }
    }
    default:
      return () => true;
  }
};
