import React from "react";
import {
  render,
  screen,
  fireEvent,
  RenderOptions,
  act,
} from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Login from "@/pages/auth/login";
import SessionActions from "@/redux/session/actions";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

jest.mock("../utilities/actionUtility", () => ({
  getKeyForAction: jest.fn(
    (actionType, scope) => `${scope ? `[scope:${scope}]` : ""}${actionType}`
  ),
  createAction: jest.fn((type, payload, error, meta) => ({
    type,
    payload,
    error,
    meta,
  })),
}));

const mockStore = configureStore([]);

describe("LoginForm", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      session: {},
      requesting: {},
      error: {},
    });
    store.dispatch = jest.fn();
  });

  const renderWithProvider = (
    ui: React.ReactElement,
    { store, ...renderOptions }: { store: any } & Omit<RenderOptions, "queries">
  ) => {
    function Wrapper({ children }: { children: React.ReactNode }) {
      return (
        <Provider store={store}>
          <MemoryRouter>{children}</MemoryRouter>
        </Provider>
      );
    }
    return render(ui, { wrapper: Wrapper, ...renderOptions });
  };

  test("renders login form", () => {
    renderWithProvider(<Login />, { store });

    expect(screen.getByPlaceholderText("Test")).toBeInTheDocument();
    expect(screen.getByTestId("phone-number-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign in/i })
    ).toBeInTheDocument();
  });

  test("dispatches loginRequest action on form submit", async () => {
    renderWithProvider(<Login />, { store });

    await act(async () => {
      fireEvent.change(screen.getByTestId("phone-number-input"), {
        target: { value: "1234567890" },
      });
      fireEvent.change(screen.getByTestId("password-input"), {
        target: { value: "password" },
      });
      fireEvent.click(screen.getByRole("button", { name: /Sign in/i }));
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      SessionActions.login({ phoneNumber: "1234567890", password: "password" })
    );
  });
});
