import "@testing-library/jest-dom";
import { setupDefaultStore } from "./utils/setupTests";
import { renderWithProvider } from "./utils/testUtils";
import SignUp from "@/pages/auth/signUp";
import { fireEvent, screen, waitFor } from "@testing-library/dom";
import AccountActions from "@/redux/account/actions";

describe("SignUp Page", () => {
  let store: any;
  let consoleErrorMock: any;

  beforeAll(() => {
    consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation((message) => {
        if (message.includes("findDOMNode is deprecated")) {
          return;
        }
      });
  });

  afterAll(() => {
    consoleErrorMock.mockRestore();
  });

  beforeEach(() => {
    store = setupDefaultStore();
  });

  test("renders SignUp page with form elements", () => {
    renderWithProvider(<SignUp />, { store });

    expect(screen.getByText("Create Your Account")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Fill in the details blow to register your absolutely free account."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Phone number")).toBeInTheDocument();
    expect(screen.getByText("Organization name")).toBeInTheDocument();
    expect(screen.getByText("First name")).toBeInTheDocument();
    expect(screen.getByText("Last name")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign up" })).toBeInTheDocument();
  });

  test("displays validation errors on form submit with empty fields", async () => {
    renderWithProvider(<SignUp />, { store });

    fireEvent.click(screen.getByRole("button", { name: "Sign up" }));

    await waitFor(() => {
      expect(
        screen.getByText("Please input your phone number!")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Please input your organization name!")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Please input your first name!")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Please input your last name!")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Please input your password!")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Please input your confirm password!")
      ).toBeInTheDocument();
    });
  });

  test("displays password mismatch error", async () => {
    renderWithProvider(<SignUp />, { store });

    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "Password1!" },
    });
    fireEvent.change(screen.getByTestId("confirm-password"), {
      target: { value: "Password2!" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign up" }));

    await waitFor(() => {
      expect(screen.getByText("Password don't match")).toBeInTheDocument();
    });
  });

  test("displays password policy errors", async () => {
    renderWithProvider(<SignUp />, { store });

    const testCases = [
      { password: "short1!", error: "Password does not agree to the policy" },
      {
        password: "nouppercase1!",
        error: "Password does not agree to the policy",
      },
      {
        password: "NOLOWERCASE1!",
        error: "Password does not agree to the policy",
      },
      {
        password: "NoNumbers!",
        error: "Password does not agree to the policy",
      },
      {
        password: "NoSymbols1",
        error: "Password does not agree to the policy",
      },
    ];

    for (const { password, error } of testCases) {
      fireEvent.change(screen.getByTestId("password"), {
        target: { value: password },
      });
      fireEvent.blur(screen.getByTestId("password"));

      await waitFor(() => {
        expect(screen.getByText(error)).toBeInTheDocument();
      });
    }
  });

  test("calls register action on form submit with valid data", async () => {
    renderWithProvider(<SignUp />, { store });

    fireEvent.change(screen.getByTestId("phone-number-input"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByTestId("organisation-name"), {
      target: { value: "Test Organization" },
    });
    fireEvent.change(screen.getByTestId("first-name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByTestId("last-name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "Password1!" },
    });
    fireEvent.change(screen.getByTestId("confirm-password"), {
      target: { value: "Password1!" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign up" }));

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        AccountActions.register({
          phone: "+1234567890",
          organisationName: "Test Organization",
          firstName: "John",
          lastName: "Doe",
          password: "Password1!",
        })
      );
    });
  });

  test("should show loading state when sign-up is in progress", async () => {
    store = setupDefaultStore({
      requesting: {
        [AccountActions.REQUEST_REGISTER]: true,
      },
    });

    renderWithProvider(<SignUp />, { store });

    expect(screen.getByRole("button", { name: /sign up/i })).toBeDisabled();
  });

  test("should display error on sign-up error", async () => {
    store = setupDefaultStore({
      error: {
        [AccountActions.REQUEST_REGISTER_FINISHED]: {
          errors: [{ message: "Registration failed!" }],
        },
      },
    });

    renderWithProvider(<SignUp />, { store });

    await waitFor(() => {
      expect(screen.getByText("Registration failed!")).toBeInTheDocument();
    });
  });
});
