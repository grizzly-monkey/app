// import { 
//     fireEvent, 
//     render } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import { Form } from "antd";
// import UserDetails from "@/pages/userManagement/userDetails";
// import { useState } from "react";
// jest.mock("@/redux/requesting/requestingSelector", () => jest.fn().mockReturnValue(false));

// jest.mock("@/redux/user/actions", () => ({
//   updateUserFirstName: jest.fn(),
//   updateUserLastName: jest.fn(),
//   updateUserRoles: jest.fn(),
// }));

// jest.mock("react-redux", () => ({
//   useDispatch: jest.fn(),
//   useSelector: (callback:any)=>callback(),
// }));
// const dummyUser = {
//   userId: "1",
//   firstName: "John",
//   lastName: "Doe",
//   phone: "1234567890",
//   role: "Admin",
// };
// jest.mock("@/redux/user/selectors", () => ({
//   selectSelectedUser: () => dummyUser,
// }));

// const UserDetailsWithForm =()=>{
//     const initial = {
//         firstName: false,
//         lastName: false,
//         roles: false,
//     }
//     const [field, setField] = useState(initial)
//     const [form] = Form.useForm()
//     const toggleField = (key: string, value: boolean) => setField({ ...field, [key]: value })
//     return <UserDetails toggleField={toggleField} field={field} form={form} />
    
// }

// describe("User Details", () => {
//   it("should render user details form with correct initial values", () => {
//     const component = render(
//       <UserDetailsWithForm />
//     );
//     expect(component.getByText("John")).toBeInTheDocument();
//     expect(component.getByText("Doe")).toBeInTheDocument();
//   });

//   it("Should render input fields on clicking values",()=>{
//     const component = render(
//         <UserDetailsWithForm />
//       );
//     fireEvent.click(component.getByTestId("first-name-container"));
//     expect(component.getByTestId("first-name-input")).toHaveValue("John");
//     fireEvent.click(component.getByTestId("last-name-container"));
//     expect(component.getByTestId("last-name-input")).toHaveValue("Doe");
//     const rolesContainer = component.getByTestId("roles-container");
//     fireEvent.click(rolesContainer);
//     expect(rolesContainer).toHaveTextContent("Admin");
//   })
// });
