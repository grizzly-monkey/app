export const hasNumberRegex = /[0-9]/;
export const hasLowerCaseRegex = /[a-z]/;
export const hasUpperCaseRegex = /[A-Z]/;
export const hasSpecialCharRegex = /[\^$*.\[\]{}()?\-!@#%&\/,><:;|_~]/;

export const REGEX = {
  PASSWORD_VALIDATION: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
};

export const hasNumber = (value: string) => {
  return hasNumberRegex.test(value);
};
export const hasLowerCase = (value: string) => {
  return hasLowerCaseRegex.test(value);
};
export const hasUpperCase = (value: string) => {
  return hasUpperCaseRegex.test(value);
};
export const hasSpecialChar = (value: string) => {
  return (
    hasSpecialCharRegex.test(value) ||
    value.includes("'") ||
    value.includes("`") ||
    value.includes('"')
  );
};
