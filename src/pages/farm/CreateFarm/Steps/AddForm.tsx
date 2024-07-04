import React from "react";
import { Col, Row, Form as AntdForm } from "antd";
import Button from "@/components/common/button";
import Form from "@/components/common/form";
import Input from "@/components/common/input";
import PhoneInput from "@/components/common/input/phoneInput";
import Select from "@/components/ui/select";

function AddForm({ form }) {
  const nutrientType = [
    {
      label: "2 part mix",
      value: "2 part mix",
    },
    {
      label: "3 part mix",
      value: "3 part mix",
    },
    {
      label: "Custom nutrient mix",
      value: "Custom nutrient mix",
    },
  ];

  const ratioValidationRegex = /^\d+:\d+$/;
  const number = /^(?:[1-9]\d{0,4}|50000)$/;

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
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Input
              label="Area (in sq meters)"
              name="area"
              rules={[
                {
                  required: true,
                  message: "Please input area",
                },
                {
                  pattern: number,
                  message: "Please provide valid area (e.g., 20000, 200.5)",
                },
              ]}
              placeholder="Enter area (in sq meters)"
            />
          </Col>
          <Col xs={24} sm={12}>
            <AntdForm.Item
              label="Nutrients type"
              name="nutrientType"
              rules={[
                {
                  required: true,
                  message: "Please Select Nutrients type",
                },
              ]}
            >
              <Select
                placeholder="Select nutrients type"
                options={nutrientType}
              />
            </AntdForm.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Input
              label="Cultivable area (in sq meters)"
              name="cultivableArea"
              value="Number"
              rules={[
                {
                  required: true,
                  message: "Please input cultivable area",
                },
                {
                  pattern: number,
                  message:
                    "Please provide valid cultivable area (e.g., 20000, 200.5)",
                },
              ]}
              placeholder="Enter cultivable area (in sq meters)"
            />
          </Col>
          <Col xs={24} sm={12}>
            <Input
              label="Nutrient dilution ratio (e.g., 2:3)"
              name="nutrientDilutionRatio"
              rules={[
                {
                  required: true,
                  message: "Please input Nutrient dilution ratio",
                },
                {
                  pattern: ratioValidationRegex,
                  message:
                    "Please provide farm dilution ratio in the format: numerator:denominator (e.g., 2:3)",
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
