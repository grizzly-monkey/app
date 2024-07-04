import Card from "@/components/ui/card";
import Table from "@/components/ui/table";
import columns from "./columns";
// import Input from "@/components/common/input";
import { Divider, Flex, Select, Input as AntdInput } from "antd";
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

const { Search } = AntdInput;

const selectError = makeSelectErrorModel();
const InventoryTable = () => {
  const [categoryFilteredInventories, setCategoryFilteredInventories] = useState([]);
  const [productFilteredInventories, setProductFilteredInventories] = useState([]);
  const [searchFilteredInventories, setSearchFilteredInventories] = useState([]);
  const [searchText, setSearchText] = useState("");
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

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filteredData = productFilteredInventories.filter((inventory: any) => {
      return (
        inventory.name.toLowerCase().includes(value.toLowerCase()) ||
        inventory.description.toLowerCase().includes(value.toLowerCase())
      );
    });
    setSearchText(value);
    setSearchFilteredInventories(filteredData);
  };
  const onCategoryChange = (value: any) => {
    if (value === "all") {
      setCategoryFilteredInventories(inventories);
      setProductFilteredInventories(inventories);
      setSearchFilteredInventories(inventories);
      setSearchText("");
      return;
    }
    const selectedCategory = categories.find(
      (category: any) => category.subCategoryId === value
    );
    if (selectedCategory) {
      setProducts(selectedCategory.products);
      setSelectedProduct(null);
    }
    const products = selectedCategory?.products || [];
    const filteredData = inventories.filter((inventory: any) => {
      return products.some((product: any) => product.id === inventory.productId);
    })
    setCategoryFilteredInventories(filteredData);
    setProductFilteredInventories(filteredData);
    setSearchFilteredInventories(filteredData);
    setSearchText("");
  };

  const onRowSelectionChange = (selectedRowKeys: any, selectedRows: any) => {
    console.log(selectedRowKeys, selectedRows);
    setDeleteButtonDisabled(selectedRowKeys.length === 0);
  };

  const categoryOptions = categories.map((category: any) => ({
    label: category.name,
    value: category.subCategoryId,
  }));
  categoryOptions.unshift({
    label: "All",
    value: "all",
  });

  const productOptions = products.map((product: any) => ({
    label: product.name,
    value: product.id,
  }));
  productOptions.unshift({
    label: "All",
    value: "all",
  });

  const onProductChange = (value: any) => {
    if (value === "all") {
      setProductFilteredInventories(categoryFilteredInventories);
      setSearchFilteredInventories(categoryFilteredInventories);
      setSearchText("");
      setSelectedProduct(null);
      return;
    }
    const filteredData = categoryFilteredInventories.filter((inventory:any )=> inventory.productId === value);
    setProductFilteredInventories(filteredData);
    setSearchFilteredInventories(filteredData);
    setSearchText("");
    setSelectedProduct(value);
  };

  const onRowClick = (record: any) => {
    dispatch(InventoryActions.selectInventory(record));
  };

  useEffect(() => {
    if (!inventories.length) dispatch(InventoryActions.fetchInventories());
    if (!categories.length) dispatch(InventoryActions.fetchSubCategories());
  }, []);

  useEffect(() => {
    setCategoryFilteredInventories(inventories);
    setProductFilteredInventories(inventories);
    setSearchFilteredInventories(inventories);
  }, [inventories]);

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
        <div  style={{ width: "100%" }}>
          <Flex
            justify="space-between"
            gap={20}
            style={{
              padding: "0px 20px",
              width: "100%",
            }}
          >
            <Flex gap={20}>
              {/* <Input
                placeholder={getTranslation(
                  "inventoryManagement.searchInventoryPlaceholder"
                )}

              /> */}
              <Search
               className="inventory"
                placeholder={getTranslation(
                  "inventoryManagement.searchInventoryPlaceholder"
                )}
                style={{ width: "40%", height: "45px" }}
                onChange={onSearch}
                value={searchText}
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
                disabled={deleteButtonDisabled}
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
              dataSource={searchFilteredInventories}
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
