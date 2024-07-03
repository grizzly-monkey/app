import Profile from "@/pages/profile";
import "@testing-library/jest-dom";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { setupDefaultStore } from "./utils/setupTests";
import { renderWithProvider } from "./utils/testUtils";
import { iconRenderError } from "./__ mocks __/errorMock";
import SessionActions from "@/redux/session/actions";
import { getTranslation } from "@/translation/i18n";

describe("Profile Component", () => {
  let store: any;
  let consoleErrorMock: any;

  beforeAll(() => {
    consoleErrorMock = iconRenderError;
  });

  afterAll(() => {
    consoleErrorMock.mockRestore();
  });

  beforeEach(() => {
    store = setupDefaultStore();
  });

  test("should render the form fields with initial values", () => {
    store = setupDefaultStore({
      session: {
        details: {
          given_name: "John",
          family_name: "Doe",
          email: "john.doe@example.com",
          phone_number: "1234567890",
          address: {
            formatted: "123 Main St",
          },
        },
      },
    });

    renderWithProvider(<Profile />, { store });

    expect(screen.getByTestId("first-name")).toHaveValue("John");
    expect(screen.getByTestId("last-name")).toHaveValue("Doe");
    expect(screen.getByTestId("email")).toHaveValue("john.doe@example.com");
    expect(screen.getByTestId("phone-number")).toHaveValue("1234567890");
    expect(screen.getByTestId("address")).toHaveValue("123 Main St");
  });

  test("should dispatch update user details action on form submit", async () => {
    renderWithProvider(<Profile />, { store });

    fireEvent.change(screen.getByTestId("first-name"), {
      target: { value: "Jane" },
    });
    fireEvent.change(screen.getByTestId("last-name"), {
      target: { value: "Smith" },
    });
    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "jane.smith@example.com" },
    });
    fireEvent.change(screen.getByTestId("address"), {
      target: { value: "456 Elm St" },
    });

    fireEvent.click(screen.getByText(getTranslation("global.update")));

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        SessionActions.updateUserDetails([
          { Name: "given_name", Value: "Jane" },
          { Name: "family_name", Value: "Smith" },
          { Name: "email", Value: "jane.smith@example.com" },
          { Name: "address", Value: "456 Elm St" },
        ])
      );
    });
  });
});
