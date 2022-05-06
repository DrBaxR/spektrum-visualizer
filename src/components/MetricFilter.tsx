import React, { BaseSyntheticEvent, useState } from "react";
import { metricFilterFormValidators } from "../validators/metric-filter-form-validators";

interface FormSchema {
  metric: "coverage" | "test" | "";
  operation: "greater" | "less" | "greater-eq" | "less-eq" | "";
  amount: string;
}

export const MetricFilter = () => {
  const [formState, setFormState] = useState<FormSchema>({
    metric: "",
    operation: "",
    amount: ""
  });

  const isValid = (e: BaseSyntheticEvent): boolean => {
    return metricFilterFormValidators[e.target.name](e.target.value);
  };

  const handleFormChange = (e: BaseSyntheticEvent) => {
    if (isValid(e)) {
      setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
          <option value="greter-eq">{">="}</option>
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
