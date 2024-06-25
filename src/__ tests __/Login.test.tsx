import { fireEvent, screen, waitFor } from "@testing-library/react";
import Login from "@/pages/auth/login";
import "@testing-library/jest-dom";
import { setupDefaultStore } from "./utils/setupTests";
import { renderWithProvider } from "./utils/testUtils";
import SessionActions from "@/redux/session/actions";

describe("Login Page", () => {
  let store: any;

  beforeEach(() => {
    store = setupDefaultStore();
  });

  test("should render the login form", () => {
    renderWithProvider(<Login />, { store });

    expect(screen.getByText("Welcome Back!")).toBeInTheDocument();
    expect(screen.getByText("Please Sign in to continue")).toBeInTheDocument();
    expect(screen.getByText("Phone number")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("Remember me")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
  });

  test("should display error messages when inputs are empty and form is submitted", async () => {
    renderWithProvider(<Login />, { store });

    fireEvent.click(screen.getByText("Sign in"));

    expect(
      await screen.findByText("Please input your phone number!")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Please input your password!")
    ).toBeInTheDocument();
  });

  test("should dispatch login action with valid inputs", async () => {
    renderWithProvider(<Login />, { store });

    fireEvent.change(screen.getByTestId("phone-number-input"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByText("Sign in"));

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        SessionActions.login({
          phoneNumber: "1234567890",
          password: "password",
        })
      );
    });
  });

  test("should show loading state when login is in progress", () => {
    store = setupDefaultStore({
      requesting: {
        [SessionActions.REQUEST_LOGIN]: true,
      },
    });

    renderWithProvider(<Login />, { store });
    expect(screen.getByRole("button", { name: /sign in/i })).toBeDisabled();
  });

  test("should display error on login error", async () => {
    store = setupDefaultStore({
      error: {
        [SessionActions.REQUEST_LOGIN_FINISHED]: {
          errors: [{ message: "Invalid credentials" }],
        },
      },
    });

    renderWithProvider(<Login />, { store });

    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });
  });

  test("should display account approval status error", () => {
    store = setupDefaultStore({
      session: {
        accountApprovalStatus: "Account not approved",
      },
    });

    renderWithProvider(<Login />, { store });

    expect(screen.getByText("Account not approved")).toBeInTheDocument();
  });
});
