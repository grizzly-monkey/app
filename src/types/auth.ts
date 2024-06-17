export type loginType = {
  phoneNumber: string;
  password: string;
};
export type registerType = {
  phone: string;
  organisationName: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword?: string;
};
