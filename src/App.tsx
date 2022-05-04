import React from "react";
import { Tree } from "./components/Tree";
import { ExportUnit } from "./data/export-unit";
import "./styles/App.css";

interface Props {
  data: ExportUnit[];
}

export const App: React.FC<Props> = ({ data }) => {
  return (
    <div className="tree">
      <Tree nodes={data} />
    </div>
  );
};
