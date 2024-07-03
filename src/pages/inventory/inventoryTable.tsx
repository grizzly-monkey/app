import Card from "@/components/ui/card";
import Table from "@/components/ui/table";
import columns from "./columns";
import Input from "@/components/common/input";
import { Divider, Flex, Select } from "antd";
import Button from "@/components/common/button";
import { useNavigate } from "react-router-dom";
import routePaths from "@/config/routePaths";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import InventoryActions from "@/redux/inventory/actions";
import InventorySelectors from "@/redux/inventory/selectors";
import { makeSelectErrorModel } from "@/redux/error/errorSelector";
import requestingSelector from "@/redux/requesting/requestingSelector";
import FullAlertError from "@/components/common/error/FullAlertError";
import { getTranslation } from "@/translation/i18n";

const selectError = makeSelectErrorModel();
const InventoryTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inventories = useSelector(InventorySelectors.getInventories);
  const error = useSelector((state) =>
    selectError(state, InventoryActions.FETCH_INVENTORIES_FINISHED)
  );
  const loading = useSelector((state) =>
    requestingSelector(state, [InventoryActions.FETCH_INVENTORIES], "")
  );
  const onAddButtonClick = () => {
    navigate(routePaths.addInventory);
  };

  useEffect(() => {
    dispatch(InventoryActions.fetchInventories());
    dispatch(InventoryActions.fetchSubCategories());
  }, []);

  return (
    <Card
      style={{
        width: "100%",
        height: "fit-content",
        paddingTop: "20px",
      }}
      bordered={false}
      title={getTranslation("global.inventory")}
      className="criclebox tablespace"
    >
      {error && <FullAlertError error={error} />}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0px 20px",
        }}
      >
        <Flex gap={20}>
          <Input placeholder={getTranslation("inventoryManagement.searchInventoryPlaceholder")} />
          <Select placeholder={getTranslation("global.categorySelectPlaceholder")} />
          <Select placeholder={getTranslation("inventoryManagement.selectProductPlaceholder")} />
        </Flex>
        <div style={{ width: "15%" }}>
          <Button
            label={getTranslation("inventoryManagement.addInventory")}
            type="primary"
            style={{ width: "100%" }}
            onClick={onAddButtonClick}
          />
        </div>
      </div>
      <Divider />
      <div className="table-responsive">
        <Table
          rowSelection={{
            type: "checkbox",
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(selectedRowKeys, selectedRows);
            },
          }}
          loading={loading}
          columns={columns}
          dataSource={inventories}
          className="ant-border-space"
        />
      </div>
    </Card>
  );
};

export default InventoryTable;
