import ForgotPassword from "@/pages/auth/forgotPassword";
import "@testing-library/jest-dom";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { setupDefaultStore } from "./utils/setupTests";
import { renderWithProvider } from "./utils/testUtils";
import UserActions from "@/redux/user/actions";
import { successToast } from "@/utilities/toast";

jest.mock("@/utilities/toast", () => ({
  successToast: jest.fn(),
}));

describe("ForgotPassword Page", () => {
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

  test("renders the Forgot Password form correctly", () => {
    renderWithProvider(<ForgotPassword />, { store });

    expect(screen.getByText("Forgot Password?")).toBeInTheDocument();
    expect(
      screen.getByText("Please enter your phone number to reset the password")
    ).toBeInTheDocument();
    expect(screen.getByText("Phone number")).toBeInTheDocument();
  });

  test("displays validation errors on form submit with empty fields in phone number form", async () => {
    renderWithProvider(<ForgotPassword />, { store });

    fireEvent.click(screen.getByText("Reset Password"));

    await waitFor(() => {
      expect(
        screen.getByText("Please input your phone number!")
      ).toBeInTheDocument();
    });
  });

  test("submits the phone number form", async () => {
    renderWithProvider(<ForgotPassword />, { store });

    const phoneInput = screen.getByTestId("phone-number-input");
    const submitButton = screen.getByText("Reset Password");

    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        UserActions.sendResetPasswordOTP({ phone: "1234567890" })
      );
    });
  });

  test("should show loading state when sending otp is in progress", async () => {
    store = setupDefaultStore({
      requesting: {
        [UserActions.REQUEST_RESET_PASSWORD_OTP]: true,
      },
    });

    renderWithProvider(<ForgotPassword />, { store });

    expect(
      screen.getByRole("button", { name: /reset password/i })
    ).toBeDisabled();
  });

  test("displays error message when OTP sending fails", () => {
    store = setupDefaultStore({
      users: { passwordResetOTPSent: false },
      error: {
        [UserActions.REQUEST_RESET_PASSWORD_OTP_FINISHED]: {
          errors: [{ message: "OTP sending failed" }],
        },
      },
    });

    renderWithProvider(<ForgotPassword />, { store });

    expect(screen.getByText("OTP sending failed")).toBeInTheDocument();
  });

  test("shows success toast when OTP is sent successfully", () => {
    store = setupDefaultStore({
      users: { passwordResetOTPSent: true },
    });

    renderWithProvider(<ForgotPassword />, { store });

    expect(successToast).toHaveBeenCalledWith("OTP sent successfully!!");
  });

  test("displays OTP input and password fields when OTP is sent successfully", () => {
    store = setupDefaultStore({
      users: { passwordResetOTPSent: true },
    });

    renderWithProvider(<ForgotPassword />, { store });

    expect(screen.getByTestId("otp")).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
    expect(screen.getByTestId("confirm-password")).toBeInTheDocument();
  });

  test("displays validation errors on form submit with empty fields in new password form", async () => {
    store = setupDefaultStore({
      users: { passwordResetOTPSent: true },
    });

    renderWithProvider(<ForgotPassword />, { store });

    fireEvent.click(screen.getByText("Reset Password"));

    await waitFor(() => {
      expect(screen.getByText("Please input your otp!")).toBeInTheDocument();
      expect(
        screen.getByText("Please input your password!")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Please input your confirm password!")
      ).toBeInTheDocument();
    });
  });

  test("shows error message if password does not meet policy", async () => {
    store = setupDefaultStore({
      users: { passwordResetOTPSent: true },
    });

    renderWithProvider(<ForgotPassword />, { store });

    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "Test" },
    });
    fireEvent.blur(screen.getByTestId("password"));

    await waitFor(() => {
      expect(
        screen.getByText("Password does not agree to the policy")
      ).toBeInTheDocument();
    });
  });

  test("displays password mismatch error", async () => {
    store = setupDefaultStore({
      users: { passwordResetOTPSent: true },
    });

    renderWithProvider(<ForgotPassword />, { store });

    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "Password1!" },
    });
    fireEvent.change(screen.getByTestId("confirm-password"), {
      target: { value: "Password2!" },
    });

    fireEvent.click(screen.getByText("Reset Password"));

    await waitFor(() => {
      expect(screen.getByText("Password don't match")).toBeInTheDocument();
    });
  });

  test("submits the new password form", async () => {
    store = setupDefaultStore({
      users: { passwordResetOTPSent: true },
    });

    renderWithProvider(<ForgotPassword />, { store });

    fireEvent.change(screen.getByTestId("otp"), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "Test@1234" },
    });
    fireEvent.change(screen.getByTestId("confirm-password"), {
      target: { value: "Test@1234" },
    });
    fireEvent.click(screen.getByText("Reset Password"));

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        UserActions.resetPasswordWithOTP({
          otp: "123456",
          password: "Test@1234",
          confirmPassword: "Test@1234",
          phoneNumber: undefined,
        })
      );
    });
  });

  test("displays error message when new password sending fails", () => {
    store = setupDefaultStore({
      users: { passwordResetOTPSent: true },
      error: {
        [UserActions.RESET_PASSWORD_FINISHED]: {
          errors: [{ message: "Passowrd reset failed" }],
        },
      },
    });

    renderWithProvider(<ForgotPassword />, { store });

    expect(screen.getByText("Passowrd reset failed")).toBeInTheDocument();
  });

  test("should show loading state when reset password is in progress", async () => {
    store = setupDefaultStore({
      users: { passwordResetOTPSent: true },
      requesting: {
        [UserActions.RESET_PASSWORD]: true,
      },
    });

    renderWithProvider(<ForgotPassword />, { store });

    expect(
      screen.getByRole("button", { name: /reset password/i })
    ).toBeDisabled();
  });
});
