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
import { useEffect } from "react";
import InventoryActions from "@/redux/inventory/actions";
import { makeSelectErrorModel } from "@/redux/error/errorSelector";
import FullAlertError from "@/components/common/error/FullAlertError";

const selectError = makeSelectErrorModel();
const AddInventoryForm = () => {
  const dispatch = useDispatch();
  const [form] = AntdForm.useForm();

  const createInventoryError = useSelector((state) =>
    selectError(state, [InventoryActions.CREATE_INVENTORY_FINISHED], "")
  );
  const fetchCategoryError = useSelector((state) =>
    selectError(state, [InventoryActions.FETCH_SUBCATEGORIES_FINISHED], "")
  );
  const categories = useSelector((state) =>
    InventorySelectors.getSubCategories(state)
  );
  const navigate = useNavigate();
  const onCancel = () => {
    navigate(routePaths.inventory);
  };

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
                  options={[
                    {
                      label: "Fertilizer",
                      value: "fertilizer",
                    },
                    {
                      label: "Pesticide",
                      value: "pesticide",
                    },
                    {
                      label: "Seed",
                      value: "seed",
                    },
                  ]}
                  placeholder={getTranslation(
                    "global.categorySelectPlaceholder"
                  )}
                />
              </AntdForm.Item>
            </Col>
            <Col span={12}>
              <Flex gap={20}>
                <AntdForm.Item
                  style={{ width: "100%" }}
                  label={getTranslation("inventoryManagement.product")}
                  name="product"
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
                      options={[
                        {
                          label: "Product 1",
                          value: "product1",
                        },
                        {
                          label: "Product 2",
                          value: "product2",
                        },
                      ]}
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
                rules={[
                  {
                    required: true,
                    message: getTranslation("global.descriptionError"),
                  },
                ]}
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
                  placeholder={getTranslation(
                    "inventoryManagement.quantityPlaceholder"
                  )}
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
