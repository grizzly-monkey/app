export const stepperNames = {
  FARM_CREATION: "Form",
  RESERVOIRS: "Reservoirs",
  POLYHOUSES: "Poly houses",
  ZONE: "Zone",
  NURSERY: "Nursery",
};

export const stepper = {
  [stepperNames.FARM_CREATION]: 0,
  [stepperNames.RESERVOIRS]: 1,
  [stepperNames.POLYHOUSES]: 2,
  [stepperNames.ZONE]: 3,
  [stepperNames.NURSERY]: 4,
};

export const REGEX = {
  ratioValidationRegex: /^\d+:\d+$/,
  number: /^(?:[1-9]\d{0,4}|50000)$/,
};

export const isNumber = (value) => REGEX.number.test(value);
export const isRatioValidationRegex = (value) =>
  REGEX.ratioValidationRegex.test(value);

export const numberValidator = (_, value) => {
  if (value && !isNumber(value))
    return Promise.reject(new Error("please enter a number"));
  return Promise.resolve();
};

export const ratioValidationRegex = (_, value) => {
  if (value && !isRatioValidationRegex(value))
    return Promise.reject(
      new Error(
        "Please provide farm dilution ratio in the format: numerator:denominator (e.g., 2:3)"
      )
    );
  return Promise.resolve();
};

export const applyErrorsToFields = (form, errors, errRefrence = "") => {
  errors.forEach((err) => {
    if (!err.location) return;

    const fieldParts = err.location.split(".");
    if (fieldParts[0] === errRefrence) {
      const index = fieldParts[1];
      const fieldName = fieldParts[2];
      const formFieldName = `${fieldName}_${index}`;

      form.setFields([
        {
          name: formFieldName,
          errors: [err.message || "Please enter valid value"],
          value: form.getFieldValue(formFieldName),
        },
      ]);
    } else if (fieldParts.length === 2) {
      const index = fieldParts[0];
      const fieldName = fieldParts[1];
      const formFieldName = `${fieldName}_${index}`;

      form.setFields([
        {
          name: formFieldName,
          errors: [err.message || "Please enter valid value"],
          value: form.getFieldValue(formFieldName),
        },
      ]);
    } else {
      const fieldName = fieldParts.join(".");
      form.setFields([
        {
          name: fieldName,
          errors: [err.message || "Please enter valid value"],
          value: form.getFieldValue(fieldName),
        },
      ]);
    }
  });
};

export const applyErrorsToCardFields = (
  form,
  errors,
  currentZoneKey,
  cardType
) => {
  errors.forEach((err) => {
    if (!err.location) return;

    const fieldParts = err.location.split(".");
    const isZonesError = fieldParts.includes("zones");
    const isNursariesError = fieldParts.includes("nurseries");

    if (isZonesError && cardType === "zones") {
      const polyhouseIndex = fieldParts[0];
      const zonesIndex = fieldParts[2];
      const fieldName = fieldParts[fieldParts.length - 1];
      const fieldType = fieldParts.includes("growingArea")
        ? `growingArea.${fieldName}`
        : fieldName;

      if (currentZoneKey === parseInt(zonesIndex, 10)) {
        form.setFields([
          {
            name: fieldType,
            errors: [err.message || "Please enter valid value"],
            value: form.getFieldValue(fieldType),
          },
        ]);
      }
    }

    if (isNursariesError && cardType === "nurseries") {
      const polyhouseIndex = fieldParts[0];
      const nurseryIndex = fieldParts[2];
      const fieldName = fieldParts[fieldParts.length - 1];

      if (currentZoneKey === parseInt(nurseryIndex, 10)) {
        form.setFields([
          {
            name: fieldName,
            errors: [err.message || "Please enter valid value"],
            value: form.getFieldValue(fieldName),
          },
        ]);
      }
    }
  });
};
