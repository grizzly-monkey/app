import { 
    // fireEvent, 
    render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Form } from "antd";
import UserDetails from "@/pages/userManagement/userDetails";
import { useState } from "react";

jest.mock("@/redux/user/actions", () => ({
  updateUserFirstName: jest.fn(),
  updateUserLastName: jest.fn(),
  updateUserRoles: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: (callback:any)=>callback(),
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

const UserDetailsWithForm =()=>{
    const initial = {
        firstName: false,
        lastName: false,
        roles: false,
    }
    const [field, setField] = useState(initial)
    const [form] = Form.useForm()
    const toggleField = (key: string, value: boolean) => setField({ ...field, [key]: value })
    return <UserDetails toggleField={toggleField} field={field} form={form} />
    
}

describe("AddUserForm Component", () => {
  it("should render user details form with correct initial values", () => {
    
    // const form = {
    //   getFieldValue: jest.fn().mockReturnValue(dummyUser.firstName),
    // } as unknown as FormInstance;
    const component = render(
      <UserDetailsWithForm />
    );
    // fireEvent.click(component.getByTestId("first-name-container"));
    // expect(component.getByText("First Name")).toBeInTheDocument();
    // expect(component.getByTestId("first-name-input")).toHaveValue("John");
    // expect(component.getByText("Last Name")).toBeInTheDocument();
    expect(component.getByText("Doe")).toBeInTheDocument();
    
  });
});
