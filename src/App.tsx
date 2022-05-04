import React from "react";
import { Tree } from "./components/Tree";
import { ExportUnit } from "./data/export-unit";

interface Props {
  data: ExportUnit[];
}

export const App: React.FC<Props> = ({ data }) => {
  return <Tree nodes={data} />;
};
