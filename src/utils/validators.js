export const validateFields = (fields, rules) => {
  let errors = {};

  for (const field in rules) {
    const value = fields[field]?.trim?.() ?? fields[field];
    const { required, pattern, message } = rules[field];

    if (required && !value) {
      errors[field] = `${
        field.charAt(0).toUpperCase() + field.slice(1)
      } is required.`;
      continue;
    }

    if (pattern && value && !pattern.test(value)) {
      errors[field] = message || `Invalid ${field}.`;
    }
  }

  return errors;
};
