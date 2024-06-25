import UserManagement from "@/pages/userManagement";
import { setupDefaultStore } from "../utils/setupTests";
import { renderWithProvider } from "../utils/testUtils";
import { screen } from "@testing-library/dom";
import "@testing-library/jest-dom";
import UserActions from "@/redux/user/actions";

describe("User Management", () => {
  let store: any;

  beforeEach(() => {
    store = setupDefaultStore({
      users: {
        users: {},
        selectedUser: null,
      },
    });
  });
  //   test("should render the user management page", () => {
  //     renderWithProvider(<UserManagement />, { store });
  //     expect(screen.getByText("Users")).toBeInTheDocument();
  //     expect(screen.getByPlaceholderText("Search user")).toBeInTheDocument();
  //     expect(screen.getByText("Add User")).toBeInTheDocument();
  //   });

    test("should diplay in table loader when fetching users", async() => {
      store = setupDefaultStore({
        requesting: {
          [UserActions.FETCH_USERS]: true,
        },
        users: {
          users: {},
          selectedUser: null,
        },
      });
      renderWithProvider(<UserManagement />, { store });
      expect(screen.getByTestId("loader")).toBeInTheDocument();
    });
//   test("should render table with users", async () => {
//     store = setupDefaultStore({
//       users: {
//         users: [
//           {
//             userId: "1",
//             firstName: "John",
//             lastName: "Doe",
//             phone: "1234567890",
//             role: "Admin",
//           },
//         ],
//         selectedUser: null,
//       },
//     });
//     renderWithProvider(<UserManagement />, { store });
//     expect(await screen.findByText("John")).toBeInTheDocument();
//     expect(await screen.findByText("Doe")).toBeInTheDocument();
//   });
});
