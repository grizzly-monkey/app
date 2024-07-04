import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Popconfirm, Space } from "antd";
// import { CloseOutlined } from "@ant-design/icons";
import SideBar from "@/components/ui/sidebar";
import FarmSelectors from "@/redux/farm/FarmSelectors";
import FarmActions from "@/redux/farm/action";
import UserActions from "@/redux/user/actions";
import { getTranslation } from "@/translation/i18n";
import FarmDetails from "./FarmDetails";
import UserSelectors from "@/redux/user/selectors";
import Dropdown from "@/components/ui/dropdown";
import Button from "@/components/common/button";
import { DeleteOutlined } from "@ant-design/icons";
import { BsThreeDots } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

const FarmSideBar = () => {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const selectedFarm = useSelector(FarmSelectors.SelectSelectedFarm);
  const users = useSelector(UserSelectors.selectUsers);
  const closeSidebar = () => {
    dispatch(FarmActions.setSelectedFarm(null));
  };

  useEffect(() => {
    if (users) dispatch(UserActions.fetchUsers());
  }, []);

  const deleteFarm = () => {
    dispatch(FarmActions.deleteFarm());
  };

  return (
    <div className="shadow-box" style={{ marginTop: "20px" }}>
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
              <div>
                <Dropdown
                  trigger={["click"]}
                  open={isMenuOpen}
                  onOpenChange={setIsMenuOpen}
                  dropdownRender={() => (
                    <div>
                      <Space>
                        <Popconfirm
                          title={getTranslation("global.areYouSure")}
                          okText={getTranslation("global.yes")}
                          cancelText={getTranslation("global.cancel")}
                          onCancel={() => setIsMenuOpen(false)}
                          onConfirm={deleteFarm}
                        >
                          <Button
                            icon={<DeleteOutlined />}
                            type="primary"
                            label={getTranslation("global.delete")}
                            // loading={deleteUserLoading}
                            style={{ padding: "0px 15px" }}
                            danger
                            loading={false}
                          />
                        </Popconfirm>
                      </Space>
                    </div>
                  )}
                  label={
                    <BsThreeDots
                      style={{
                        cursor: "pointer",
                        marginRight: "10px",
                      }}
                      fontSize={20}
                    />
                  }
                  isDownDropIconHide={true}
                />
                <IoClose
                  style={{ cursor: "pointer" }}
                  onClick={closeSidebar}
                  data-testid="farm-sidebar-close-btn"
                  fontSize={20}
                />
              </div>
            </div>
            <Divider />

            <div>
              <FarmDetails />
            </div>
          </div>
        </SideBar>
      </div>
    </div>
  );
};

export default FarmSideBar;
