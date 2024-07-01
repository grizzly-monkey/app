import { useEffect } from "react";
import "./style.scss";
import { TiTick } from "react-icons/ti";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import OrganizationActions from "@/redux/organization/actions";
import OrganizationSelectors from "@/redux/organization/selectors";
import { makeRequestingSelector } from "@/redux/requesting/requestingSelector";
import { makeSelectErrorModel } from "@/redux/error/errorSelector";
import AlertError from "@/components/common/error/AlertError";
import { Skeleton } from "antd";
import OrganizationModel from "@/redux/organization/models/organizationModel";
import { Images } from "@/utilities/imagesPath";
import { useNavigate } from "react-router-dom";
import routePaths from "@/config/routePaths";
import { getTranslation } from "@/translation/i18n";

const OrganizationCard = ({
  isActive,
  loading,
  data,
  onClick,
}: {
  isActive?: boolean;
  loading?: boolean;
  data: OrganizationModel;
  onClick: (organization: OrganizationModel) => void;
}) => {
  const isOrganizationSelected = !loading && isActive;

  return (
    <div
      className={`organization_card ${
        isOrganizationSelected ? "selected_organization_card" : ""
      }`}
      onClick={() => onClick(data)}
    >
      {loading ? (
        <>
          <Skeleton.Image active={true} className="loading_organization_logo" />
          <Skeleton.Input />
        </>
      ) : (
        <>
          <div className="organization_logo">
            <img
              src={data?.logo ? data.logo : Images.NO_IMAGE}
              alt="logo"
              className="image"
            />
          </div>
          <p className="heading2">{data.organisationName}</p>
        </>
      )}

      {isOrganizationSelected && (
        <div className="selected_organization_tick">
          <TiTick />
        </div>
      )}
    </div>
  );
};

const selectLoading = makeRequestingSelector();
const selectError = makeSelectErrorModel();

const Organization = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const organizations = useAppSelector(
    OrganizationSelectors.SelectOrganization
  );
  const selectedOrganization = useAppSelector(
    OrganizationSelectors.SelectSelectedOrganization
  );

  const error = useAppSelector((state) =>
    selectError(state, OrganizationActions.REQUEST_ORGANIZATION_FINISHED)
  );
  const loading = useAppSelector((state) =>
    selectLoading(state, [OrganizationActions.REQUEST_ORGANIZATION])
  );

  const organizationList = loading ? new Array(5).fill("") : organizations;

  const handleSelectOrganization = (organization: OrganizationModel) => {
    dispatch(OrganizationActions.selectOrganization(organization));
    navigate(routePaths.userManagement);
  };

  useEffect(() => {
    if (organizations.length === 0) {
      dispatch(OrganizationActions.requestOrganization());
    }
  }, []);

  return (
    <div className="organization_container">
      <p className="heading1 organization_text">
        {getTranslation("organization.selectYourOrganization")}
      </p>

      <AlertError error={error} />

      <div className="organization_card_container">
        {organizationList.map((organization: OrganizationModel) => (
          <OrganizationCard
            key={organization.organisationId}
            data={organization}
            isActive={
              selectedOrganization?.organisationId ===
              organization.organisationId
            }
            loading={loading}
            onClick={handleSelectOrganization}
          />
        ))}
      </div>
    </div>
  );
};

export default Organization;
