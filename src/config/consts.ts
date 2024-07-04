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

export const LOCAL_STORAGE_KEYS = {
  farm: "farm",
  organization: "organization",
  language: "language",
};

export const LANGUAGE_KEYS = {
  en: "en",
};

export const LANGUAGE_OPTIONS = [
  {
    label: "EN",
    key: LANGUAGE_KEYS.en,
  },
];
