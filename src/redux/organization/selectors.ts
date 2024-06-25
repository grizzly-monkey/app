import { RootState } from "../store";

class OrganizationSelectors {
  static SelectOrganization = (state: RootState) =>
    state.organizations.organisations;
  static SelectSelectedOrganization = (state: RootState) =>
    state.organizations.selectedOrganisation;
}

export default OrganizationSelectors;
