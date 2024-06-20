import React from "react";
import { Col, Row, Form as AntdForm } from "antd";
import Button from "@/components/common/button";
import Form from "@/components/common/form";
import Input from "@/components/common/input";
import PhoneInput from "@/components/common/input/phoneInput";

function AddForm() {
  const [form] = AntdForm.useForm();
  return (
    <div className="addForm">
      <Form form={form} layout="vertical">
        <Row gutter={24}>
          <Col span={24}>
            <Input
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name",
                },
              ]}
              placeholder="Enter your name"
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Input
              label="Area (in sq meters)"
              name="area"
              rules={[
                {
                  required: true,
                  message: "Please input area",
                },
              ]}
              placeholder="Enter area (in sq meters)"
            />
          </Col>
          <Col span={12}>
            <Input
              label="Nutrients type"
              name="nutrientType"
              rules={[
                {
                  required: true,
                  message: "Please Select Nutrients type",
                },
              ]}
              placeholder="Select nutrients type"
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Input
              label="Cultivable area (in sq meters)"
              name="cultivableArea"
              rules={[
                {
                  required: true,
                  message: "Please input cultivable area",
                },
              ]}
              placeholder="Enter cultivable area (in sq meters)"
            />
          </Col>
          <Col span={12}>
            <Input
              label="Nutrient dilution ratio (e.g., 2:3)"
              name="nutrientDilutionRatio"
              rules={[
                {
                  required: true,
                  message: "Please input Nutrient dilution ratio",
                },
              ]}
              placeholder="Enter Nutrient dilution ratio"
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default AddForm;
