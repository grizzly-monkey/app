import AddUserButton from "@/pages/userManagement/addUserButton";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
jest.mock("react-redux", () => ({
    useDispatch: jest.fn(),
    useSelector: (callback:any)=>callback(),
  }));
jest.mock("@/redux/user/actions", () => ({
    createUser: jest.fn(),
}));
jest.mock("@/redux/requesting/requestingSelector", () => jest.fn().mockReturnValue(false));
describe("Add User Button", () => {
    // it("should render modal on button click", () => {
    //     const component = render(<AddUserButton />);
    //     const button = component.getByRole("button", { name: /Add User/i });
    //     expect(button).toBeInTheDocument();
    //     fireEvent.click(button);
    //     expect(component.getByTestId("add-user-modal")).toBeInTheDocument();
    // });
    // it("should close modal on cancel", () => {
    //     const component = render(<AddUserButton />);
    //     const button = component.getByRole("button", { name: /Add User/i });
    //     fireEvent.click(button);
    //     const cancelButton = component.getByRole("button", { name: /Cancel/i });
    //     fireEvent.click(cancelButton);
    //     expect(component.queryByTestId("add-user-modal")).not.toBeInTheDocument();
    // });
    it("should display error message on clicking ok without filling form", () => {
        const component = render(<AddUserButton />);
        const button = component.getByRole("button", { name: /Add User/i });
        fireEvent.click(button);
        const okButton = component.getByRole("button", { name: 'Add' });
        fireEvent.click(okButton);
        expect(component.getByText("Please input first name")).toBeInTheDocument();
    }
    )
});