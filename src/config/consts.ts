export const exceptions = {
  FieldValidationException: "BadRequestException",
};

export const passwordPolicy = {
  minimumLength: 8,
  lowerCase: true,
  upperCase: true,
  numbers: true,
  symbols: true,
};

export const TOKEN_EXPIRE_TIME = 3600;
