import Form from "@/components/common/form";
import { Form as AntdForm } from "antd";
import Button from "@/components/common/button";
import Input from "@/components/common/input";
import { Col, Flex, InputNumber, Row, Select } from "antd";
import AddProductButton from "./addProductButton";
import { useNavigate } from "react-router-dom";
import routePaths from "@/config/routePaths";

const AddInventoryForm = () => {
  const [form] = AntdForm.useForm();
  const navigate = useNavigate();
  const onCancel = () => {
    navigate(routePaths.inventory);
  };
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={() => {}}
      style={{ width: "100%" }}
    >
      <div className="inventory-container">
        <Row gutter={16}>
          <Col span={12}>
            <Flex gap={20}>
              <AntdForm.Item
                style={{ width: "100%" }}
                label="Product"
                name="product"
                rules={[{ required: true, message: "Please enter name" }]}
              >
                <Flex gap={5} style={{ width: "100%" }}>
                  <Select placeholder="Select product" />
                  <AddProductButton />
                </Flex>
              </AntdForm.Item>
            </Flex>
          </Col>
          <Col span={12}>
            <AntdForm.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please enter provider" }]}
            >
              <Input placeholder="Enter description" />
            </AntdForm.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <AntdForm.Item
              label="Provider"
              name="provider"
              rules={[{ required: true, message: "Please enter quantity" }]}
            >
              <Input placeholder="Enter Quantity" />
            </AntdForm.Item>
          </Col>
        </Row>
      </div>
      <div className="inventory-container">
        <Row gutter={16}>
          <Col span={12}>
            <AntdForm.Item
              label="Quantity"
              name="quantity"
              rules={[{ required: true, message: "Please enter quantity" }]}
            >
              <InputNumber placeholder="Enter quantity" />
            </AntdForm.Item>
          </Col>
          <Col span={12}>
            <AntdForm.Item label="Minimum Quantity" name="minQuantity">
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Enter minimum quantity"
              />
            </AntdForm.Item>
          </Col>
        </Row>
      </div>
      <Flex gap={20} justify="flex-end">
        <Button
          label="Cancel"
          type="default"
          style={{ width: "20%" }}
          onClick={onCancel}
        />
        <Button
          label="Add"
          type="primary"
          htmlType="submit"
          style={{ width: "20%" }}
        />
      </Flex>
    </Form>
  );
};

export default AddInventoryForm;
