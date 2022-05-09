import React, { useState } from "react";
import { Tree } from "./components/Tree";
import { ExportUnit } from "./model/export-unit";
import "./App.css";

export const App: React.FC = () => {
  const [data, setData] = useState<ExportUnit[]>([]);

  const handleFileSelected = (e: any): void => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.addEventListener("load", event => {
      const resultText = event.target?.result as string;
      setData(JSON.parse(resultText));
    });

    reader.readAsText(file);
  };

  return (
    <>
      <input type="file" accept=".json" onChange={handleFileSelected} />
      <div className="tree">
        <Tree nodes={data} />
      </div>
    </>
  );
};
