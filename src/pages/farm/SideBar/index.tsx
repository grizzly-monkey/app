import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import SideBar from "@/components/ui/sidebar";
import FarmSelectors from "@/redux/farm/FarmSelectors";
import FarmActions from "@/redux/farm/action";
import Fields from "@/utilities/fields/field";
import { deviceValue } from "../utilities";
import moment from "moment";
import UserSelectors from "@/redux/user/selectors";
import UserActions from "@/redux/user/actions";
import { getTranslation } from "@/translation/i18n";

const FarmSideBar = () => {
  const dispatch = useDispatch();
  const selectedFarm = useSelector(FarmSelectors.SelectSelectedFarm);
  const users = useSelector(UserSelectors.selectUsers);

  const closeSidebar = () => {
    dispatch(FarmActions.setSelectedFarm(null));
  };

  useEffect(() => {
    if (users) dispatch(UserActions.fetchUsers());
  }, []);

  const getSelectedUser = (userId) => {
    let selectedUserName = "";
    users.forEach((user) => {
      if (user.userId === userId)
        selectedUserName = `${user.firstName} ${user.lastName}`;
    });

    return selectedUserName;
  };

  const fileds = [
    {
      label: `${getTranslation("global.name")}`,
      value: <span>{selectedFarm?.name}</span>,
    },
    {
      label: `${getTranslation("farm.farmArea")}`,
      value: <span>{selectedFarm?.area}</span>,
    },
    {
      label: `${getTranslation("farm.cultivableArea")}`,
      value: <span>{selectedFarm?.cultivableArea}</span>,
    },
    {
      label: `${getTranslation("farm.nutrientType")}`,
      value: <span>{selectedFarm?.nutrient?.type}</span>,
    },
    {
      label: `${getTranslation("farm.dilutionRatio")}`,
      value: (
        <span>
          {selectedFarm?.nutrient?.dilutionRatio
            ? selectedFarm.nutrient.dilutionRatio?.numerator +
              ":" +
              selectedFarm.nutrient.dilutionRatio?.denominator
            : "-"}
        </span>
      ),
    },
    {
      label: `${getTranslation("global.reservoirs")}`,
      value: (
        <span>
          {selectedFarm?.reservoirs ? selectedFarm.reservoirs.length : "-"}
        </span>
      ),
    },
    {
      label: `${getTranslation("global.polyhouses")}`,
      value: (
        <span>
          {selectedFarm?.polyhouses ? selectedFarm.polyhouses.length : "-"}
        </span>
      ),
    },
    {
      label: `${getTranslation("farm.deviceStatus")}`,
      value: <span>{deviceValue(selectedFarm?.device)}</span>,
    },
    {
      label: `${getTranslation("global.createBy")}`,
      value: <span>{getSelectedUser(selectedFarm?.createdBy)}</span>,
    },
    {
      label: `${getTranslation("global.createdDate")}`,
      value: (
        <span>
          {selectedFarm?.createdDate
            ? moment(new Date(selectedFarm.createdDate)).format("DD-MM-YYYY")
            : "-"}
        </span>
      ),
    },
    {
      label: `${getTranslation("global.updatedBy")}`,
      value: <span>{getSelectedUser(selectedFarm?.updatedBy)}</span>,
    },
    {
      label: `${getTranslation("global.updatedDate")}`,
      value: (
        <span>
          {selectedFarm?.updatedDate
            ? moment(new Date(selectedFarm.updatedDate)).format("DD-MM-YYYY")
            : "-"}
        </span>
      ),
    },
  ];
  return (
    <div className="shadow-box">
      <div style={{ height: "100%" }}>
        <SideBar isOpen={!!selectedFarm}>
          <div style={{ padding: "20px 20px", width: "100%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                textAlign: "center",
              }}
            >
              <h5 style={{ fontSize: "130%" }}>
                <strong>{getTranslation("farm.farmDetails")}</strong>
              </h5>
              <CloseOutlined
                style={{ cursor: "pointer", padding: "5px 5px" }}
                onClick={closeSidebar}
              />
            </div>
            <Divider />

            <div>
              <Fields info={fileds} />
            </div>
          </div>
        </SideBar>
      </div>
    </div>
  );
};

export default FarmSideBar;
