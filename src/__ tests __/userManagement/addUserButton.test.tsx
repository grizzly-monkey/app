import AddUserButton from "@/pages/userManagement/addUserButton";
import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { setupDefaultStore } from "../utils/setupTests";
import { renderWithProvider } from "../utils/testUtils";

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
    it("should display error message on clicking ok without filling form", async () => {
      renderWithProvider(<AddUserButton />,{store});
      const button = screen.getByRole("button", { name: /Add User/i });
      fireEvent.click(button);

      const okButton = screen.getByRole("button", { name: "Add" });
      fireEvent.click(okButton);

      expect(
        await screen.findByText("Please input first name")
      ).toBeInTheDocument();
    });
});
