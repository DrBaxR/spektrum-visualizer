import { ExportUnit } from "../model/export-unit";

export const getData = (): Promise<ExportUnit[]> => {
  return fetch("data.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  }).then(response => response.json());
};
