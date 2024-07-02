import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import SideBar from "@/components/ui/sidebar";
import FarmSelectors from "@/redux/farm/FarmSelectors";
import FarmActions from "@/redux/farm/action";
import Fields from "@/utilities/fields/field";
import moment from "moment";
import UserActions from "@/redux/user/actions";
import { getTranslation } from "@/translation/i18n";
import FarmDetails from "./FarmDetails";
import UserSelectors from "@/redux/user/selectors";

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
              {/* <Fields info={fileds} /> */}
              <FarmDetails />
            </div>
          </div>
        </SideBar>
      </div>
    </div>
  );
};

export default FarmSideBar;
