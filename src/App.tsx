import React from "react";
import { Tree } from "./components/Tree";
import { ExportUnit } from "./model/export-unit";
import "./App.css";
import { MetricFilter } from "./components/MetricFilter";

interface Props {
  data: ExportUnit[];
}

export const App: React.FC<Props> = ({ data }) => {
  return (
    <div className="tree">
      <Tree nodes={data} />
      <MetricFilter />
    </div>
  );
};
