import Button from "@/components/common/button";
import SideBar from "@/components/ui/sidebar";
import InventorySelectors from "@/redux/inventory/selectors";
import { getTranslation } from "@/translation/i18n";
import {
  Dropdown,
  Flex,
  theme,
  Form as AntdForm,
  Space,
  Popconfirm,
  Divider,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsThreeDots } from "react-icons/bs";
import { CloseOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import InventoryActions from "@/redux/inventory/actions";
import InventoryDetails from "./inventoryDetails";
import requestingSelector from "@/redux/requesting/requestingSelector";
import { makeSelectErrorModel } from "@/redux/error/errorSelector";
import FarmSelectors from "@/redux/farm/FarmSelectors";

const { useToken } = theme;
const selectError = makeSelectErrorModel();

const InventorySidebar = () => {
  const initial = {
    description: false,
    provider: false,
    quantity: false,
    wastage: false,
  };
  const [field, setField] = useState(initial);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevDeleteUserLoading, setPrevDeleteUserLoading] = useState(false);
  const deleteLoading = useSelector((state) =>
    requestingSelector(state, [InventoryActions.DELETE_INVENTORY], "")
  );
  const errorDeletingInventory = useSelector((state) =>
    selectError(state, InventoryActions.DELETE_INVENTORY_FINISHED)
  );
  const selectedFarmId = useSelector(FarmSelectors.SelectSelectedFarmId);
  const { token } = useToken();
  const [form] = AntdForm.useForm();
  const dispatch = useDispatch();
  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };
  const selectedInventory = useSelector(
    InventorySelectors.selectSelectedInventory
  );
  const toggleField = (key: string, value: boolean) =>
    setField({ ...field, [key]: value });
  const deleteInventory = () => {
    dispatch(InventoryActions.deleteInventory(selectedInventory?.inventoryId));
    setIsMenuOpen(false);
  };

  const closeSidebar = () => {
    dispatch(InventoryActions.unselectInventory());
  };
  useEffect(() => {
    if ((prevDeleteUserLoading && !deleteLoading) || errorDeletingInventory) {
      setIsMenuOpen(false);
    }
    setPrevDeleteUserLoading(deleteLoading);
  }, [deleteLoading]);

  useEffect(() => {
    if (selectedFarmId) {
      dispatch(InventoryActions.unselectInventory())
    }
  }, [selectedFarmId]);
  return (
    <SideBar isOpen={!!selectedInventory}>
      <div style={{ padding: "20px 20px", width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            textAlign: "center",
          }}
        >
          <h5 style={{ fontSize: "130%" }}>
            <strong> {selectedInventory?.name}</strong>
          </h5>
          <Flex gap={20}>
            <Dropdown
              trigger={["click"]}
              open={isMenuOpen}
              onOpenChange={setIsMenuOpen}
              dropdownRender={() => (
                <div style={contentStyle}>
                  <Space style={{ padding: 8 }}>
                    <Popconfirm
                      title={getTranslation("global.areYouSure")}
                      okText={getTranslation("global.yes")}
                      cancelText={getTranslation("global.cancel")}
                      onCancel={() => setIsMenuOpen(false)}
                      onConfirm={deleteInventory}
                    >
                      <Button
                        icon={<DeleteOutlined />}
                        type="primary"
                        label={getTranslation("global.delete")}
                        loading={deleteLoading}
                        style={{ padding: "0px 15px" }}
                        danger
                      />
                    </Popconfirm>
                  </Space>
                </div>
              )}
            >
              <BsThreeDots
                style={{
                  cursor: "pointer",
                  padding: "5px 5px",
                  fontSize: "30px",
                }}
              />
            </Dropdown>
            <CloseOutlined
              style={{ cursor: "pointer", padding: "5px 5px" }}
              onClick={closeSidebar}
            />
          </Flex>
        </div>
        <Divider />

        <InventoryDetails toggleField={toggleField} field={field} form={form} />
      </div>
    </SideBar>
  );
};

export default InventorySidebar;
