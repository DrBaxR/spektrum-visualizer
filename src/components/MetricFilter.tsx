import React, { BaseSyntheticEvent, useState } from "react";
import { MdCancel } from "react-icons/md";
import { metricFilterFormValidators } from "../validators/metric-filter-form-validators";
import "./MetricFilter.css";

interface Props {
  onChange: (change: MetricFilterFormSchema) => void;
}

export interface MetricFilterFormSchema {
  metric: "coverage" | "test" | "";
  operation: "greater" | "less" | "greater-eq" | "less-eq" | "";
  amount: string;
}

export const MetricFilter: React.FC<Props> = ({ onChange }) => {
  const initialFormState: MetricFilterFormSchema = {
    metric: "",
    operation: "",
    amount: "0"
  };

  const [formState, setFormState] = useState<MetricFilterFormSchema>(
    initialFormState
  );

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

  const resetFilter = () => {
    setFormState(initialFormState);
    onChange(initialFormState);
  };

  return (
    <div className="metric-filter-component">
      <form className="form">
        <select
          name="metric"
          className="metric-input"
          value={formState.metric}
          onChange={handleFormChange}
        >
          <option value="">Metric...</option>
          <option value="coverage">Coverage %</option>
          <option value="test">Test %</option>
        </select>
        {formState.metric !== "" && (
          <select
            name="operation"
            className="operation-input"
            value={formState.operation}
            onChange={handleFormChange}
          >
            <option value="">Op...</option>
            <option value="greater">{">"}</option>
            <option value="less">{"<"}</option>
            <option value="greater-eq">{">="}</option>
            <option value="less-eq">{"<="}</option>
          </select>
        )}
        {formState.operation !== "" && (
          <>
            <input
              type="text"
              name="amount"
              className="amount-input"
              value={formState.amount}
              onChange={handleFormChange}
            />
            <div className="cancel-icon" onClick={resetFilter}>
              <MdCancel />
            </div>
          </>
        )}
      </form>
    </div>
  );
};
