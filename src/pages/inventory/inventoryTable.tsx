import Card from "@/components/ui/card";
import Table from "@/components/ui/table";
import columns from "./columns";
import Input from "@/components/common/input";
import { Divider, Flex, Select, Button as AntButton } from "antd";
import Button from "@/components/common/button";
import { useNavigate } from "react-router-dom";
import routePaths from "@/config/routePaths";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import InventoryActions from "@/redux/inventory/actions";
import InventorySelectors from "@/redux/inventory/selectors";
import { makeSelectErrorModel } from "@/redux/error/errorSelector";
import requestingSelector from "@/redux/requesting/requestingSelector";
import FullAlertError from "@/components/common/error/FullAlertError";
import { getTranslation } from "@/translation/i18n";
import { DeleteOutlined } from "@ant-design/icons";

const selectError = makeSelectErrorModel();
const InventoryTable = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inventories = useSelector(InventorySelectors.selectInventories);
  const categories = useSelector(InventorySelectors.selectSubCategories);
  const error = useSelector((state) =>
    selectError(state, InventoryActions.FETCH_INVENTORIES_FINISHED)
  );
  const selectedInventory = useSelector(
    InventorySelectors.selectSelectedInventory
  );
  const loading = useSelector((state) =>
    requestingSelector(state, [InventoryActions.FETCH_INVENTORIES], "")
  );
  const onAddButtonClick = () => {
    navigate(routePaths.addInventory);
  };

  const onCategoryChange = (value: any) => {
    const selectedCategory = categories.find(
      (category: any) => category.subCategoryId === value
    );
    if (selectedCategory) {
      setProducts(selectedCategory.products);
      setSelectedProduct(null);
    }
  };

  const onRowSelectionChange = (selectedRowKeys: any, selectedRows: any) => {
    console.log(selectedRowKeys, selectedRows);
    setDeleteButtonDisabled(selectedRowKeys.length === 0);
  };

  useEffect(() => {
    if (!inventories.length) dispatch(InventoryActions.fetchInventories());
    if (!categories.length) dispatch(InventoryActions.fetchSubCategories());
  }, []);

  const categoryOptions = categories.map((category: any) => ({
    label: category.name,
    value: category.subCategoryId,
  }));

  const productOptions = products.map((product: any) => ({
    label: product.name,
    value: product.id,
  }));

  const onProductChange = (value: any) => {
    setSelectedProduct(value);
  };

  const onRowClick = (record: any) => {
    dispatch(InventoryActions.selectInventory(record));
  };

  return (
    <Card
      style={{
        width: !selectedInventory ? "100%" : "calc( 100% - 350px)",
        height: "fit-content",
        paddingTop: "20px",
      }}
      bordered={false}
      title={getTranslation("global.inventory")}
      className="criclebox tablespace"
    >
      {error && <FullAlertError error={error} />}
      <Flex style={{ width: "100%" }}>
        <div style={{ width: "100%" }}>
          <Flex
            justify="space-between"
            gap={20}
            style={{
              padding: "0px 20px",
              width: "100%",
            }}
          >
            <Flex gap={20}>
              <Input
                placeholder={getTranslation(
                  "inventoryManagement.searchInventoryPlaceholder"
                )}
              />
              <Select
                placeholder={getTranslation("global.categorySelectPlaceholder")}
                options={categoryOptions}
                style={{ width: "27%" }}
                onChange={onCategoryChange}
              />
              <Select
                placeholder={getTranslation(
                  "inventoryManagement.selectProductPlaceholder"
                )}
                value={selectedProduct}
                style={{ minWidth: "160px" }}
                options={productOptions}
                onChange={onProductChange}
              />
            </Flex>
            <Flex gap={20} style={{ minWidth: "200px" }}>
              <Button
                label={getTranslation("inventoryManagement.addInventory")}
                type="primary"
                style={{ width: "60%" }}
                onClick={onAddButtonClick}
              />
              <Button
                icon={<DeleteOutlined />}
                type="default"
                danger
                style={{ width: "20%" }}
                // disabled={deleteButtonDisabled}
              />
            </Flex>
          </Flex>
          <Divider />
          <div className="table-responsive">
            <Table
              rowSelection={{
                type: "checkbox",
                onChange: (selectedRowKeys, selectedRows) => {
                  onRowSelectionChange(selectedRowKeys, selectedRows);
                },
              }}
              loading={loading}
              columns={columns}
              dataSource={inventories}
              className="ant-border-space"
              onRow={(record) => {
                return {
                  onClick: () => onRowClick(record),
                };
              }}
            />
          </div>
        </div>
      </Flex>
    </Card>
  );
};

export default InventoryTable;
