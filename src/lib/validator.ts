interface ValidationRule {
  key: string;
  required?: boolean;
  notEmpty?: boolean;
  type?: 'string' | 'number';
}

function validateValue(value: unknown, rule: ValidationRule) {
  const { key, required, notEmpty = true, type } = rule;

  if (required && !value) {
    return `${key} is required field`;
  } else if (notEmpty && typeof value === 'string' && !value.trim()) {
    return `${key} cannot be empty`;
  } else if (type && value && typeof value !== type) {
    return `${key} must be ${type}`;
  }
}

function validator(obj: Record<string, unknown>, rules: ValidationRule[]) {
  const errors: string[] = [];

  rules.forEach((rule) => {
    const { key } = rule;
    const value = obj[key];
    const error = validateValue(value, rule);

    if (error) {
      errors.push(error);
    }
  });

  return errors;
}

export { validator };
export type { ValidationRule };
