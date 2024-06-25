import { createAction } from "@/utilities/actionUtility";
import OrganizationModel from "./models/organizationModel";

const OrganizationActions = {
  REQUEST_ORGANIZATION: "organization/REQUEST_ORGANIZATION",
  REQUEST_ORGANIZATION_FINISHED: "organization/REQUEST_ORGANIZATION_FINISHED",
  SELECT_ORGANIZATION: "organization/SELECT_ORGANIZATION",

  requestOrganization: () =>
    createAction(OrganizationActions.REQUEST_ORGANIZATION),

  selectOrganization: (organization: OrganizationModel) =>
    createAction(OrganizationActions.SELECT_ORGANIZATION, { organization }),
};
export default OrganizationActions;
