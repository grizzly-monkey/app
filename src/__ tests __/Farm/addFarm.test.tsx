/* eslint-disable @typescript-eslint/no-explicit-any */
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { setupDefaultStore } from "../utils/setupTests";
import { renderWithProvider } from "../utils/testUtils";
import { getTranslation } from "@/translation/i18n";
import CreateFarm from "@/pages/farm/CreateFarm";
jest.mock("@/utilities/toast", () => ({
  errorToast: jest.fn(),
}));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));
describe("Farm page", () => {
  let store: any;
  beforeEach(() => {
    store = setupDefaultStore();
  });
  test("should render the create farm", () => {
    renderWithProvider(<CreateFarm />, { store });
    expect(
      screen.getByText(getTranslation("farm.createFarm.farmDetails"))
    ).toBeInTheDocument();
  });
});
