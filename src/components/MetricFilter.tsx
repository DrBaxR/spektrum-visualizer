import React, { BaseSyntheticEvent, useState } from "react";
import { metricFilterFormValidators } from "../validators/metric-filter-form-validators";

interface Props {
  onChange: (change: MetricFilterFormSchema) => void;
}

export interface MetricFilterFormSchema {
  metric: "coverage" | "test" | "";
  operation: "greater" | "less" | "greater-eq" | "less-eq" | "";
  amount: string;
}

export const MetricFilter: React.FC<Props> = ({ onChange }) => {
  const [formState, setFormState] = useState<MetricFilterFormSchema>({
    metric: "",
    operation: "",
    amount: ""
  });

  const isValid = (e: BaseSyntheticEvent): boolean => {
    return metricFilterFormValidators[e.target.name](e.target.value);
  };

  const handleFormChange = (e: BaseSyntheticEvent) => {
    if (isValid(e)) {
      setFormState(prev => {
        const newValue = { ...prev, [e.target.name]: e.target.value };

        onChange(newValue);

        return newValue;
      });
    }
  };

  return (
    <div className="metric-filter-component">
      <form>
        <select
          name="metric"
          value={formState.metric}
          onChange={handleFormChange}
        >
          <option value="">Metric...</option>
          <option value="coverage">Coverage %</option>
          <option value="test">Test %</option>
        </select>
        <select
          name="operation"
          value={formState.operation}
          onChange={handleFormChange}
        >
          <option value="">Operation...</option>
          <option value="greater">{">"}</option>
          <option value="less">{"<"}</option>
          <option value="greater-eq">{">="}</option>
          <option value="less-eq">{"<="}</option>
        </select>
        <input
          type="text"
          name="amount"
          value={formState.amount}
          onChange={handleFormChange}
        />
      </form>
    </div>
  );
};
