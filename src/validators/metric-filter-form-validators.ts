import { FormValidators } from "./form-validators";
import { isNumberValidator } from "./is-number-validator";

export const metricFilterFormValidators: FormValidators = {
  metric: () => true, 
  operation: () => true,
  amount: isNumberValidator 
}
