import Form from "@/components/common/form";
import { Form as AntdForm } from "antd";
import Button from "@/components/common/button";
import Input from "@/components/common/input";
import { Col, Flex, InputNumber, Row, Select } from "antd";
import AddProductButton from "./addProductButton";
import { useNavigate } from "react-router-dom";
import routePaths from "@/config/routePaths";
import { getTranslation } from "@/translation/i18n";
import { useDispatch, useSelector } from "react-redux";
import InventorySelectors from "@/redux/inventory/selectors";
import { useEffect, useState } from "react";
import InventoryActions from "@/redux/inventory/actions";
import { makeSelectErrorModel } from "@/redux/error/errorSelector";
import FullAlertError from "@/components/common/error/FullAlertError";
import requestingSelector from "@/redux/requesting/requestingSelector";

const selectError = makeSelectErrorModel();

const AddInventoryForm = () => {
  const dispatch = useDispatch();
  const [form] = AntdForm.useForm();
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const loading = useSelector((state) =>
    requestingSelector(state, [InventoryActions.CREATE_INVENTORY], "")
  );
  const createInventoryError = useSelector((state) =>
    selectError(state, [InventoryActions.CREATE_INVENTORY_FINISHED], "")
  );
  const fetchCategoryError = useSelector((state) =>
    selectError(state, [InventoryActions.FETCH_SUBCATEGORIES_FINISHED], "")
  );
  const categories = useSelector((state) =>
    InventorySelectors.selectSubCategories(state)
  );
  const navigate = useNavigate();
  const onCancel = () => {
    navigate(routePaths.inventory);
  };

  const onCategoryChange = (value: any) => {
    const selectedCategory = categories.find(
      (category: any) => category.subCategoryId === value
    );
    if (selectedCategory) {
      setSelectedCategory(selectedCategory);
    }
    form.setFieldsValue({ productId: undefined });
    setSelectedProduct(null);
  };

  const onProductChange = (value: any) => {
    form.setFieldsValue({ productId: value });
    selectedCategory?.products.forEach((product: any) => {
      if (product.id === value) {
        setSelectedProduct(product);
      }
    });
  };

  const categoryOptions = categories.map((category: any) => ({
    label: category.name,
    value: category.subCategoryId,
  }));

  const products = selectedCategory?.products.map((product: any) => ({
    label: product.name,
    value: product.id,
  }));

  const onFinish = (values: any) => {
    dispatch(InventoryActions.createInventory(values));
  };

  useEffect(() => {
    if (!categories.length) {
      dispatch(InventoryActions.fetchSubCategories());
    }
  }, []);

  return (
    <>
      {createInventoryError && <FullAlertError error={createInventoryError} />}
      {fetchCategoryError && <FullAlertError error={fetchCategoryError} />}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ width: "100%" }}
      >
        <div className="inventory-container">
          <Row gutter={16}>
            <Col span={12}>
              <AntdForm.Item
                label={getTranslation("global.category")}
                name="category"
                rules={[
                  {
                    required: true,
                    message: getTranslation("global.categoryError"),
                  },
                ]}
              >
                <Select
                  options={categoryOptions}
                  placeholder={getTranslation(
                    "global.categorySelectPlaceholder"
                  )}
                  onChange={onCategoryChange}
                />
              </AntdForm.Item>
            </Col>
            <Col span={12}>
              <Flex gap={20}>
                <AntdForm.Item
                  style={{ width: "100%" }}
                  label={getTranslation("inventoryManagement.product")}
                  name="productId"
                  rules={[
                    {
                      required: true,
                      message: getTranslation(
                        "inventoryManagement.productError"
                      ),
                    },
                  ]}
                >
                  <Flex gap={5} style={{ width: "100%" }}>
                    <Select
                      placeholder={getTranslation(
                        "inventoryManagement.selectProductPlaceholder"
                      )}
                      options={products}
                      onChange={onProductChange}
                      value={form.getFieldValue("productId")}
                    />
                    <AddProductButton />
                  </Flex>
                </AntdForm.Item>
              </Flex>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <AntdForm.Item
                label={getTranslation("global.description")}
                name="description"
              >
                <Input
                  placeholder={getTranslation("global.descriptionPlaceholder")}
                />
              </AntdForm.Item>
            </Col>
            <Col span={12}>
              <AntdForm.Item
                label={getTranslation("inventoryManagement.provider")}
                name="provider"
                rules={[
                  {
                    required: true,
                    message: getTranslation(
                      "inventoryManagement.providerError"
                    ),
                  },
                ]}
              >
                <Input
                  placeholder={getTranslation(
                    "inventoryManagement.providerPlaceholder"
                  )}
                />
              </AntdForm.Item>
            </Col>
          </Row>
        </div>
        <div className="inventory-container">
          <Row gutter={16}>
            <Col span={12}>
              <AntdForm.Item
                label={getTranslation("inventoryManagement.quantity")}
                name="quantity"
                rules={[
                  {
                    required: true,
                    message: getTranslation(
                      "inventoryManagement.quantityError"
                    ),
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder={getTranslation(
                    "inventoryManagement.quantityPlaceholder"
                  )}
                  suffix={
                    <span
                      style={{
                        marginRight: "30px",
                        borderLeft: "1px solid #d9d9d9",
                        paddingLeft: "10px",
                      }}
                    >
                      {selectedProduct?.unit ? selectedProduct.unit : "Unit"}
                    </span>
                  }
                />
              </AntdForm.Item>
            </Col>
            <Col span={12}>
              <AntdForm.Item
                label={getTranslation("inventoryManagement.minQuantity")}
                name="minQuantity"
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder={getTranslation(
                    "inventoryManagement.minQuantityPlaceholder"
                  )}
                />
              </AntdForm.Item>
            </Col>
          </Row>
        </div>
        <Flex gap={20} justify="flex-end">
          <Button
            label={getTranslation("global.cancel")}
            type="default"
            style={{ width: "20%" }}
            onClick={onCancel}
          />
          <Button
            loading={loading}
            label={getTranslation("global.add")}
            type="primary"
            htmlType="submit"
            style={{ width: "20%" }}
          />
        </Flex>
      </Form>
    </>
  );
};

export default AddInventoryForm;
