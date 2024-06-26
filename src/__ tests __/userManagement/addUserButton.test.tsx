import AddUserButton from "@/pages/userManagement/addUserButton";
import { fireEvent, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { setupDefaultStore } from "../utils/setupTests";
import { renderWithProvider } from "../utils/testUtils";

// import UserActions from "@/redux/user/actions";
// import userEvent from '@testing-library/user-event';

describe("Add User Button", () => {
  let store: any;

  beforeEach(() => {
    store = setupDefaultStore({
      users: {
        users: {},
        selectedUser: null,
      },
    });
  });
  //   it("should render modal on button click", () => {
  //      renderWithProvider(<AddUserButton />, { store });
  //       const button = screen.getByRole("button", { name: /Add User/i });
  //       expect(button).toBeInTheDocument();
  //       fireEvent.click(button);
  //       expect(screen.getByTestId("add-user-modal")).toBeInTheDocument();
  //   });
  //   it("should close modal on cancel", () => {
  //     renderWithProvider(<AddUserButton />, { store });
  //     const button = screen.getByRole("button", { name: /Add User/i });
  //     fireEvent.click(button);
  //     const cancelButton = screen.getByRole("button", { name: /Cancel/i });
  //     fireEvent.click(cancelButton);
  //     expect(screen.queryByTestId("add-user-modal")).not.toBeInTheDocument();
  //   });
  // it("should display error message on clicking ok without filling form", async () => {
  //   renderWithProvider(<AddUserButton />,{store});
  //   const button = screen.getByRole("button", { name: /Add User/i });
  //   fireEvent.click(button);

  //   const okButton = screen.getByRole("button", { name: "Add" });
  //   fireEvent.click(okButton);

  //   expect(
  //     await screen.findByText("Please input first name")
  //   ).toBeInTheDocument();
  // });

  // it("Add button should be disabled on loading", async() => {
  //   store = setupDefaultStore({
  //     users: {
  //       users: {},
  //       selectedUser: null,
  //     },
  //     requesting: {
  //       [UserActions.CREATE_USER]: true,
  //     },
  //   });
  //   renderWithProvider(<AddUserButton />, { store });
  //   const button = screen.getByRole("button", { name: /Add User/i });
  //   fireEvent.click(button);
  //   expect(screen.getByRole("img",{name: "loading"})).toBeInTheDocument();

  // });
  it("dispatches create user action on clicking ok", async () => {
    renderWithProvider(<AddUserButton />, { store });
    const button = screen.getByRole("button", { name: /Add User/i });

    fireEvent.click(button);

    act(() => {
      fireEvent.change(screen.getByLabelText("First Name"), {
        target: { value: "John" },
      });
    });

    // act(() => {
    //   fireEvent.change(screen.getByLabelText("Last Name"), {
    //     target: { value: "Doe" },
    //   });
    // });
    // act(() => {
    //   fireEvent.change(screen.getByTestId("phone-number-input"), {
    //     target: { value: "1234567890" },
    //   });
    // });

    // fireEvent.click(screen.getByRole("button", { name: "Add" }));

    // const select = screen.getByTestId("roles-select").firstElementChild;
    // console.log(select);
    // if (select) {
    //   userEvent.click(select);
    // }

    // screen.getByText("Admin");ß

    // await waitFor(() => {
    //   expect(store.dispatch).toHaveBeenCalledWith(
    //     UserActions.createUser({
    //       firstName: "John",
    //       lastName: "Doe",
    //       phone: "+1234567890",
    //       address: "address",
    //       email: "abc@gmail.com",
    //       organisationName: "organisationName",
    //       password:"Qwerty@123",
    //       role: "ADMIN",
    //       roles: ["ADMIN"],
    //     })
    //   );
    // });
  });
});
