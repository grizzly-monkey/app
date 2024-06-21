import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FormInstance } from "antd";
import UserDetails from "@/pages/userManagement/userDetails";

jest.mock("@/redux/user/actions", () => ({
  updateUserFirstName: jest.fn(),
  updateUserLastName: jest.fn(),
  updateUserRoles: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
const dummyUser = {
  userId: "1",
  firstName: "John",
  lastName: "Doe",
  phone: "1234567890",
  role: "Admin",
};
jest.mock("@/redux/user/selectors", () => ({
  selectSelectedUser: () => dummyUser,
}));

describe("AddUserForm Component", () => {
  it("should render user details form with correct initial values", () => {
    const toggleField = jest.fn();
    const field = { firstName: false, lastName: false, roles: false };
    const form = {
      getFieldValue: jest.fn().mockReturnValue(dummyUser.firstName),
    } as unknown as FormInstance;

    const { getByText } = render(
      <UserDetails toggleField={toggleField} field={field} form={form} />
    );

    expect(getByText("First Name")).toBeInTheDocument();
    expect(getByText("John")).toBeInTheDocument();
  });
});
